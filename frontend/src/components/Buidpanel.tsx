export function BuildPanel({ onBuild }: { onBuild: (type:string)=>void }) {
  const towers = [
    {type:'arrow', cost:20}, {type:'cannon', cost:35},
    {type:'mage', cost:40}, {type:'frost', cost:25}, {type:'air', cost:30}
  ];
  
  return <div>
    <h3>Tornyok</h3>
    {towers.map(t => <button key={t.type} onClick={()=>onBuild(t.type)}>
      {t.type} ({t.cost})
    </button>)}
  </div>;
}