import logo from "../Assets/logo-mobile.e60c2fbc3dcefa4256e0569ffba5e523.svg"
import dots from "../Assets/icon-vertical-ellipsis.5c8996197d4a9dd7a7adfa20ce4abef9.svg"
import { useState } from "react";
function Header(props) {
  const [boardDropdown, setBoardDropdown]=useState(false)
  const handleOpenEdit=()=>{
    setBoardDropdown(false)
    props.handleOpenEdit(true)
  }
  const handleOpenDelete=()=>{
    setBoardDropdown(false)
    props.handleOpenDelete(true)
  }
  return (
    <div className="min-h-20 w-full flex items-center px-6 justify-between relative">
        <div className="flex items-center">
            <img src={logo} alt="" className="pr-4"/>
            <p className="text-3xl font-bold hidden md:block">kanban</p>
        </div>
        <div className="w-5/6 flex justify-between items-center">
            <p className="text-xl font-bold">{props.board}</p>
            <div className={`${props.addNewTaskButton?'flex gap-x-6 items-center':'hidden'}`}>
                <button className={`bg-purple text-white p-3 rounded-full font-semibold px-6 hover:opacity-75 duration-300 hidden md:block`} onClick={()=>{props.taskModalStatus(true)}}>+ Add New Task</button>
                <button className={`bg-purple text-white rounded-full px-4 pb-1 text-xl md:hidden`} onClick={()=>{props.taskModalStatus(true)}}>+</button>
                <img onClick={()=>{setBoardDropdown(!boardDropdown)}} src={dots} alt="" className="h-full cursor-pointer"/>
                <div className={`bg-white gap-y-4 flex flex-col items-start rounded-xl duration-300 absolute p-4 shadow-xl bottom-0 translate-y-full ${boardDropdown? ' ':' overflow-hidden opacity-0 pointer-events-none'}`}>
                  <button onClick={handleOpenEdit} className="text-md">Edit board</button>
                  <button onClick={handleOpenDelete} className="text-md text-red-600">Delete board</button>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Header;
