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
    return (
        <div className="sidebarRoot">
            <button className="addNodeButt" onClick={addNodeButtHandler}> Add Node </button>
        </div>
    );
}

export default Sidebar;
