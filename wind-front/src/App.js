import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App(props) {

  const [loggedInStatus, setLoggedInStatus] = useState("未ログイン")
  const [user, setUser] = useState({})
  const handleLogin = (data) => {
    console.log(data)
    setLoggedInStatus("ログイン中")
    setUser(data.user)
  }


  useEffect(() =>{
    checkLogin()
  })

  const checkLogin = () => {
    axios.get("http://localhost:3001/logged_in", { withCredentials: true })
      .then(response => {
        if (response.data.logged_in && loggedInStatus === "未ログイン") {
          setLoggedInStatus("ログイン中")
          setUser(response.data.user)
        } else if (!response.data.logged_in && loggedInStatus === "ログイン中") {
          setLoggedInStatus("未ログイン")
          setUser({})
        }
      console.log("ログイン状況", response)
    }).catch(error => {
      console.log("ログインエラー", error)
      
    })
  }


  const handleLogout = () => {
    setLoggedInStatus("未ログイン")
    console.log("a")
    setUser({})
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home {...props} loggedInStatus={loggedInStatus} handleLogin={handleLogin} handleLogout={handleLogout} />} />
          <Route path="/dashboard" element={<Dashboard {...props}  loggedInStatus={loggedInStatus} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
