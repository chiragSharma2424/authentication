import React, { useEffect } from 'react';
import {io} from 'socket.io-client'

function App() {
  const socket = io('http://localhost:3000');

  useEffect(() => {
    socket.on("connect", () => {});
    console.log("Connected", socket.id);
  }, []);

  return (
    <div>
      App
    </div>
  )
}

export default App;