import {useEffect, useState } from "react";
import boardIcon from "../Assets/icon-board.29b48f5174742b4dd3a04f52d710293c.svg"
import hideIcon from "../Assets/icon-hide-sidebar.0e2c68ccd652fb10d8ba0c0c7f3a2f60.svg"
import showIcon from "../Assets/icon-show-sidebar.b186c9a8e4a2e4d7d83e0676d3e128fc.svg"
import x from '../Assets/icon-cross.d4ca9e0d2a82f7ea4ae08238a42f84ed.svg'

function Main(props) {
  const [newBoard, setNewBoard] = useState({
    boardName:"",
    columns:[
      {
        columnName:'Todo',
        tasks:[],
      },
      {
        columnName:'Doing',
        tasks:[],
      },  
    ]
  });
  const [newTask, setNewTask] = useState(
    {
      taskName:'',
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
    }
  );
  const [activeBoard, setActiveBoard] = useState(0);
  const [column, setColumn] = useState(0);
  const [task, setTask] = useState(0);
  const [showSidebar, setSidebar] = useState(true);
  const [createBoardModal, setCreateBoardModal] = useState(false);
  const [taskModal, setTaskModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [targetColumn, setTargetColumn] = useState();
  const [draggedCard, setDraggedCard] = useState();
  const [openTask, setOpenTask] = useState({taskName:'',taskColumn:'0',subtasks:[]});
  const [copyCurrentBoard, setCopyCurrentBoard] = useState(props.boards[activeBoard]);
  
  
  const boardClick=(i)=>{
    setActiveBoard(i)
    props.switchBoard(i)
  }
  const stopPropagation=(e)=>{
      e.stopPropagation();
  }
  const handleColumnNameChange = (index, newColumnName) => {
    setNewBoard((prevBoard) => {
      const updatedColumns = prevBoard.columns.map((column, i) =>
        i === index ? { ...column, columnName: newColumnName } : column
      );
      return { ...prevBoard, columns: updatedColumns };
    });
  };
  const changeNewBoardName=(value)=>{
    setNewBoard((prevBoard)=>{
      return { ...prevBoard, boardName: value };
    })
  }
  const editNewTaskName=(value)=>{
    setNewTask((prevBoard)=>{
      return { ...prevBoard, taskName: value };
    })
  }
  const handleAddBoard=()=>{
    if(newBoard.boardName===''){
      setErrorMsg('All fields are required')
      return
    }else{setErrorMsg('')}
    for(let i=0;i<newBoard.columns.length;i++){
      if(newBoard.columns[i].columnName===''){
        setErrorMsg('All fields are required')
        return
      }else{setErrorMsg('')}
    } 
    props.updateBoards(newBoard);
    setCreateBoardModal(false)
  }
  const handleAddNewColumn=()=>{
    setNewBoard((prevBoard) => {
      let updatedColumns = [...prevBoard.columns, {columnName:'', tasks:[]}]
      return { ...prevBoard, columns: updatedColumns};
    });
  }

  const handleRemoveColumn=(index)=>{
    setNewBoard((prevBoard) => {
      const updatedColumns = prevBoard.columns.filter((c,i)=>i!=index)
      return { ...prevBoard, columns: updatedColumns };
    });
  }
  const editBoardName=(val)=>{
    setCopyCurrentBoard((prevBoard)=>{
      return { ...prevBoard, boardName: val };
    })
  }
  const handleColumnNameEdit=(i, val)=>{
    setCopyCurrentBoard((prevBoard)=>{
        const updatedColumns = prevBoard.columns.map((c,idx)=>
            idx===i ?{...c, columnName:val}: c)
        return {...prevBoard, columns:updatedColumns}
    })
  }
  const handleSubtaskNameEdit=(i, val)=>{
    setNewTask((prevTask)=>{
        const updatedTask = prevTask.subtasks.map((s,idx)=>
            idx===i ?{...s, subtaskName:val}: s)
        return {...prevTask, subtasks:updatedTask}
    })
  }
  const handleRemoveEditColumn=(i)=>{
    setCopyCurrentBoard((prevBoard)=>{
        const updatedColumns = prevBoard.columns.filter((c,idx)=>idx!=i)
        return {...prevBoard, columns:updatedColumns}
    })
  }
  const handleRemoveSubtask=(i)=>{
    setNewTask((prevTask)=>{
        const updatedTask = prevTask.subtasks.filter((c,idx)=>idx!=i)
        return {...prevTask, subtasks:updatedTask}
    })
  }
  const handleAddNewEditColumn=()=>{
    setCopyCurrentBoard((prevBoard) => {
      let updatedColumns = [...prevBoard.columns, {columnName:'',tasks:[]}]
      return { ...prevBoard, columns: updatedColumns};
    });
  }
  const handleAddSubtask=()=>{
    setNewTask((prevTask) => {
      let updatedTasks = [...prevTask.subtasks, {subtaskName:'', subtaskDone:false}]
      return { ...prevTask, subtasks: updatedTasks};
    });
  }

  const handleSaveEditBoard=()=>{
    if(copyCurrentBoard.boardName===''){
      setErrorMsg('All fields are required')
      return
    }else{setErrorMsg('')}
    for(let i=0;i<copyCurrentBoard.columns.length;i++){
      if(copyCurrentBoard.columns[i].columnName===''){
        setErrorMsg('All fields are required')
        return
      }else{setErrorMsg('')}
    } 
    console.log(copyCurrentBoard)
    props.updateEditBoards(copyCurrentBoard,activeBoard);
    props.handleOpenEdit(false)
  }
  const handleCreateTask=()=>{
    if(newTask.taskName===''){
      setErrorMsg('All fields are required')
      return
    }else{setErrorMsg('')}
    for(let i=0;i<newTask.subtasks.length;i++){
      if(newTask.subtasks[i].subtaskName===''){
        setErrorMsg('All fields are required')
        return
      }else{setErrorMsg('')}
    } 
    if(newTask.taskColumn==='-1'|| !newTask.taskColumn){
      setErrorMsg('All fields are required')
      return
    }else{setErrorMsg('')}
    props.updateTasks(newTask,activeBoard);
    props.taskModalStatus(false);
  }
   const handleTaskStatus=(id)=>{
    setNewTask((prevTask)=>{
      return {...prevTask, taskColumn:id}
    }) 
   }
   const handleTaskModalStatus = (id) => {
    setOpenTask((prevTask) => {
      const updatedTask = { ...prevTask, taskColumn: id };
      props.removeTask(activeBoard,column,task)
      props.updateTasks(updatedTask, activeBoard);
      return updatedTask;
    });
    setTaskModal(false)
};

   const openTaskModal=(task,i)=>{
    setOpenTask(task)
    setTask(i);
    setTaskModal(true);
    
   }

   const handleColumnClick=(i)=>{
      setColumn(i);
   }
   const handleSubtaskToggle=(i)=>{
    let openTaskCopy = { ...openTask };
    openTaskCopy.subtasks[i].subtaskDone=!openTaskCopy.subtasks[i].subtaskDone;
    setOpenTask(openTaskCopy);
    props.updateSubtask(openTaskCopy, activeBoard, column, task);
  };
   
  useEffect(()=>{
    if(createBoardModal===false){
      setErrorMsg('');
      setNewBoard({
        boardName:"",
          columns:[
            {
              columnName:'Todo',
              tasks:[]
            },
            {
              columnName:'Doing',
              tasks:[]
            },
          ],
      });
    }
  },[createBoardModal])
  
  useEffect(()=>{
    if(props.newTaskModal===false){
      document.getElementById('select').value=-1;
      setErrorMsg('');
      setNewTask( {
        taskName:'',
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
      });
    }
  },[props.newTaskModal])

  useEffect(()=>{
    setCopyCurrentBoard(props.boards[activeBoard])
  },[activeBoard])
  
  useEffect(()=>{
    setCopyCurrentBoard(props.boards[activeBoard])
  },[props.boards])


  useEffect(()=>{
    setErrorMsg('')
    if(props.editBoardModal===false){
      setCopyCurrentBoard(props.boards[activeBoard])
    }
  },[props.editBoardModal])
  
  useEffect(() => {
    if (props.boards[activeBoard]?.columns[column]?.tasks[task]) {
      setOpenTask(props.boards[activeBoard].columns[column].tasks[task]);
    }
 }, [props.boards, activeBoard, column, task]);
  
 const handleConfirmDelete=()=>{
  props.handleDeleteBoard(activeBoard)
  setActiveBoard(0)
 }
 const dragOverColumn=(e,i)=>{
   e.preventDefault();
   setTargetColumn(i);
 }

 const dragCardStart=(i)=>{
    setDraggedCard(i)
    
 }
 const onCardDrop=(target)=>{
  props.updateDragTasks(props.boards[activeBoard].columns[column].tasks[draggedCard], activeBoard, target);
  props.removeTask(activeBoard,column,draggedCard)

 }



  return (
    <div className={`flex`} style={{height:'91.2%'}}>
        <div id="sidebar" className={`duration-500 ${showSidebar?'hidden md:block relative w-[270px] h-full pb-8':'w-0 overflow-hidden h-full pb-8'}`}>
          <div className="flex flex-col h-full justify-between">
            <div>
              <p className="text-gray-500 text-sm tracking-widest font-bold p-4 w-[200px]">{`ALL BOARDS (${props.boards?.length})`}</p>
              <div className="flex flex-col gap-2 mt-6">
                {props.boards?.map((b,i)=>{
                  return <div key={i} onClick={()=>{boardClick(i)}} className={`${activeBoard===i ? 'overflow-hidden flex items-center text-base bg-purple w-[220px] max-w-[220px] max-h-12 p-3 pr-10 text-white font-bold rounded-r-full cursor-pointer hover:bg-blue-100 hover:text-purple duration-300' : 'overflow-hidden flex items-center text-base w-[220px] p-3 pr-10 text-gray-500 font-bold rounded-r-full cursor-pointer hover:bg-blue-100 hover:text-purple duration-300'} `}>
                    <img src={boardIcon} alt="" className="mr-2 h-full"/>
                    <p className="w-full">{b.boardName}</p>
                  </div>
                })}
                <div onClick={()=>{setCreateBoardModal(true)}} className="flex items-center text-base w-[220px] max-w-[220px] p-3 pr-2 text-purple font-bold rounded-r-full cursor-pointer hover:bg-blue-100 hover:text-purple duration-300">
                  <img src={boardIcon} alt="" className="mr-2 h-full"/>
                  <p className="w-full">+ Create New Board</p>
                </div>
              </div>
            </div>
            <div onClick={()=>{setSidebar(false)}} className="flex items-center text-base w-[220px]  p-3 pr-10 text-gray-500 font-bold rounded-r-full cursor-pointer hover:bg-blue-100 hover:text-purple duration-300">
              <img src={hideIcon} alt="" className="mr-2 " />
              <p className="text-base">Hide Sidebar</p>
            </div>
          </div>
          <div>
          </div>
          <div onClick={()=>{setSidebar(true)}} className={showSidebar?'absolute hidden duration-500 opacity-0':'opacity-100 duration-500 absolute bottom-12 left-0 flex items-center justify-end bg-purple rounded-r-full max-w-20 min-w-20 pr-4 min-h-12 cursor-pointer hover:opacity-75'}>
              <img src={showIcon} alt="" className="mr-2" />
          </div>
        </div>

        <div id="columns" className="w-full flex p-4 gap-x-4 overflow-scroll bg-columnBg ">
                {props.boards[activeBoard]?.columns?.map((c,i)=>{
                  return <div onDrop={()=>{onCardDrop(targetColumn)}} onDragOver={(e)=>{dragOverColumn(e,i)}}  onMouseOver={()=>{handleColumnClick(i)}} key={i} className="h-full min-w-[320px] max-w-[320px] w-fit pb-4 overflow-scroll px-3">
                      <p className="mb-8 font-bold text-asd text-xs tracking-widest">{`${c.columnName} (${c.tasks?.length>0 ? c.tasks?.length : "0"})`}</p>
                      <div className="flex flex-col gap-6">
                        {c.tasks?.map((t,i)=>{
                          return <div draggable={true} onDragStart={()=>{dragCardStart(i,column)}} onClick={()=>{openTaskModal(t,i)}} key={i} className="cursor-pointer gap-y-2 bg-white p-4 rounded-xl flex flex-col w-full justify-center min-h-[88px] card-shadow">
                              <p className="font-bold">{t.taskName}</p>
                              <p className="font-bold text-asd text-xs tracking-widest">{`${t.subtasks.filter((s)=>s.subtaskDone===true).length} of ${t.subtasks.length} subtasks`}</p>
                          </div>
                        })}
                      </div>
                  </div>
                })}
                {
                  props.boards.length>0? <div onClick={()=>{props.handleOpenEdit(true)}} id="new-column" className=" text-asd hover:text-purple font-bold rounded-lg flex justify-center items-center bg-light-purple text-2xl h-full min-w-[300px] cursor-pointer">
                    <p>+ New Column</p>
                  </div>:''
                }
        </div>

        <div onClick={()=>{setCreateBoardModal(false)}} id="new-board-modal" className={`${createBoardModal?'top-0 absolute h-screen w-screen flex items-center justify-center backdrop-brightness-50':'hidden'}`}>
          <div onClick={stopPropagation} className="w-[480px] h-fit max-h-[700px] overflow-y-scroll overflow-x-hidden bg-white rounded-xl p-6 z-10 flex flex-col justify-between gap-y-2 hide-scroll">
            <p className="font-bold text-lg">Add new board</p>
            <div className="flex flex-col gap-2">
              <p className="font-bold text-asd text-xs tracking-widest">Board name</p>
              <input type="text" value={newBoard.boardName} onChange={(e)=>{changeNewBoardName(e.target.value)}} placeholder="e.g. Web design" className="border-[1px] w-full p-2 rounded-md"/>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold text-asd text-xs tracking-widest">Board Columns</p>
              {newBoard.columns?.map((c,i)=>{
                return <div className="flex items-center" key={i}>
                    <input type="text" value={c.columnName} onChange={(e)=>{handleColumnNameChange(i, e.target.value)}} className="placeholder:text-sm border-[1px] w-full p-2 rounded-md"/>
                    <img src={x} onClick={()=>{handleRemoveColumn(i)}} alt="" className="h-full ml-2 cursor-pointer"/>
                </div>
              })}
            </div>
            <p className="text-red-600 font-bold">{errorMsg}</p>
            <button onClick={handleAddNewColumn} className="bg-purple text-white w-full py-2 rounded-full">+ Add New Column</button>
            <button onClick={handleAddBoard} className="bg-purple text-white w-full py-2 rounded-full">Create New Board</button>
          </div>   
        </div>
        
        <div onClick={()=>{props.handleOpenEdit(false)}} id="new-board-modal" className={`${props.editBoardModal?'top-0 absolute h-screen w-screen flex items-center justify-center backdrop-brightness-50':'hidden'}`}>
          <div onClick={stopPropagation} className="w-[480px] h-fit max-h-[700px] overflow-y-scroll overflow-x-hidden bg-white rounded-xl p-6 z-10 flex flex-col justify-between gap-y-2 hide-scroll">
            <p className="font-bold text-lg">Edit board</p>
            <div className="flex flex-col gap-2">
              <p className="font-bold text-asd text-xs tracking-widest">Board name</p>
              <input type="text" value={copyCurrentBoard?.boardName} onChange={(e)=>{editBoardName(e.target.value)}} placeholder="e.g. Web design" className="border-[1px] w-full p-2 rounded-md"/>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold text-asd text-xs tracking-widest">Board Columns</p>
              {copyCurrentBoard?.columns.map((c,i)=>{
                return <div className="flex items-center" key={i}>
                    <input type="text" value={c.columnName} onChange={(e)=>{handleColumnNameEdit(i, e.target.value)}} className="placeholder:text-sm border-[1px] w-full p-2 rounded-md"/>
                    <img src={x} onClick={()=>{handleRemoveEditColumn(i)}} alt="" className="h-full ml-2 cursor-pointer"/>
                </div>
              })}
            </div>
            <p className="text-red-600 font-bold">{errorMsg}</p>
            <button onClick={handleAddNewEditColumn} className="bg-purple text-white w-full py-2 rounded-full">+ Add New Column</button>
            <button onClick={handleSaveEditBoard} className="bg-purple text-white w-full py-2 rounded-full">Save Changes</button>
          </div>   
        </div>   

        <div onClick={()=>{props.taskModalStatus(false)}} id="new-board-modal" className={`${props.newTaskModal?'top-0 absolute h-screen w-screen flex items-center justify-center backdrop-brightness-50':'hidden'}`}>
          <div onClick={stopPropagation} className="w-[480px] h-fit max-h-[700px] overflow-y-scroll overflow-x-hidden bg-white rounded-xl p-6 z-10 flex flex-col justify-between gap-y-2 hide-scroll">
            <p className="font-bold text-lg">Add new task</p>
            <div className="flex flex-col gap-2">
              <p className="font-bold text-asd text-xs tracking-widest">Task name</p>
              <input type="text" value={newTask.taskName} onChange={(e)=>{editNewTaskName(e.target.value)}} placeholder="e.g. Take coffee break" className="border-[1px] w-full p-2 rounded-md"/>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold text-asd text-xs tracking-widest">Subtasks</p>
              {newTask.subtasks.map((c,i)=>{
                return <div className="flex items-center" key={i}>
                    <input type="text" value={c.subtaskName} onChange={(e)=>{handleSubtaskNameEdit(i, e.target.value)}} className="placeholder:text-sm border-[1px] w-full p-2 rounded-md"/>
                    <img src={x} onClick={()=>{handleRemoveSubtask(i)}} alt="" className="h-full ml-2 cursor-pointer"/>
                </div>
              })}
            </div>
            <button onClick={handleAddSubtask} className="bg-purple text-white w-full py-2 rounded-full">+ Add New Subtask</button>
            <div className="flex flex-col gap-2">
              <p className="font-bold text-asd text-xs tracking-widest">Current Status</p>
              <select name="" id="select" className="border-[1px] w-full p-2 rounded-md cursor-pointer" onChange={(e)=>{handleTaskStatus(e.target.value)}}>
                <option value={-1} hidden>Select status</option>
                {copyCurrentBoard?.columns.map((c,i)=>{
                  return <option key={i} value={i} className="cursor-pointer">{c.columnName}</option>
                })}
              </select>
            </div>
            <p className="text-red-600 font-bold">{errorMsg}</p>
            <button onClick={handleCreateTask} className="bg-purple text-white w-full py-2 rounded-full">Create Task</button>
          </div>   
        </div>  

        <div onClick={()=>{setTaskModal(false)}} id="new-board-modal" className={`${taskModal?'top-0 absolute h-screen w-screen flex items-center justify-center backdrop-brightness-50':'hidden'}`}>
          <div onClick={stopPropagation} className="w-[480px] h-fit max-h-[700px] overflow-y-scroll overflow-x-hidden bg-white rounded-xl p-6 z-10 flex flex-col justify-between gap-y-6 hide-scroll">
            <p className="font-bold text-lg">{openTask.taskName}</p>
            <p className="font-bold text-asd text-xs tracking-widest">{`Subtasks (${openTask.subtasks?.filter((s)=>s.subtaskDone===true).length}  of ${openTask.subtasks?.length})`}</p>
            <div className="flex flex-col gap-y-2">
              {openTask.subtasks?.map((t,i)=>{
                return <div key={i} onClick={()=>{handleSubtaskToggle(i)}} className="flex items-center gap-x-2 bg-columnBg cursor-pointer p-2 rounded-md min-h-[40px] hover:bg-fadedPurple">
                    {/* <input type="checkbox" defaultChecked={t.subtaskDone}/> */}
                    <p className={`font-semibold text-sm ${t.subtaskDone?'text-gray-400 line-through':''}`}>{t.subtaskName}</p>
                </div>
              })}
            </div>
            <p className="font-bold text-asd text-xs tracking-widest">Current Status</p>
            <select value={openTask.taskColumn} name="" id="select" className="border-[1px] w-full p-2 rounded-md cursor-pointer" onChange={(e)=>{handleTaskModalStatus(e.target.value)}}>
                {copyCurrentBoard?.columns.map((c,i)=>{
                  return <option key={i} value={i} className="cursor-pointer">{c.columnName}</option>})}
            </select>
          </div>   
        </div>  

        <div onClick={()=>{props.handleOpenDelete(false)}} id="new-board-modal" className={`${props.showDeleteModal?'top-0 absolute h-screen w-screen flex items-center justify-center backdrop-brightness-50':'hidden'}`}>
          <div onClick={stopPropagation} className="w-[480px] h-fit max-h-[700px] overflow-y-scroll overflow-x-hidden bg-white rounded-xl p-8 z-10 flex flex-col justify-between gap-y-6 hide-scroll">
            <p className="font-bold text-lg text-red-500">Delete this board?</p>
            <p className="text-sm text-asd font-medium">Are you sure you want to delete the "{props.boards[activeBoard]?.boardName}" board? This action will remove all columns and tasks and cannot be reversed.</p>
            <div className="w-full flex justify-between gap-x-6">
              <button onClick={handleConfirmDelete} className="bg-red-500 text-white p-2 w-full rounded-full font-bold">Delete</button>
              <button onClick={()=>{props.handleOpenDelete(false)}} className="font-bold w-full bg-light-purple text-purple rounded-full">Cancel</button>
            </div>
          </div>   
        </div>  

    </div>
  );
}

export default Main;