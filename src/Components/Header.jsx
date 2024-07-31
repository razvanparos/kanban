import logo from "../Assets/logo-mobile.e60c2fbc3dcefa4256e0569ffba5e523.svg"
import dots from "../Assets/icon-vertical-ellipsis.5c8996197d4a9dd7a7adfa20ce4abef9.svg"
function Header(props) {
  return (
    <div className="min-h-20 flex items-center px-6 justify-between">
        <div className="flex items-center">
            <img src={logo} alt="" className="pr-4"/>
            <p className="text-3xl font-bold">kanban</p>
        </div>
        <div className="w-5/6 flex justify-between items-center">
            <p className="text-xl font-bold">{props.board}</p>
            <div className="flex gap-x-6 items-center">
                <button className="bg-purple 
                 text-white p-3 rounded-full font-semibold 
                 px-6 hover:opacity-75 duration-300">+ Add New Task</button>
                <img src={dots} alt="" className="h-full cursor-pointer"/>
            </div>
        </div>
    </div>
  );
}

export default Header;
