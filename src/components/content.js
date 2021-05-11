import '../App.css';
import React from 'react';

function Content({ currentState, setCurrentState, nodeList, setNodeList }) {

    const clickHandler = (e) => {
        console.log("clicked");
        if (currentState === "creatingNode") {
            console.log("clickedCreatingNode");
            let x = e.clientX;
            let y = e.clientY;
            let div = document.createElement('div');
            div.className = 'node';
            div.style.left = x - 10 + "px";
            div.style.top = y - 10 + "px";
            let cont = document.querySelector(".contentRoot");
            cont.appendChild(div);
            setNodeList([...nodeList, { posX: x, posY: y, id: nodeList.length + 1 }]);
        }
    }

    const mouseMoveHandler = (e) => {
        if (currentState === "creatingNode") {
            console.log("moving");
            let cursor = document.querySelector(".cursor");
            let x = e.clientX;
            let y = e.clientY;
            cursor.style.left = x - 10 + "px";
            cursor.style.top = y - 10 + "px";
        }
    }
    return (
        <div className="contentRoot" onClick={clickHandler} onMouseMove={mouseMoveHandler}>
            <div className="cursor"></div>
        </div>
    );
}

export default Content;
