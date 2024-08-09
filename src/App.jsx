import { useEffect, useState } from 'react';
import './App.css';
import Header from './Components/Header';
import Main from './Components/Main';
import taskData from './tasks.json'

function App() {
  const [boards, setBoards] = useState(taskData);
  const [board, setBoard] = useState(()=>{
    if(boards.length!=0){
      return boards[0].boardName
    }else return "";
  })
  const [newTaskModal, setNewTaskModal] = useState(false);
  const [editBoardModal, setEditBoardModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [addNewTaskButton, setAddNewTaskButton] = useState(true);
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
    let updatedBoards = boards;
    boards[i].columns[task.taskColumn].tasks?.push(task)
    setBoards(updatedBoards);
  }
  const updateDragTasks=(task,i,target)=>{
    let updatedBoards = boards;
    boards[i].columns[target].tasks?.push(task)
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
  
  const removeTask=(activeBoard,column,task)=>{
    let copyBoards = [...boards];
    let updateColumn = copyBoards[activeBoard].columns[column].tasks.filter((t,i)=>i!=task)
    copyBoards[activeBoard].columns[column].tasks=updateColumn
    setBoards(copyBoards)
  }

  const handleOpenEdit=(state)=>{
    setEditBoardModal(state)
  }
  const handleOpenDelete=(state)=>{
    setShowDeleteModal(state)
  }
  const handleDeleteBoard=(activeBoard)=>{
    setShowDeleteModal(false)
    let copyBoards = [...boards];
    let updateBoards = copyBoards.filter((b,i)=>i!=activeBoard)
    console.log(updateBoards)
    setBoards(updateBoards)
  }

  useEffect(()=>{
    if(boards.length===0){
      setBoard('')
      setAddNewTaskButton(false)
    }else {
      setBoard(boards[0].boardName)
      setAddNewTaskButton(true)
    }
  },[boards])

  return (
    <div className="App h-full">
      <Header
        board={board} 
        taskModalStatus={taskModalStatus} 
        handleOpenEdit={handleOpenEdit} 
        handleOpenDelete={handleOpenDelete}
        addNewTaskButton={addNewTaskButton}
       />
      <Main 
        boards={boards} 
        switchBoard={switchBoard} 
        updateBoards={updateBoards} 
        updateEditBoards={updateEditBoards} 
        newTaskModal={newTaskModal}
        taskModalStatus={taskModalStatus}
        updateTasks={updateTasks}
        updateSubtask={updateSubtask}
        removeTask={removeTask}
        handleOpenEdit={handleOpenEdit}
        editBoardModal={editBoardModal}
        showDeleteModal={showDeleteModal}
        handleOpenDelete={handleOpenDelete}
        handleDeleteBoard={handleDeleteBoard}
        updateDragTasks={updateDragTasks}
      />
    </div>
  );
}

export default App;
