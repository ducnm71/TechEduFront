

import Apply from "./Pages/News/apply";
import React from "react";

import Header from "./Components/Header/header";
import Overview from "./Pages/Overview/overview";
import Class from "./Pages/Class/class";
import Timetable from "./Pages/Timetable/timetable";
import News from "./Pages/News/news";

import Attend from "./Pages/Attendance/attend";
import User from "./Pages/User/user";

import { Routes, Route} from "react-router-dom";
import "./App.css";
import Detail from "./Pages/Detail/detail";
import Login from "./Pages/Login/login";

import THeader from "./Teacher/components/Header/header";
import TClass from "./Teacher/pages/Class/class";
import TTimetable from "./Teacher/pages/Timetable/timetable";
import Resources from "./Teacher/pages/Resources/resources";
import TAttend from "./Teacher/pages/Attendance/attend";
import TUser from "./Teacher/pages/User/user";
import TDetail from "./Teacher/pages/Detail/detail";

function App() {
  

  const jwt = localStorage.getItem("jwt")
  const role = localStorage.getItem("role")

  return (
    <div className="App">
    {!jwt?
      <Routes>
        <Route path="/" element={<Login/>}/>
      </Routes>
      :
      
        role==='student'?
      <>
        <Header/>
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/class" element={<Class />} />
            <Route path="/timetable" element={<Timetable />} />
            <Route path="/news" element={<News />} />
            <Route path="/attend" element={<Attend />} />
            <Route path="/user" element={<User />} />
            <Route path="/class/detail/:id" element={<Detail/>}/>
            <Route path="/news/apply" element={<Apply />} />
          </Routes>
      </>
      :
      <>
        <THeader/>
        <Routes>
          <Route path="/" element={<TClass/>}/>
          <Route path="/timetable" element={<TTimetable/>}/>
          <Route path="/resources" element={<Resources/>}/>
          <Route path="/attend" element={<TAttend/>}/>
          <Route path="/user" element={<TUser/>}/>
          <Route path="/detail/:id" element={<TDetail/>}/>
        </Routes>
      </>
    }
      
    
          
    </div>
  );
}

export default App;


