import "../App.css";
import React from "react";
import Button from 'react-bootstrap/Button';

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
  setColorEdgeList,
  nodeDistanceList,
  setNodeDistanceList
}) {
  const edgeTextHandler = (e) => {
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
    let butt = document.querySelector("#addNodeButt");
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
    let butt = document.querySelector("#addEdgeButt");
    if (currentState === "creatingEdge") {
      setCurrentState("idle");
      butt.innerHTML = "Add Edge";
    } else {
      setCurrentState("creatingEdge");
      butt.innerHTML = "Stop Adding Edge";
    }
  };

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function DFS(current, parent) {
    console.log(current);
    for (const currEdge of edgeList) {
      if (currEdge.nodeA.id === current || currEdge.nodeB.id === current) {
        let other =
          currEdge.nodeA.id === current ? currEdge.nodeB.id : currEdge.nodeA.id;
        if (other === parent) continue;
        setColorEdgeList([
          ...colorEdgeList,
          { edge: currEdge, color: "#f55c47" },
        ]);
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
  };

  function numToColor(depth) {
    depth = depth % 6;
    if (depth === 0) return "red";
    if (depth === 1) return "blue";
    if (depth === 2) return "green";
    if (depth === 3) return "brown";
    if (depth === 4) return "pink";
    return "yellow";
  }

  async function BFS(current, parent) {
    //console.log(current);

    let queue = [];
    let visited = [];
    let level = [];
    let newColorEdgeList = [];
    for (let i = 0; i <= nodeList.length; i++) {
      visited[i] = 0;
      level[i] = 0;
    }

    //for every unvisited node, do BFS
    for (let i = 1; i <= nodeList.length; i++) {
      if (visited[i] === 0) {
        //push current element in nodelist with weigth assigned
        queue.push(i);
        visited[i] = 1;

        //iterate over the queue
        while (queue.length !== 0) {
          let top = queue.shift();

          //find edges connecting to current
          for (const currEdge of edgeList) {
            if (currEdge.nodeA.id === top || currEdge.nodeB.id === top) {
              let other =
                currEdge.nodeA.id === top
                  ? currEdge.nodeB.id
                  : currEdge.nodeA.id;
              if (visited[other] === 1) continue;
              newColorEdgeList.push({
                edge: currEdge,
                color: numToColor(level[top]),
              });
              queue.push(other);
              level[other] = level[top] + 1;
              visited[other] = 1;
            }
          }
        }
      }
    }

    //check if there are any unvisited nodes

    setColorEdgeList(newColorEdgeList);
    newColorEdgeList = [];
  }

  const bfsHandler = (e) => {
    //console.log("BFS Started");
    e.preventDefault();
    setColorEdgeList([]);
    setCurrentState("BFS");
    if (edgeList.length === 0) return;
    BFS(1, 0);
  };

  const resetHandler = (e) => {
    e.preventDefault();
    setColorEdgeList([]);
    setCurrentState("idle");
    setNodeList([]);
    setEdgeList([]);
    setNodeDistanceList([]);
    setEdgeText("");
  };

  //MST
  async function MST() {
    //console.log(current);

    let newColorEdgeList = [];

    //DSU
    let nodeListSize = nodeList.length;
    let parent = [],
      rank = [];
    for (let i = 1; i <= nodeListSize; i++) {
      parent[i] = i;
      rank[i] = 1;
    }

    function findParent(thisNode) {
      if (parent[thisNode] === thisNode) return thisNode;
      return (parent[thisNode] = findParent(parent[thisNode]));
    }

    function union(n1, n2) {
      let parentn1 = findParent(n1);
      let parentn2 = findParent(n2);
      if (parentn1 === parentn2) return;

      if (rank[parentn1] > rank[parentn2]) {
        parent[n2] = n1;
        rank[n1] += rank[n2];
      } else {
        parent[n1] = n2;
        rank[n2] += rank[n1];
      }
      return;
    }

    //sort in decreasing order
    edgeList.sort(function (x, y) {
      if (x.weight < y.weight) {
        return -1;
      }
      if (x.weight > y.weight) {
        return 1;
      }
      return 0;
    });

    // edgeList
    edgeList.forEach((currEdge) => {
      //console.log(element);
      if (findParent(currEdge.nodeA.id) !== findParent(currEdge.nodeB.id)) {
        newColorEdgeList.push({ edge: currEdge, color: numToColor(3) });
        union(currEdge.nodeA.id, currEdge.nodeB.id);
      }
    });

    //check if there are any unvisited nodes

    console.log(newColorEdgeList);
    setColorEdgeList(newColorEdgeList);
    newColorEdgeList = [];
  }

  function SSSP() {
    console.log("idharrr");
    const INT_MAX = 1000;

    let newColorEdgeList = [];

    let nodeListSize = nodeList.length;

    let distance = [];
    let disNode = [];

    for (let i = 1; i <= nodeListSize; i++) {
      distance[i] = [INT_MAX, 0];
      disNode.push(i);
    }

    distance[1] = [0, 0];

    let cnt = 0;
    while (cnt++ < nodeListSize) {
      let currNode = 0,
        currDistant = INT_MAX;
      disNode.forEach((thisnode) => {
        if (distance[thisnode][0] <= currDistant) {
          currNode = thisnode;
          currDistant = distance[thisnode][0];
        }
      });

      disNode = disNode.filter((value) => {
        return value !== currNode;
      });

      for (const currEdge of edgeList) {
        if (currEdge.nodeA.id === currNode || currEdge.nodeB.id === currNode) {
          let other =
            currEdge.nodeA.id === currNode
              ? currEdge.nodeB.id
              : currEdge.nodeA.id;
          if (
            distance[other][0] >
            parseInt(distance[currNode][0] + parseInt(currEdge.weight))
          ) {
            distance[other][0] = parseInt(
              distance[currNode][0] + parseInt(currEdge.weight)
            );
            distance[other][1] = currEdge;
          }
        }
      }
    }

    for (let i = 1; i <= nodeListSize; i++) {
      if (distance[i][1] !== 0) {
        newColorEdgeList.push({ edge: distance[i][1], color: numToColor(3) });
      }
    }

    let newNodeDistanceList = [];

    nodeList.forEach(thisnode => {
        newNodeDistanceList.push({node: thisnode, distance: distance[thisnode.id][0]});
    });


    //check if there are any unvisited nodes

    console.log(newColorEdgeList);
    setColorEdgeList(newColorEdgeList);
    setNodeDistanceList(newNodeDistanceList);
    console.log(newNodeDistanceList);
    newNodeDistanceList = [];
    newColorEdgeList = [];
  }

  const MSTHandler = (e) => {
    e.preventDefault();
    setColorEdgeList([]);
    setCurrentState("MST");
    if (edgeList.length === 0) return;
    MST();
  };

  const SSSPHandler = (e) => {
    console.log("Shortest Path Started");
    e.preventDefault();
    setColorEdgeList([]);
    setCurrentState("SSSP");
    if (edgeList.length === 0) return;
    SSSP();
  };

  return (
    <div className="sidebarRoot">
      <button type="button" class="btn btn-light btn-sm" id="addNodeButt" onClick={addNodeButtHandler}>
        {" "}
        Add Node{" "}
      </button>
      <button type="button" class="btn btn-light btn-sm" id="addEdgeButt" onClick={addEdgeButtHandler}>
        {" "}
        Add Edge{" "}
      </button>

      <div className="sideBarText font-weight-light"> OR </div>
      <div className="sideBarText font-weight-light"> Add Edge by text </div>

      <form className="edgeWeightForm">
        <input
          className="form-control addEdgeTextSpace"
          value={edgeText}
          onChange={edgeTextHandler}
          type="text"
        />
        <button class="btn btn-light btn-sm buttons" onClick={edgeTextAddHandler}>
          <i>Add Edge</i>
        </button>
      </form>
      <button type="button" class="btn btn-light btn-sm buttons" onClick={dfsHandler}>
        Start DFS
      </button>
      <button type="button" class="btn btn-light btn-sm buttons" onClick={bfsHandler}>
        Start BFS
      </button>
      <button type="button" class="btn btn-light btn-sm buttons" onClick={MSTHandler}>
        Get MST
      </button>
      <button type="button" class="btn btn-light btn-sm buttons" onClick={SSSPHandler}>
        Get Shortest Path
      </button>
      <button type="button" class="btn btn-light btn-smbuttons" onClick={resetHandler}>
        Reset
      </button>
    </div>
  );
}

export default Sidebar;
