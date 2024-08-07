import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import Login from './component/Login';
import Signup from './component/Signup';
import CreateThrift from './component/CreateThrift';
import Dashboard  from './component/Dashboard';
import Wallet from './component/Wallet';
import Dash from './component/Dash';
import Group from './component/Group';
import Message from './component/Message';
import Onegroup from './component/Onegroup';
import Forgotpassword from './component/Forgotpassword';
import Otp from './component/Otp';
import Resetpassword from './component/Resetpassword';
import Setpassword from './component/Setpassword';
import Notfound from './component/Notfound';
import JoinGroup from './component/JoinGroup';
import Nav from './component/Nav';
import  socketClient from 'socket.io-client'
import { useRef } from 'react';



function App() {
  const endpoint ="https://ajo-backend.onrender.com"
  // const endpoint ="http://localhost:8888"
  const socket = useRef(socketClient(endpoint))
  return (
    <>
       <div>
       <Routes>
          <Route path='/'element={<Home/>}/>
          <Route path='/*'element={<Notfound/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/join/:id' element={<JoinGroup/>}/>
          <Route path='/forgot' element={<Forgotpassword/>}/>
          <Route path='/otp' element={<Otp/>}/>
          <Route path='/reset/:inputsString' element={<Resetpassword/>}/>
          <Route path='/set' element={<Setpassword/>}/>
          <Route path='/nav' element={<Nav/>}/>
          <Route path="/dashboard" element={<Dashboard socket={socket.current}/>}>
            <Route path="" element={<Dash/>}/>
            <Route path="wallet" element={<Wallet/>}/>
            <Route path="/dashboard/group" element={<Group/>}/>
            <Route path='/dashboard/group/thrift' element={<CreateThrift/>}/>
            <Route path='/dashboard/message' element={<Message socket={socket.current}/>}/>
            <Route path='/dashboard/group/onegroup/:id' element={<Onegroup socket={socket.current}/>}/>
          </Route>
       </Routes>
       </div>
    </>
  );
}

export default App;
