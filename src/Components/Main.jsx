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
        },
        {
          columnName:'Doing',
        },
      ],
  });
  const [activeBoard, setActiveBoard] = useState(0);
  const [showSidebar, setSidebar] = useState(true);
  const [createBoardModal, setCreateBoardModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
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
    setNewBoard({
      boardName:"",
        columns:[
          {
            columnName:'Todo',
          },
          {
            columnName:'Doing',
          },
        ],
    });
  }
  const handleAddNewColumn=()=>{
    setNewBoard((prevBoard) => {
      let updatedColumns = [...prevBoard.columns, {columnName:''}]
      return { ...prevBoard, columns: updatedColumns};
    });
  }

  const handleRemoveColumn=(index)=>{
    console.log(index)
    setNewBoard((prevBoard) => {
      const updatedColumns = prevBoard.columns.filter((c,i)=>i!=index)
      return { ...prevBoard, columns: updatedColumns };
    });
  }

  useEffect(()=>{
    if(createBoardModal===false){
      setErrorMsg('');
      setNewBoard({
        boardName:"",
          columns:[
            {
              columnName:'Todo',
            },
            {
              columnName:'Doing',
            },
          ],
      });
    }
  },[createBoardModal])


  return (
    <div className="flex" style={{height:'91.2%'}}>
        <div id="sidebar" className={`duration-500 ${showSidebar?'relative w-[270px] h-full pb-8':'w-0 overflow-hidden h-full pb-8'}`}>
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
                {props.boards[activeBoard].columns.map((c,i)=>{
                  return <div key={i}className="h-full min-w-[320px] w-fit pb-4 overflow-scroll px-3">
                      <p className="mb-8 font-bold text-asd text-xs tracking-widest">{`${c.columnName} (${c.tasks?.length>0 ? c.tasks?.length : "0"})`}</p>
                      <div className="flex flex-col gap-6">
                        {c.tasks?.map((t,i)=>{
                          return <div key={i} className="cursor-pointer gap-y-2 bg-white p-4 rounded-xl flex flex-col w-full justify-center min-h-[100px] card-shadow">
                              <p className="font-bold">{t.taskName}</p>
                              <p className="font-bold text-asd text-xs tracking-widest">1 of 3 subtasks</p>
                          </div>
                        })}
                      </div>
                  </div>
                })}
                <div id="new-column" className=" text-asd hover:text-purple font-bold rounded-lg flex justify-center items-center bg-light-purple text-2xl h-full min-w-[300px] cursor-pointer">
                    <p>+ New Column</p>
                </div>
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
              {newBoard.columns.map((c,i)=>{
                return <div className="flex items-center" key={i}>
                    <input type="text" value={c.columnName} onChange={(e)=>{handleColumnNameChange(i, e.target.value)}} className="placeholder:text-sm border-[1px] w-full p-2 rounded-md"/>
                    <img src={x} onClick={()=>{handleRemoveColumn(i)}} alt="" className="h-full ml-2 cursor-pointer"/>
                </div>
              })}
            </div>
            <p className="text-red-600 font-bold">{errorMsg}</p>
            <button onClick={handleAddNewColumn} className="bg-purple text-white w-full py-2 rounded-full">+ Add New Column</button>
            <button onClick={handleAddBoard} className="bg-purple text-white w-full py-2 rounded-full">Create New Column</button>
          </div>   
        </div>  
        
    
    </div>
  );
}

export default Main;