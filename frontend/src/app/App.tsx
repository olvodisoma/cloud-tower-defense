import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login.tsx';
import Lobby from '../pages/Lobby.tsx';
import Game from '../pages/Game.tsx';
import Results from '../pages/Results.tsx';
import Leaderboard from '../pages/Leaderboard.tsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/game/:matchId" element={<Game />} />
        <Route path="/results/:matchId" element={<Results />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </BrowserRouter>
    
  );
}