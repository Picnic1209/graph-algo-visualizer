import "../App.css";
import React from "react";

function Sidebar({
  currentState,
  setCurrentState,
  nodeList,
  setNodeList,
  edgeList,
  setEdgeList,
  edgeText,
  setEdgeText,
}) {
  const edgeTextHandler = (e) => {
    console.log(e.target.value);
    setEdgeText(e.target.value);
  };

  const edgeTextAddHandler = (e) => {
    e.preventDefault();
    let str = edgeText;

    //if string not valid then return
    if (/^(?=.*\d)[\d ]+$/.test(str) === false) {
      window.alert("Invalid Input ");
      setEdgeText("");
      return;
    }

    let words = str.split(" ").filter((w) => w !== "");

    //if too less words then invalid
    if (words.length < 2) {
      window.alert("Invalid Input ");
      setEdgeText("");
      return;
    }
    let n1 = parseInt(words[0]);
    let n2 = parseInt(words[1]);

    //check if both edge same then return
    if (n1 === n2) {
      window.alert("Invalid Input ");
      setEdgeText("");
      return;
    }

    //swap if out of order
    if (n1 > n2) {
      let temp = n1;
      n1 = n2;
      n2 = temp;
    }

    //find if valid nodes or not
    if (n1 <= 0 || n1 > nodeList.length || n2 <= 0 || n2 > nodeList.length) {
      window.alert("Invalid Input ");
      setEdgeText("");
      return;
    }

    let newEdgeWeight = 1;
    if (words.length > 2) {
      newEdgeWeight = parseInt(words[2]);
    }

    //see if it already exists
    for (const currEdge of edgeList) {
      if (currEdge.nodeA.id === n1 && currEdge.nodeB.id === n2) {
        currEdge.weight = newEdgeWeight;
        setEdgeText("");
        return;
      }
    }

    //else find the node in nodelist
    let node1, node2;
    for (const currNode of nodeList) {
      if (currNode.id === n1) {
        node1 = currNode;
      }
      if (currNode.id === n2) {
        node2 = currNode;
      }
    }

    //add extra entry in edge list
    setEdgeList([
      ...edgeList,
      {
        nodeA: node1,
        nodeB: node2,
        id: edgeList.length + 1,
        weight: newEdgeWeight,
      },
    ]);
    setEdgeText("");
  };

  const addNodeButtHandler = (e) => {
    e.preventDefault();
    let butt = document.querySelector(".addNodeButt");
    if (currentState === "creatingNode") {
      setCurrentState("idle");
      butt.innerHTML = "Add Node";
      let cursor = document.querySelector(".cursor");
      cursor.style.display = "none";
    } else {
      setCurrentState("creatingNode");
      butt.innerHTML = "Stop Adding Node";
      let cursor = document.querySelector(".cursor");
      cursor.style.display = "block";
    }
  };

  const addEdgeButtHandler = (e) => {
    e.preventDefault();
    let butt = document.querySelector(".addEdgeButt");
    if (currentState === "creatingEdge") {
      setCurrentState("idle");
      butt.innerHTML = "Add Edge";
    } else {
      setCurrentState("creatingEdge");
      butt.innerHTML = "Stop Adding Edge";
    }
  };
  return (
    <div className="sidebarRoot">
      <button className="addNodeButt" onClick={addNodeButtHandler}>
        {" "}
        Add Node{" "}
      </button>
      <button className="addEdgeButt" onClick={addEdgeButtHandler}>
        {" "}
        Add Edge{" "}
      </button>

      <div className="sideBarText"> OR </div>
      <div className="sideBarText"> Add Edge by text </div>

      <form className="edgeWeightForm">
        <input className = "addEdgeTextSpace"
          value={edgeText}
          onChange={edgeTextHandler}
          type="text"
        />
        <button className="addEdgeTextButton" onClick={edgeTextAddHandler}>
          <i>Add Edge</i>
        </button>
      </form>
    </div>
  );
}

export default Sidebar;
