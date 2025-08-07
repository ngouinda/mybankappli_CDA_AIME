import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import UserDashboard from './components/UserDashboard/UserDashboard';

import Categories from './components/Categorie/Categorie'
import RegisterForm from './components/Register/Register'
import Depenses from './components/Depenses/Depenses'
import Home from './components/Home/Home'
import Header from './components/Header/Header'
import LoginForm from './components/LoginForm/LoginForm'




function App() {
 

  return (
    <>
       <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/dashboard" element={<UserDashboard/>} />
            <Route path="/login" element={<LoginForm/>} />
            <Route path="/register" element={<RegisterForm/>} />
            <Route path="/depenses" element={<Depenses/>} />
            <Route path="/categories" element={<Categories/>} />
          </Routes>
       </BrowserRouter>
    </>
  )
}

export default App
