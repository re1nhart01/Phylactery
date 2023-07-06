#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]


use std::ffi::OsString;
use std::fs;
use time::OffsetDateTime;


use std::os::windows::process::CommandExt;
use std::process::Command;



use sysinfo::{Disk, DiskExt, System, SystemExt};


#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}


fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, bobus, bruh, retrieve_disks, retrieve_files_from_folder, open_file_in_apps])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

pub trait IBombastic {
    fn new() -> Self;
    fn aboba(self) -> &'static str;
}

#[derive(serde::Serialize)]
struct Bombastic {
    pub name: String,
    pub content: &'static str,
}

struct FSops {
    pub time: &'static str,
    pub disks: &'static [Disk],
}

#[derive(serde::Serialize)]
struct SerializableDisks {
    name: String,
    s_mount_point: String,
    total_space: u64,
    available_space: u64,
    is_removable: bool,
}

#[derive(serde::Serialize)]
struct SerializableFolder {
    file_type: SerializableFileType,
    file_name: String,
    path: String,
    metadata: SerializedMetadata
}

#[derive(serde::Serialize)]
struct SerializedMetadata {
    is_dir: bool,
    len: u64,
    created: String,
}

#[derive(serde::Serialize)]
struct SerializableFileType {
    creature_type: u8,
    is_symlink: bool,
    hash: String,
}

trait IFsops {
    fn new() -> Self;
}

impl IFsops for FSops {
    fn new() -> Self {
        Self {
            time: "",
            disks: &[],
        }
    }
}

impl IBombastic for Bombastic {
    fn new() -> Self {
        Bombastic{
            content: "zxczxczxczx",
            name: chrono::offset::Utc::now().to_string()
        }
    }
    fn aboba(self) -> &'static str {
        self.content
    }
}
pub fn tester<T>(bb: T) -> String
    where T: IBombastic {
        return bb.aboba().to_string()
}

#[tauri::command]
fn bruh() -> String {
    let implementation = Bombastic::new();
    tester(implementation)
}
fn retrieve_list_of_disks() -> Vec<SerializableDisks> {
    let mut system = System::new();
    system.refresh_disks_list();
    let disks = system.disks();
    let mut result = Vec::new();
    for disk in disks {
        let ser_disk = SerializableDisks{
            name: OsString::from(&disk.name()).into_string().unwrap(),
            s_mount_point: (*disk.mount_point().to_string_lossy()).parse().unwrap(),
            total_space: disk.total_space(),
            available_space: disk.available_space(),
            is_removable: disk.is_removable(),
        };
        result.push(ser_disk)
    }
    result
}

fn systemtime_strftime<T>(dt: T) -> String
    where T: Into<OffsetDateTime>
{
    dt.into().to_string()
}

#[tauri::command]
fn retrieve_files_from_folder(disk: &str) -> Vec<SerializableFolder> {
    let mut system = System::new();
    system.refresh_disks();
    let data_from_disk = fs::read_dir(disk);
    let mut vert = Vec::new();
    match data_from_disk {
        Ok(data) => {
            for entry in data {
                let unwrapped = entry.unwrap();
                let metadata = unwrapped.metadata().unwrap();
                let datetime = metadata.created().unwrap();
                let file_type = unwrapped.file_type().unwrap();
                let path = unwrapped.path().to_string_lossy().into_owned();
                let file_name = unwrapped.file_name();
                let new_entry = SerializableFolder{
                    file_type: SerializableFileType {
                        creature_type: if file_type.is_file() { 1 } else { 2 },
                        is_symlink: file_type.is_symlink(),
                        hash: String::from("zxc"),
                    },
                    file_name: file_name.into_string().unwrap(),
                    path,
                    metadata: SerializedMetadata {
                        is_dir: metadata.is_dir(),
                        len: metadata.len(),
                        created: systemtime_strftime(datetime)
                    },
                };
                vert.push(new_entry)
            }
        }
        Err(err) => {
            println!("{} bababoi", err)
        }
    }
    vert
}
const CREATE_NO_WINDOW: u32 = 0x08000000;



#[tauri::command]
fn open_file_in_apps(creatureType: i8, path: &str) {
    if creatureType == 1 {
        let mut cmd = Command::new("cmd");
         match cmd.arg("/c")
            .arg("start")
            .raw_arg("\"\"")
            .raw_arg(path)
            .creation_flags(CREATE_NO_WINDOW).spawn() {
             Ok(_) => {
                 println!("open_file_in_apps OKEY")
             }
             Err(e) => {
                 println!("open_file_in_apps ERROR, {}", e)
             }
         }
    }
    if creatureType == 2 {
        println!("its a folder!")
    }
}

#[tauri::command]
fn retrieve_disks() -> Vec<SerializableDisks> {
    retrieve_list_of_disks()
}

#[tauri::command]
fn bobus() -> Bombastic {
    Bombastic::new()
}
