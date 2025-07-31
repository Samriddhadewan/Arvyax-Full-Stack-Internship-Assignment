import { useAppContext } from "../context/AppContext";

const Navbar = () => {
    const {token,user, navigate} = useAppContext()
    console.log(user)
  return (
    <div className='flex max-w-[1550px] mx-auto items-center justify-between py-6   cursor-pointer'>
      <div className="">
        <h1 className="text-3xl font-semibold text-[#92857d]">Wellness Sessions</h1>
      </div>
      <div className="">
        <button onClick={()=> navigate("/user")} className="bg-[#D9885B] hover:bg-[#C84B31] cursor-pointer rounded-sm text-white px-10 py-2.5 font-semibold">
          {token ? 'Dashboard' : `Login`}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
