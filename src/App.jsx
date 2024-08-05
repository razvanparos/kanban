import { useEffect, useState } from 'react';
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
              taskColumn:'0',
              subtasks:[
                {
                  subtaskName:'Subtask 1',
                  subtaskDone:true
                },
                {
                  subtaskName:'Subtask 2',
                  subtaskDone:false
                },
              ]
            },
            {
              taskName:'Building UI for search',
              taskColumn:'0',
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
              taskColumn:'0',
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
              taskColumn:'0',
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
              taskColumn:'0',
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
              taskColumn:'0',
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
              taskColumn:'0',
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
              taskColumn:'0',
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
              taskColumn:'0',
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
              taskColumn:'1',
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
    boards[i].columns[task.taskColumn].tasks?.push(task)
    console.log(updatedBoards)
    setBoards(updatedBoards);
  }
  const updateSubtask = (task, activeBoard, column, taskIdx) => {
    let copyBoards = [...boards];
    copyBoards[activeBoard].columns[column].tasks[taskIdx] = task;
    setBoards(copyBoards);
  };

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
        updateSubtask={updateSubtask}
      />
    </div>
  );
}

export default App;
