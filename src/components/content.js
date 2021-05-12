import "../App.css";
import React from "react";

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

    function drawEdge(foundNode1, foundNode2) {
        console.log("starting to draw edge");
        setEdgeList([...edgeList, { nodeA: foundNode1, nodeB: foundNode2 }]);
    }

    const clickHandler = (e) => {
        console.log("clicked");
        if (currentState === "creatingNode") {
            console.log("clickedCreatingNode");
            let x = e.clientX;
            let y = e.clientY;
            let div = document.createElement("div");
            div.className = "node";
            div.style.left = x - 10 + "px";
            div.style.top = y - 10 + "px";
            let cont = document.querySelector(".contentRoot");
            cont.appendChild(div);
            setNodeList([...nodeList, { posX: x, posY: y, id: nodeList.length + 1 }]);
        }
        if (currentState === "creatingEdge") {
            console.log("clickedCreatingEdge");
            let x = e.clientX;
            let y = e.clientY;

            let found = 0;
            let foundNode;
            for (const currNode of nodeList) {
                if (isNear(currNode, x, y)) {
                    console.log("found!!!!!!!");
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
            console.log("moving");
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
            <div className="cursor"></div>
        </div>
    );
}

export default Content;
