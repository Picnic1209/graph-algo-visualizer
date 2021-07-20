import './App.css';
import React, { useState } from 'react';
import Sidebar from './components/sidebar';
import Content from './components/content';

function App() {
  const [nodeList, setNodeList] = useState([]);
  const [currentState, setCurrentState] = useState("idle"); //States -> idle, creatingNode, creatingEdge
  const [edgeList, setEdgeList] = useState([]);
  const [edgeText, setEdgeText] = useState("");
  const [colorEdgeList, setColorEdgeList] = useState([]);
  const [nodeDistanceList, setNodeDistanceList] = useState([]);
  return (
    <div className="App">
      <div className="sidebar">
        <Sidebar nodeDistanceList={nodeDistanceList} setNodeDistanceList={setNodeDistanceList} colorEdgeList={colorEdgeList} setColorEdgeList={setColorEdgeList} edgeText={edgeText} setEdgeText={setEdgeText} nodeList={nodeList} setNodeList={setNodeList} currentState={currentState} setCurrentState={setCurrentState} edgeList={edgeList} setEdgeList={setEdgeList} />
      </div>
      <div className="content">
        <Content nodeDistanceList={nodeDistanceList} setNodeDistanceList={setNodeDistanceList} colorEdgeList={colorEdgeList} setColorEdgeList={setColorEdgeList} nodeList={nodeList} setNodeList={setNodeList} currentState={currentState} setCurrentState={setCurrentState} edgeList={edgeList} setEdgeList={setEdgeList}></Content>
      </div>
    </div>
  );
}

export default App;
