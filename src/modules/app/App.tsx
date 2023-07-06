import { useNative } from '#hooks/useNative.hook';
import '#styles/App.css';
import { invoke } from '@tauri-apps/api/tauri';
import React, { useState } from 'react';

function App() {
  const [greetMsg, setGreetMsg] = useState('');
  const [name, setName] = useState('');
  const { retrieve } = useNative();
  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke('greet', { name }));
    console.log(await invoke('bobus', {}));
    console.log(await invoke('retrieve_disks', {}));
    console.log(
      await invoke('retrieve_files_from_folder', {
        disk: 'C:\\\\Users\\Evgeniy\\Documents\\Github\\AVR\\main.go',
      }),
    );
    console.log(
      await invoke('open_file_in_apps', {
        creatureType: 1,
        path: 'C:\\\\Users\\Evgeniy\\Documents\\Github\\AVR\\main.go',
      }),
    );
    // await invoke("open_file_in_apps", {creatureType: 1, path: "https://www.instagram.com/"})
  }

  return (
    <div className="container">
      <h1>Welcome to Tauri!</h1>
      <div className="row">
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank" rel="noreferrer">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer" />
      </div>

      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>

      <p>{greetMsg}</p>
    </div>
  );
}

export default App;
