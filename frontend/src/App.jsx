// Link to the documentation where steps are described to solve this assignment - 
// Link - https://projects.100xdevs.com/tracks/oAjvkeRNZThPMxZf4aX5/JLaLbhDuYn3h5Cn7WJu1
import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from './pages/SignIn';
import SignUp from './pages/Signup';
import Dashboard from './pages/Dashboard';
import SendMoney from './pages/SendMoney';

function App() {

  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/sendmoney' element={<SendMoney />} />
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
