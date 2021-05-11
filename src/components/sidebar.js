import '../App.css';
import React from 'react';

function Sidebar({ currentState, setCurrentState }) {

    const addNodeButtHandler = (e) => {
        e.preventDefault();
        let butt = document.querySelector(".addNodeButt");
        if(currentState==="creatingNode") {
            setCurrentState("idle");
            butt.innerHTML = "Add Node";
            let cursor = document.querySelector(".cursor");
            cursor.style.display = "none";
        }
        else {
            setCurrentState("creatingNode");
            butt.innerHTML = "Stop Adding Node";
            let cursor = document.querySelector(".cursor");
            cursor.style.display = "block";
        }
    };

    const addEdgeButtHandler = (e) => {
        e.preventDefault();
        let butt = document.querySelector(".addEdgeButt");
        if(currentState==="creatingEdge") {
            setCurrentState("idle");
            butt.innerHTML = "Add Edge";
        }
        else {
            setCurrentState("creatingEdge");
            butt.innerHTML = "Stop Adding Edge";
        }
    };
    return (
        <div className="sidebarRoot">
            <button className="addNodeButt" onClick={addNodeButtHandler}> Add Node </button>
            <button className="addEdgeButt" onClick={addEdgeButtHandler}> Add Edge </button>
        </div>
    );
}

export default Sidebar;
