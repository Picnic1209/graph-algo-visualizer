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

    function isNear(currNode, x, y) {
        let distance = (x - currNode.posX) * (x - currNode.posX) + (y - currNode.posY) * (y - currNode.posY);
        if (distance <= 110) return 1;
        return 0;
    }

    function drawEdge(Node1, Node2) {
        setEdgeList([...edgeList, { nodeA: Node1, nodeB: Node2 }]);
        console.log("Edge drawn");
    }

    const clickHandler = (e) => {
        console.log("clicked");
        if (currentState === "creatingNode") {
            let x = e.clientX;
            let y = e.clientY;
            setNodeList([...nodeList, { posX: x, posY: y, id: nodeList.length + 1 }]);
        }
        if (currentState === "creatingEdge") {
            console.log("here");
            let x = e.clientX;
            let y = e.clientY;

            let found = 0;
            let foundNode;
            for (const currNode of nodeList) {
                if (isNear(currNode, x, y)) {
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
            cursor.style.left = x - 10 + "px";
            cursor.style.top = y - 10 + "px";
        }
    };

    return (
        <div
            className="contentRoot"
            onClick={clickHandler}
            onMouseMove={mouseMoveHandler}
        >
            {nodeList.map((node)=>
            <div key={node.id} className="node" style={{top:node.posY-10, left:node.posX-10}}></div>
            )}
            {edgeList.map((edge)=>
            <Line zIndex={-5} borderColor="black" borderWidth={2} x0={edge.nodeA.posX} y0={edge.nodeA.posY} x1={edge.nodeB.posX} y1={edge.nodeB.posY} />
            )}
            <div className="cursor"></div>
        </div>
    );
}

export default Content;
