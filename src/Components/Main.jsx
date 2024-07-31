import { useState } from "react";
import boardIcon from "../Assets/icon-board.29b48f5174742b4dd3a04f52d710293c.svg"
import hideIcon from "../Assets/icon-hide-sidebar.0e2c68ccd652fb10d8ba0c0c7f3a2f60.svg"
import showIcon from "../Assets/icon-show-sidebar.b186c9a8e4a2e4d7d83e0676d3e128fc.svg"

function Main(props) {
  const [activeBoard, setActiveBoard] = useState(0);
  const [showSidebar, setSidebar] = useState(true);
  const boardClick=(i)=>{
    setActiveBoard(i)
    props.switchBoard(i)
  }
  return (
    <div className="" style={{height:'91.2%'}}>
        <div id="sidebar" className={`duration-500 ${showSidebar?'relative w-[270px] h-full pb-8':'w-0 overflow-hidden h-full pb-8'}`}>
          <div className="flex flex-col h-full justify-between">
            <div>
              <p className="text-gray-500 text-sm tracking-widest font-bold p-4 w-[200px]">{`ALL BOARDS (${props.boards.length})`}</p>
              <div className="flex flex-col gap-2 mt-6">
                {props.boards.map((b,i)=>{
                  return <div onClick={()=>{boardClick(i)}} className={`${activeBoard===i ? 'overflow-hidden flex items-center text-base bg-purple w-[220px] max-w-[220px] max-h-12 p-3 pr-10 text-white font-bold rounded-r-full cursor-pointer hover:bg-blue-100 hover:text-purple duration-300' : 'overflow-hidden flex items-center text-base w-[220px] p-3 pr-10 text-gray-500 font-bold rounded-r-full cursor-pointer hover:bg-blue-100 hover:text-purple duration-300'} `}>
                    <img src={boardIcon} alt="" className="mr-2 h-full"/>
                    <p className="w-full">{b}</p>
                  </div>
                })}
                <div className="flex items-center text-base w-[220px] max-w-[220px] p-3 pr-2 text-purple font-bold rounded-r-full cursor-pointer hover:bg-blue-100 hover:text-purple duration-300">
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
        
    </div>
  );
}

export default Main;