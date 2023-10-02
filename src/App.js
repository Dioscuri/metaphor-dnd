import './App.css';
import './OneshotQuery'
import OneshotQuery from './OneshotQuery';
import DnDMonsterQuery from './DnDMonsterQuery';
import MythQuery from './MythQuery';
import MonsterQuery from './MonsterQuery';

function App() {
  return (
    <div className="App">
      <OneshotQuery></OneshotQuery>
      <DnDMonsterQuery></DnDMonsterQuery>
      <MythQuery></MythQuery>
      <MonsterQuery></MonsterQuery>

    </div>
  );
}

export default App;
