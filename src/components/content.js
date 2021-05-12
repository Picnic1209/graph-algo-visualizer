import "../App.css";
import React from "react";
import { Line } from 'react-lineto';


function Content({
    currentState,
    setCurrentState,
    nodeList,
    setNodeList,
    edgeList,
    setEdgeList,
}) {
    let foundNode1 = -1;
    let currEdgeCount = 0;


    function isNear(currNode, x, y, radius) {
        let distance = (x - currNode.posX) * (x - currNode.posX) + (y - currNode.posY) * (y - currNode.posY);
        if (distance <= radius) return 1;
        return 0;
    }

    function drawEdge(Node1, Node2) {
        //make sure the first node in list is of smaller value
        if(Node1.id >Node2.id){
            let temp = Node1;
            Node1 = Node2;
            Node2 = temp;
        }

        //check if already present
        let alreadyPresent = 0;
        for (const currEdge of edgeList){
            if(currEdge.nodeA.id===Node1.id && currEdge.nodeB.id===Node2.id ){
                alreadyPresent = 1;
                break;
            }
        }

        if(alreadyPresent===1){
            return;
        }

        currEdgeCount = currEdgeCount+1;

        setEdgeList([...edgeList, { nodeA: Node1, nodeB: Node2, id: edgeList.length + 1}]);
        console.log("Edge drawn");
        return;
    }

    const clickHandler = (e) => {
        console.log("clicked");
        if (currentState === "creatingNode") {
            let x = e.clientX;
            let y = e.clientY;

            //check if it is too near to any existing node
            let nodeTooNear = 0;
            for (const currNode of nodeList) {
                if (isNear(currNode, x, y, 2000)) {
                    nodeTooNear = 1;
                    window.alert("Nodes Too Close. Maintain Social Distancing!");
                    break;
                }
            }
            if(nodeTooNear===1) return;
            setNodeList([...nodeList, { posX: x, posY: y, id: nodeList.length + 1 }]);
        }
        if (currentState === "creatingEdge") {
            console.log("here");
            let x = e.clientX;
            let y = e.clientY;

            let found = 0;
            let foundNode;
            for (const currNode of nodeList) {
                if (isNear(currNode, x, y,250)) {
                    console.log(currNode.id);
                    found = 1;
                    foundNode = currNode;
                    break;
                }
            }
            if (found === 1) {
                if (foundNode1 === -1) {
                    foundNode1 = foundNode;
                } else if (foundNode !== foundNode1) {
                    drawEdge(foundNode1, foundNode);
                    foundNode1 = -1;
                }
            }
        }
    };

    const mouseMoveHandler = (e) => {
        if (currentState === "creatingNode") {
            let cursor = document.querySelector(".cursor");
            let x = e.clientX;
            let y = e.clientY;
            cursor.style.left = x - 15 + "px";
            cursor.style.top = y - 15 + "px";
        }
    };

    return (
        <div
            className="contentRoot"
            onClick={clickHandler}
            onMouseMove={mouseMoveHandler}
        >
            {nodeList.map((node)=>
            <div key={node.id} className="node" style={{top:node.posY-15, left:node.posX-15}}>{node.id}</div>
            )}
            {edgeList.map((edge)=>
            <Line key={edge.id} zIndex={-5} borderColor="black" borderWidth={3} x0={edge.nodeA.posX} y0={edge.nodeA.posY} x1={edge.nodeB.posX} y1={edge.nodeB.posY} />
            )}
            <div className="cursor"></div>
        </div>
    );
}

export default Content;
