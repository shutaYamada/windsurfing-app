import React from 'react'
import Registrations from './auth/Registrations'
import Login from './auth/Login'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Home = (props) => {
    console.log(props)

    // const handleSuccessfulAuthentication = (data) => {
    //     Navigate("/dashboard")
    // }
    const navigate = useNavigate()
    const handleSuccessfulAuth = (data) => {
        props.handleLogin(data)
        navigate("/Dashboard")
    }

    const handleLogoutClick = () => {
        axios.delete("http://localhost:3001/logout", { withCredentials: true })
            .then(response => {
                props.handleLogout()
            }).catch(error => console.log("ログアウトエラー", error))
    }


  return (
    <div>
        <h1>Home</h1>
        <h2>ログイン状態: {props.loggedInStatus}</h2>
        <button onClick={handleLogoutClick}>ログアウト</button>
        {/* <Registrations handleSuccessfulAuthentication={handleSuccessfulAuthentication} /> */}
        <Registrations  handleSuccessfulAuth={ handleSuccessfulAuth} />
        <Login  handleSuccessfulAuth={ handleSuccessfulAuth} />
    </div>
  )
}

export default Home
