import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null);
  const [sessions, setSessions] = useState([]);
  
  
  
  useEffect(() => {
  const storedToken = localStorage.getItem("token");
  if (storedToken) {
    setToken(storedToken);
  }
}, []);

  useEffect(() => {
  const fetchUser = async ()=>{
    if(!token) return;

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    try{
      const res = await axios.get("/api/user")
      if(res.data.success){
        setUser(res.data.user);
      }
    }catch(error){
      setToken(null)
      setUser(null)
      localStorage.removeItem('token');
      delete axios.defaults.headers.common[`Authorization`];
      navigate('/user')
    }
  }
  fetchUser()
}, [navigate, token]);


const value = {
    navigate,
    token,
    setToken,
    sessions,
    setSessions,
    user,
    setUser
  };


  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  return useContext(AppContext);
};
