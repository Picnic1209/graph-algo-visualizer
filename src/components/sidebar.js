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
  colorEdgeList,
  setColorEdgeList
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

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function DFS(current, parent) {
    console.log(current);
    for (const currEdge of edgeList) {
      if (currEdge.nodeA.id === current || currEdge.nodeB.id === current) {
        let other = (currEdge.nodeA.id === current) ? currEdge.nodeB.id : currEdge.nodeA.id;
        if (other === parent) continue;
        console.log(colorEdgeList);
        setColorEdgeList([...colorEdgeList, { edge: currEdge, color: "#f55c47" }]);
        await sleep(1000);
        await DFS(other, current);
        await sleep(1000);
        // let newColorEdgeList = colorEdgeList;
        // setColorEdgeList(newColorEdgeList.filter(e => e.edge !== currEdge));
        await sleep(1000);
      }
    }
  }

  const dfsHandler = (e) => {
    e.preventDefault();
    setCurrentState("DFS");
    if (edgeList.length === 0) return;
    DFS(1, 0);
  }


  function numToColor(depth){
    depth = depth%6;
    if(depth===0) return "red";
    if(depth===1) return "blue";
    if(depth===2) return "green";
    if(depth===3) return "brown";
    if(depth===4) return "pink";
    return "yellow";
  }

  async function BFS(current, parent) {
    //console.log(current);

    let queue = [];
    let visited = [];
    let level = [];
    let newColorEdgeList = [];
    for(let i=0;i<=nodeList.length;i++){
      visited[i] = 0;
      level[i] = 0;
    }
    
    //for every unvisited node, do BFS
    for(let i=1;i<=nodeList.length;i++){
      if(visited[i]===0){

        //push current element in nodelist with weigth assigned
        queue.push(i);
        visited[i] = 1;
        
        console.log(queue);

        //iterate over the queue
        while(queue.length!==0){
          let top = queue.shift();

          //find edges connecting to current
          for (const currEdge of edgeList) {
            if (currEdge.nodeA.id === top || currEdge.nodeB.id === top) {
              let other = (currEdge.nodeA.id === top) ? currEdge.nodeB.id : currEdge.nodeA.id;
              if (visited[other]===1) continue;
              newColorEdgeList.push({edge: currEdge, color : numToColor( level[top]) });
              queue.push(other);
              level[other] = level[top]+1;
              visited[other] = 1;
            }
          }
        }
      }
    }

    //check if there are any unvisited nodes

    console.log(newColorEdgeList);
    setColorEdgeList(newColorEdgeList);



  }

  const bfsHandler = (e) => {
    console.log("BFS Started");
    e.preventDefault();
    setColorEdgeList([]);
    setCurrentState("BFS");
    if (edgeList.length === 0) return;
    BFS(1, 0);
  }

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
        <input className="addEdgeTextSpace"
          value={edgeText}
          onChange={edgeTextHandler}
          type="text"
        />
        <button className="addEdgeTextButton" onClick={edgeTextAddHandler}>
          <i>Add Edge</i>
        </button>
      </form>
      <button className="dfsButton" onClick={dfsHandler}>
        Start DFS
      </button>
      <button className="bfsButton" onClick={bfsHandler}>
        Start BFS
      </button>
    </div>
  );
}

export default Sidebar;
