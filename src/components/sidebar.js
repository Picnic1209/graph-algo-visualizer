import '../App.css';
import React from 'react';

function Sidebar({ currentState,
    setCurrentState,
    nodeList,
    setNodeList,
    edgeList,
    setEdgeList, 
}) {

    // var edgeText;
    // const edgeTextHandler = (e) =>{
    //     console.log(e.target.value);
    //     setInputText(e.target.value);
    //   };

    const addNodeButtHandler = (e) => {
        e.preventDefault();
        let butt = document.querySelector(".addNodeButt");
        if (currentState === "creatingNode") {
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
        if (currentState === "creatingEdge") {
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
            {/* //
            <form>
                <input value={edgeText} onChange={edgeTextHandler} type="text" className="todo-input" />
                <button onClick={submitTodoHandler} className="todo-button" type="submit">
                    <i className="fas fa-plus-square"></i>
                </button>
                <div className="select">
                    <select name="todos" className="filter-todo">
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="uncompleted">Uncompleted</option>
                    </select>
                </div>
            </form> */}
        </div>
    );
}

export default Sidebar;
