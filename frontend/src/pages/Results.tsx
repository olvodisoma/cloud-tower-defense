import { useParams } from 'react-router-dom';

export default function Results() {
  const { matchId } = useParams();
  return <h1>Results Page – Match ID: {matchId}</h1>;
}