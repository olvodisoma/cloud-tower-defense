import React, { useEffect } from "react";
import socket from "./socket";

function Game() {
  useEffect(() => {
    // Figyel mobokra
    socket.on("receiveMob", (data) => {
      console.log("Mob érkezett:", data);
    });

    // cleanup amikor a komponens bezáródik
    return () => {
      socket.off("receiveMob");
    };
  }, []);

  // Teszt gomb mob küldéshez
  const sendMob = () => {
    socket.emit("sendMob", { mobType: "orc", strength: 5 });
  };

  return (
    <div>
      <h1>Mini Tower Defense</h1>
      <button onClick={sendMob}>Küldj mobot</button>
    </div>
  );
}

export default Game;
