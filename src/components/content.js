import "../App.css";
import React from "react";
import { Line } from "react-lineto";

function Content({
  currentState,
  setCurrentState,
  nodeList,
  setNodeList,
  edgeList,
  setEdgeList,
  colorEdgeList,
  setColorEdgeList,
  nodeDistanceList,
  setNodeDistanceList,
}) {
  //Global variables
  let foundNode1 = -1;

  //IsNear() function. Returns true is both points are closer than the distance
  function isNear(currNode, x, y, nearDistance) {
    let distance =
      (x - currNode.posX) * (x - currNode.posX) +
      (y - currNode.posY) * (y - currNode.posY);
    if (distance <= nearDistance * nearDistance) return 1;
    return 0;
  }

  //Adds edge to edgeList
  function addEdge(Node1, Node2) {
    //make sure the first node in list is of smaller value
    if (Node1.id > Node2.id) {
      let temp = Node1;
      Node1 = Node2;
      Node2 = temp;
    }

    //check if already present
    let edgeAlreadyPresent = 0;
    for (const currEdge of edgeList) {
      if (currEdge.nodeA.id === Node1.id && currEdge.nodeB.id === Node2.id) {
        window.alert("Edge Already Present. Are you blind bruh??");
        edgeAlreadyPresent = 1;
        break;
      }
    }

    //If edge already present then return
    if (edgeAlreadyPresent === 1) {
      return;
    }

    //if edge present then add it to the list
    setEdgeList([
      ...edgeList,
      { nodeA: Node1, nodeB: Node2, id: edgeList.length + 1, weight: 1 },
    ]);
    return;
  }

  const clickHandler = (e) => {
    //Creating Node Mode
    if (currentState === "creatingNode") {
      let x = e.clientX;
      let y = e.clientY;

      //check if it is too near to any existing node
      let nodeTooNear = 0;
      for (const currNode of nodeList) {
        if (isNear(currNode, x, y, 70)) {
          nodeTooNear = 1;
          window.alert("Nodes Too Close. Maintain Social Distancing!");
          break;
        }
      }
      if (nodeTooNear === 1) return;
      setNodeList([...nodeList, { posX: x, posY: y, id: nodeList.length + 1 }]);
    }

    //Creating Edge Mode
    if (currentState === "creatingEdge") {
      let x = e.clientX;
      let y = e.clientY;

      let found = 0;
      let foundNode;
      for (const currNode of nodeList) {
        if (isNear(currNode, x, y, 20)) {
          found = 1;
          foundNode = currNode;
          break;
        }
      }
      if (found === 1) {
        if (foundNode1 === -1) {
          foundNode1 = foundNode;
        } else if (foundNode !== foundNode1) {
          addEdge(foundNode1, foundNode);
          foundNode1 = -1;
        }
      }
    }
  };

  // Mouse cursor Trail
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
    //Main Body
    <div
      className="contentRoot"
      onClick={clickHandler}
      onMouseMove={mouseMoveHandler}
    >
      {nodeList.map((node) => (
        <div
          key={node.id}
          className="node"
          style={{ top: node.posY - 15, left: node.posX - 15 }}
        >
          {node.id}
        </div>
      ))}

      {nodeDistanceList.map((node) => {
        let xpos = node.node.posX + 20;
        let ypos = node.node.posY - 20;
        return (
            <div
            key={node.id}
            className="nodeDistance"
            style={{ top: ypos, left: xpos }}
          >
            Distance: {node.distance}
          </div>
        );
      })}

      {edgeList.map((edge) => (
        <Line
          key={edge.id}
          zIndex={-5}
          borderColor="black"
          borderWidth={3}
          x0={edge.nodeA.posX}
          y0={edge.nodeA.posY}
          x1={edge.nodeB.posX}
          y1={edge.nodeB.posY}
        />
      ))}

      {edgeList.map((edge) => {
        let xpos = (edge.nodeA.posX + edge.nodeB.posX) / 2;
        let ypos = (edge.nodeA.posY + edge.nodeB.posY) / 2;
        let offsetX = 0,
          offsetY = 0;
        if (Math.abs(edge.nodeA.posX - edge.nodeB.posX) < 30) {
          offsetX = 10;
        } else if (Math.abs(edge.nodeA.posY - edge.nodeB.posY) < 30) {
          offsetY = -30;
        } else {
          let slope =
            (edge.nodeA.posY - edge.nodeB.posY) /
            (edge.nodeA.posX - edge.nodeB.posX);
          if (slope < 0) {
            offsetY = -25;
            offsetX = -15;
          } else {
            offsetY = -25;
          }
        }

        return (
          <div
            key={edge.id}
            className="edgeWeight"
            style={{ top: ypos + offsetY, left: xpos + offsetX }}
          >
            {" "}
            {edge.weight}
          </div>
        );
      })}
      {colorEdgeList.map((edge) => (
        <Line
          key={edge.edge.id}
          zIndex={-4}
          borderColor={edge.color}
          borderWidth={5}
          x0={edge.edge.nodeA.posX}
          y0={edge.edge.nodeA.posY}
          x1={edge.edge.nodeB.posX}
          y1={edge.edge.nodeB.posY}
        />
      ))}
      <div className="cursor"></div>
    </div>
  );
}

export default Content;
