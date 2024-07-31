import { useState } from 'react';
import './App.css';
import Header from './Components/Header';
import Main from './Components/Main';

function App() {
  let boards =[
    {
      boardName:"Platform Launch",
      columns:[
        {
          columnName:'Todo',
          tasks:[
            {
              taskName:'Building UI for onboarding flow',
            },
            {
              taskName:'Building UI for search',
            },
            {
              taskName:'Build settings UI',
            },
            {
              taskName:'QA and test all major users journeys',
            },
            {
              taskName:'Building UI for onboarding flow',
            },
            {
              taskName:'Building UI for search',
            },
            {
              taskName:'Build settings UI',
            },
            {
              taskName:'QA and test all major users journeys',
            },
            {
              taskName:'Building UI for onboarding flow',
            },
            {
              taskName:'Building UI for search',
            },
            {
              taskName:'Build settings UI',
            },
            {
              taskName:'QA and test all major users journeys',
            },
          ],
        },
        {
          columnName:'Doing',
          tasks:[
            {taskName:'Research pricing points of various competitors and trial different business models'},
          ]
        },
        {
          columnName:'Done',
        },
        {
          columnName:'Todo',
        },
        {
          columnName:'Doing',
        },
        {
          columnName:'Done',
        },
      ],
    },
    {
      boardName:"Marketing Plan",
      columns:[
        {
          columnName:'Todo',
        },
        {
          columnName:'Doing',
        },
        {
          columnName:'Done',
        },
      ],
    },
    {
      boardName:"Roadmap",
      columns:[
        {
          columnName:'Todo',
        },
        {
          columnName:'Doing',
        },
        {
          columnName:'Done',
        },
      ],
    }
  ];
  const [board, setBoard] = useState(boards[0].boardName)
  const switchBoard=(i)=>{
    setBoard(boards[i].boardName)
  }
  return (
    <div className="App h-full">
      <Header board={board}/>
      <Main boards={boards} switchBoard={switchBoard}/>
    </div>
  );
}

export default App;
