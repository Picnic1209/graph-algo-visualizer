import './App.css';
import React, { useState } from 'react';
import Sidebar from './components/sidebar';
import Content from './components/content';

function App() {
  const [nodeList, setNodeList] = useState([]);
  const [currentState, setCurrentState] = useState("idle"); //States -> idle, creatingNode, creatingEdge
  const [edgeList, setEdgeList] = useState([]);
  return (
    <div className="App">
      <div className="sidebar">
        <Sidebar currentState={currentState} setCurrentState={setCurrentState} />
      </div>
      <div className="content">
        <Content nodeList={nodeList} setNodeList={setNodeList} currentState={currentState} setCurrentState={setCurrentState} edgeList={edgeList} setEdgeList = {setEdgeList}></Content>
      </div>
    </div>
  );
}

export default App;
