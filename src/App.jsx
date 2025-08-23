import React from 'react'
import { Routes , Route } from "react-router-dom" 
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'

//////////////////////////
import SideBar from "./componets/SideBar"
import Dashbord from './pages/election/Dashbord'
import Candidates from './pages/election/Candidates'
import Elections from './pages/election/Elections'
import Results from './pages/election/Results'
import Settings from './pages/election/Settings'
import Register from './pages/election/Register'
import TotalVoter from './pages/TotalVoter'
import Voter from './pages/election/Voter'

//////////////////// dash Dorashadda ///////////////

import DashVoter from './pages/pVoter/DashVoter'
import SideVoter from './componets/SideVoter'
import VoterResult from './pages/pVoter/VoteResult'
import Pvote from "./pages/pVoter/Pvote"
import Profile from './pages/pVoter/Profile'
import AdminVoter from './pages/pVoter/AdminVoter'
import Admin from './pages/Admin'
import ProfileAdmin from './pages/ProfileAdmin'
function App() {
  return (
    
   <Routes>

      <Route path="/" element={<Home/>} />
       <Route  path="/about" element={<About/>}/>
       <Route  path="/contact" element={<Contact/>}/>
       <Route  path="/login" element={<Login/>}/>
       <Route  path="/admin" element={<Admin/>}/>
   {/* ///////////////////////// */}
       <Route  path="/sidebar" element={<SideBar/>}/>
    
   {/* ///////////dhabord Admin ////////////// */}
       <Route  path="/dashbord" element={<Dashbord/>}/>
       <Route  path="/candidates" element={<Candidates/>}/>
       <Route  path="/elections" element={<Elections/>}/>
       <Route  path="/Results" element={<Results/>}/>
       <Route  path="/voter" element={<Voter/>}/>
       <Route  path="/settings" element={<Settings/>}/>
       <Route  path="/register" element={<Register/>}/>
       <Route  path="/profile/Admin" element={<ProfileAdmin/>}/>
       <Route  path="/totalVoter" element={<TotalVoter/>}/>


{/* //////////////////// SideVoter////////// */}

       <Route  path="/sideVoter" element={<SideVoter/>}/>
       <Route  path="/dashVoter" element={< DashVoter />}/>
       <Route  path="/voteResult" element={< VoterResult />}/>
       <Route  path="/Pvote" element={< Pvote />}/>
       <Route  path="/profile" element={<Profile />}/>
       <Route  path="/adminVoter" element={<AdminVoter />}/>

   </Routes>
  )
}

export default App
