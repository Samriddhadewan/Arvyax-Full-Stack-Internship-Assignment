import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
  return (
    <div className='flex max-w-[1550px] mx-auto items-center justify-between py-6   cursor-pointer'>
      <div className="">
        <h1 className="text-3xl font-semibold text-gray-800">Wellness Sessions</h1>
      </div>
      <div className="">
        <button onClick={()=> navigate("/user")} className="bg-[#D9885B] hover:bg-[#C84B31] cursor-pointer rounded-sm text-white px-10 py-2.5 font-semibold">Login</button>
      </div>
    </div>
  );
};

export default Navbar;
