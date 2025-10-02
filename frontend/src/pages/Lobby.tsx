import { useNavigate } from 'react-router-dom';
import { useStore } from '../app/store';

export default function Lobby() {
  const navigate = useNavigate();
  const setMatch = useStore((s) => s.setMatch);

  async function joinQueue() {
    // ⚠️ Most még csak mock — később API hívás lesz: POST /queue/join
    const matchId = crypto.randomUUID(); // ideiglenesen random
    setMatch({ matchId });
    navigate(`/game/${matchId}`);
  }

  return (
    <div>
      <h1>Lobby Page</h1>
      <button onClick={joinQueue}>Csatlakozás a meccshez</button>
    </div>
  );
}
