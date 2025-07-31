import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home.jsx";
import Layout from "./pages/user/Layout.jsx";
import Login from "./components/user/Login.jsx";
import { useAppContext } from "./context/AppContext.jsx";

function App() {
  const {token} = useAppContext()
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/user" element={ token ? <Layout /> : <Login /> }></Route>
      </Routes>
    </div>
  );
}

export default App;
