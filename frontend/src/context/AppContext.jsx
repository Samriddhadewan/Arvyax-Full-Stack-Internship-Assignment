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
  const token = localStorage.getItem("token");
  if (token) {
    setToken(token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`; 

    axios.get("/api/user")
    .then((res)=> {
        if(res.data.success){
            setUser(res.data.user)
        }
    })
    .catch((err)=>{
        console.error("Failed to fetch data", err)
    })
  }
}, []);

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
