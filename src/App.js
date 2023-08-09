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



function App() {
  return (
    <>
       <div>
       <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path="/dashboard" element={<Dashboard/>}>
            <Route path="" element={<Dash/>}/>
            <Route path="wallet" element={<Wallet/>}/>
            <Route path="/dashboard/group/" element={<Group/>}/>
            <Route path='/dashboard/group/thrift' element={<CreateThrift/>}/>
          </Route>
       </Routes>
       </div>
    </>
  );
}

export default App;
