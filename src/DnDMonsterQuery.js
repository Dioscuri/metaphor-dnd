import React, { useState, useRef } from 'react';

const key = process.env.REACT_APP_METAPHOR_KEY
console.log(key)

function DnDMonsterQuery() {
    // STATES
    const [queryOutput, setQueryOutput] = useState([])

    //INPUT REFS
    const dndMonsterQueryInput = useRef()

    //SET STATES
    function querySubmit(){
        // Get the query output links + titles
        const query_input = dndMonsterQueryInput.current.value
        const query = "I need " + query_input + "DnD Monsters"

        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json', 
                'content-type': 'application/json',
                'x-api-key': key
            },
            body: JSON.stringify({query: query, numResults: 10, useAutoprompt: true})
        };

        fetch('https://api.metaphor.systems/search', options)
            .then(response => response.json())
            .then(response => {
                let result = []

                for (let i = 0; i < response.results.length; i++){
                    result.push({title: response.results[i].title != "" ? response.results[i].title : "[No Title]", url: response.results[i].url})
                }
                if (result.length >0){setQueryOutput(result)}
                else{setQueryOutput(["Results not found. Try a different prompt"])}
            })
            .catch(err => console.log(err))

        // Set the state to the array of objects
    }

    function clearOutput(){
        setQueryOutput([])
    }
    
    return (
      <div className="query-section">
            <h3>DnD Monster Search</h3>
            <p> 
                Search for existing DnD monsters based on your given prompt. 
                For best results, use DnD keywords such as "Elemental", "Abberation", etc.
            </p>
            
            <div className="query-input-section">
                <input 
                    id="dnd-monster-query" 
                    ref={dndMonsterQueryInput}
                    placeholder="Query Here" 
                />
                <button onClick={querySubmit}>DnD Monster Search</button>
            </div>
            <button onClick={clearOutput} 
                style={{
                    visibility: (queryOutput.length > 0) ? "visible": "hidden",
                    width: "fit-content",
                    alignSelf: "center",
                    margin: "10px",
                }}>Clear Output</button>

            { 
                (queryOutput.length > 0) && 
                <ul id="dnd-monster-query output">
                    {queryOutput.map(
                        (item) => <li key={item.url}>{item.title}: <a href={item.url}>{item.url}</a></li>
                    )}
                </ul>
            }       
      </div>
    );
  }
  
  export default DnDMonsterQuery;