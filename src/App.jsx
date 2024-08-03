import { useState } from 'react';
import './App.css';
import Header from './Components/Header';
import Main from './Components/Main';

function App() {
  const [boards, setBoards]=useState([
    {
      boardName:"Platform Launch",
      columns:[
        {
          columnName:'Todo',
          tasks:[
            {
              taskName:'Building UI for onboarding flow',
              taskColumn:'',
              subtasks:[
                {
                  subtaskName:'',
                  subtaskDone:true
                },
                {
                  subtaskName:'',
                  subtaskDone:false
                },
              ]
            },
            {
              taskName:'Building UI for search',
              taskColumn:'',
              subtasks:[
                {
                  subtaskName:'',
                  subtaskDone:false
                },
                {
                  subtaskName:'',
                  subtaskDone:false
                },
                {
                  subtaskName:'',
                  subtaskDone:false
                },
                {
                  subtaskName:'',
                  subtaskDone:false
                },
              ]
            },
            {
              taskName:'Build settings UI',
              taskColumn:'',
              subtasks:[
                {
                  subtaskName:'',
                  subtaskDone:false
                },
                {
                  subtaskName:'',
                  subtaskDone:false
                },
              ]
            },
            {
              taskName:'QA and test all major users journeys',
              taskColumn:'',
              subtasks:[
                {
                  subtaskName:'',
                  subtaskDone:false
                },
                {
                  subtaskName:'',
                  subtaskDone:false
                },
              ]
            },
            {
              taskName:'Building UI for onboarding flow',
              taskColumn:'',
              subtasks:[
                {
                  subtaskName:'',
                  subtaskDone:false
                },
                {
                  subtaskName:'',
                  subtaskDone:false
                },
              ]
            },
            {
              taskName:'Building UI for search',
              taskColumn:'',
              subtasks:[
                {
                  subtaskName:'',
                  subtaskDone:false
                },
                {
                  subtaskName:'',
                  subtaskDone:false
                },
              ]
            },
            {
              taskName:'Build settings UI',
              taskColumn:'',
              subtasks:[
                {
                  subtaskName:'',
                  subtaskDone:false
                },
                {
                  subtaskName:'',
                  subtaskDone:false
                },
              ]
            },
            {
              taskName:'QA and test all major users journeys',
              taskColumn:'',
              subtasks:[
                {
                  subtaskName:'',
                  subtaskDone:false
                },
                {
                  subtaskName:'',
                  subtaskDone:false
                },
              ]
            },
            {
              taskName:'Building UI for onboarding flow',
              taskColumn:'',
              subtasks:[
                {
                  subtaskName:'',
                  subtaskDone:false
                },
                {
                  subtaskName:'',
                  subtaskDone:false
                },
              ]
            },
            {
              taskName:'Building UI for search',
              taskColumn:'',
              subtasks:[
                {
                  subtaskName:'',
                  subtaskDone:false
                },
                {
                  subtaskName:'',
                  subtaskDone:false
                },
              ]
            },
            {
              taskName:'Build settings UI',
              taskColumn:'',
              subtasks:[
                {
                  subtaskName:'',
                  subtaskDone:false
                },
                {
                  subtaskName:'',
                  subtaskDone:false
                },
              ]
            },
            {
              taskName:'QA and test all major users journeys',
              taskColumn:'',
              subtasks:[
                {
                  subtaskName:'',
                  subtaskDone:false
                },
                {
                  subtaskName:'',
                  subtaskDone:false
                },
              ]
            },
          ],
        },
        {
          columnName:'Doing',
          tasks:[
            {
              taskName:'Research pricing points of various competitors and trial different business models',
              taskColumn:'',
              subtasks:[
                {
                  subtaskName:'',
                  subtaskDone:false
                },
                {
                  subtaskName:'',
                  subtaskDone:false
                },
              ]
            },
          ]
        },
        {
          columnName:'Done',
          tasks:[],
        },
        {
          columnName:'Todo',
          tasks:[],
        },
        {
          columnName:'Doing',
          tasks:[],
        },
        {
          columnName:'Done',
          tasks:[],
        },
      ],
    },
    {
      boardName:"Marketing Plan",
      columns:[
        {
          columnName:'Todo',
          tasks:[],
        },
        {
          columnName:'Doing',
          tasks:[],
        },
        {
          columnName:'Done',
          tasks:[],
        },
      ],
    },
    {
      boardName:"Roadmap",
      columns:[
        {
          columnName:'Todo',
          tasks:[],
        },
        {
          columnName:'Doing',
          tasks:[],
        },
        {
          columnName:'Done',
          tasks:[],
        },
      ],
    }
  ]);
  const [board, setBoard] = useState(boards[0].boardName)
  const [newTaskModal, setNewTaskModal] = useState(false);
  const switchBoard=(i)=>{
    setBoard(boards[i].boardName)
  }
  const updateBoards=(newBoard)=>{
    let newBoards = [...boards, newBoard]
    console.log(newBoards)
    setBoards(newBoards)
  }
  const updateEditBoards=(board,i)=>{
    let updatedBoards = boards;
    boards[i]=board;
    setBoards(updatedBoards);
  }
  const updateTasks=(task,i)=>{
    console.log(task)
    let updatedBoards = boards;
    boards[i].columns[task.taskColumn].tasks.push(task)
    console.log(updatedBoards)
    setBoards(updatedBoards);
  }
  const taskModalStatus=(state)=>{
    setNewTaskModal(state);
  }

  return (
    <div className="App h-full">
      <Header board={board} taskModalStatus={taskModalStatus}/>
      <Main 
        boards={boards} 
        switchBoard={switchBoard} 
        updateBoards={updateBoards} 
        updateEditBoards={updateEditBoards} 
        newTaskModal={newTaskModal}
        taskModalStatus={taskModalStatus}
        updateTasks={updateTasks}
      />
    </div>
  );
}

export default App;
