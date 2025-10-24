import React, { useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProducList from './components/TaksList'
import UpdateTaskForm from "./components/UpdateTaks";
import FindTaksForm from './components/TaksById'


// const UpdateTaskForm: React.FC = () => {
// 
function App() {
return (
   <Router>
      <Routes>
        <Route path="/" element={<ProducList />}></Route>
        <Route path="/UpdateTask/:id" element={<UpdateTaskForm/>}></Route>
        <Route path="/FindOne/:id" element={<FindTaksForm/>}></Route>
        
      </Routes>
  </Router>
)
};

export default App;
