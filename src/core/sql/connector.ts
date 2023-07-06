import Database from 'tauri-plugin-sql-api';

// sqlite. The path is relative to `tauri::api::path::BaseDirectory::App`.
const db = await Database.load('sqlite:phylactery.db');
await db.execute(`CREATE TABLE aboba (
    id integer primary key autoincrement,
    name VARCHAR(500) UNIQUE NOT NULL DEFAULT 'zxc'    
)`);
