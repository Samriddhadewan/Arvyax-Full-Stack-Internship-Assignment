import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home.jsx";
import Layout from "./pages/user/Layout.jsx";
import Login from "./components/user/Login.jsx";
import { useAppContext } from "./context/AppContext.jsx";
import Dashboard from "./pages/user/Dashboard.jsx";
import AddSession from "./pages/user/AddSession.jsx";
import MySessions from "./pages/user/MySessions.jsx";

function App() {
  const { token } = useAppContext();
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/user" element={token ? <Layout /> : <Login />}>
          <Route index element={<Dashboard />}></Route>
          <Route path="/user/addSession" element={<AddSession />}></Route>
          <Route path="/user/mySessions" element={<MySessions />}></Route>
          <Route path="/user/edit-session/:id" element={<AddSession />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
