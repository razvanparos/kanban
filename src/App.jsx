import { useState } from 'react';
import './App.css';
import Header from './Components/Header';
import Main from './Components/Main';

function App() {
  let boards =['Platform Launch', 'Marketing Plan', 'Roadmap'];
  const [board, setBoard] = useState(boards[0])
  const switchBoard=(i)=>{
    setBoard(boards[i])
  }
  return (
    <div className="App h-full">
      <Header board={board}/>
      <Main boards={boards} switchBoard={switchBoard}/>
    </div>
  );
}

export default App;
