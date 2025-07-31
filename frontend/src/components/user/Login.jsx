import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext.jsx";
import axios from "axios";
import toast from "react-hot-toast";


const Login = () => {
  const {setToken, navigate, setUser} = useAppContext();

  const [currentState, setCurrentState] = useState("login");

  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      if(currentState === "login"){
        const res = await axios.post("/api/login", {email, password})
        if(res.data.success){
          toast.success('Successfully Logged In')
          const token = res.data.token;

          localStorage.setItem('token', token);
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          setToken(token)

          const profileRes = await axios.get("/api/user");
          if(profileRes.data.success){
            setUser(profileRes.data.user);
            navigate("/")
          }
        }
        else{
          toast.error(res.data.message)
        }
      }
      else{
        const res = await axios.post("/api/register", {name,email, password})
        if(res.data.success){
          toast.success('Successfully Created Account')
          const token = res.data.token;

          localStorage.setItem('token', token);
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          setToken(token)

          const profileRes = await axios.get("/api/user");
          if(profileRes.data.success){
            setUser(profileRes.data.user);
            navigate("/")
          }
        }
      }
    } catch (error) {
      alert(error.message)
    }
  };




  return (
    <div className="min-h-screen flex items-center justify-center">
        <form
      onSubmit={onSubmitHandler}
      className="flex flex-col rounded-sm items-center border-[#D9885B]/95 shadow-xl shadow-[#D9885B]/15 w-[90%] border px-5 py-8 sm:max-w-96 m-auto  gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl"> <span className=" text-[#D9885B] font-semibold" >User</span> {currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState === "login" ? (
        ""
      ) : (
        <input
        onChange={(e)=> setName(e.target.value)}
        value={name}
        type="text"
          className="w-full px-3 border py-1 border-gray-800"
          placeholder="Name"
          required
        />
      )}
      <input
      onChange={(e)=>setEmail(e.target.value)}
      value={email}
        type="email"
        className="w-full px-3 border py-1 border-gray-800"
        placeholder="Email"
        required
      />
      <input
      onChange={(e)=>setPassword(e.target.value)}
      value={password}
        type="password"
        className="w-full px-3 border py-1 border-gray-600"
        placeholder="Password"
        required
      />

      <div className="w-full flex justify-end text-sm mt-[-8] underline">
        {currentState === "login" ? (
          <p
            onClick={() => setCurrentState("Sign up")}
            className="cursor-pointer"
          >
            Create Account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("login")}
            className="cursor-pointer"
          >
            Login here
          </p>
        )}
      </div>
      <button type="submit" className="bg-[#D9885B] rounded hover:bg-[#C84B31] text-white font-white px-8 py-2 mt-4">
        {currentState === "login" ? "Login" : "Sign Up"}
      </button>
    </form>
    </div>
  );
};

export default Login;