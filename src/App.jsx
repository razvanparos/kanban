import { useState } from 'react';
import './App.css';
import Header from './Components/Header';
import Main from './Components/Main';
import taskData from './tasks.json'

function App() {
  const [boards, setBoards] = useState(taskData);
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
