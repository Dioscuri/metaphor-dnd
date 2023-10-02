import React, { useState, useRef } from 'react';

const key = process.env.REACT_APP_METAPHOR_KEY
const summary_key = process.env.REACT_APP_MEANING_CLOUD_KEY

function MythQuery() {
    // STATES
    const [queryOutput, setQueryOutput] = useState([])
    const [queryOutputDict, setQueryOutputDict] = useState({})

    //INPUT REFS
    const QueryInput = useRef()

    //SET STATES
    function querySubmit(){
        // Get the query output links + titles
        const query_input = QueryInput.current.value
        const query = "I need a myths and stories about " + query_input

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
                    result.push({
                        title: response.results[i].title != "" ? response.results[i].title : "[No Title]", 
                        url: response.results[i].url,
                        id: response.results[i].id
                    })
                }
                if (result.length >0){setQueryOutput(result)}
                else{setQueryOutput(["Results not found. Try a different prompt"])}
            })
            
            .catch(err => console.log(err))
    }

    function clearOutput(){
        setQueryOutput([])
        setQueryOutputDict({})
    }

    function summarize(url, id){
        const formdata = new FormData();
        
        formdata.append("key", summary_key);
        formdata.append("url", url);
        formdata.append("sentences", 5);

        const summarizerOptions= {
            method: 'POST', 
            body: formdata,
            redirect: 'follow'
        }

        fetch('https://api.meaningcloud.com/summarization-1.0', summarizerOptions)
            .then (response => response.json())
            .then( summary_response =>{
                let object = {}
                object[id] = summary_response.summary

                setQueryOutputDict(prevDict =>{
                    return {...prevDict, ...object}
                })

            })
    }
    
    return (
      <div className="query-section">
            <h3>Existing Myths & Stories Search</h3>
            <p> 
                Search for existing stories and myths as inspiration for your next DnD adventure. 
                For your prompt, input the type of story or plot you'd like to find for your reference.
            </p>
            
            <div className="query-input-section">
                <input 
                    ref={QueryInput}
                    placeholder="Query Here" 
                />
                <button onClick={querySubmit}>Myths & Stories Search</button>
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
                <ul>
                    {queryOutput.map(
                        (item) => 
                        <li key={item.url}>
                            <div>{item.title}: <a href={item.url}>{item.url}</a></div>
                            <button onClick={() => summarize(item.url, item.id)}> Summarize </button>
                            <div style={{fontStyle:"italic", marginTop:"2%"}}>{queryOutputDict.hasOwnProperty(item.id) ? queryOutputDict[item.id] : ""}</div>
                        </li>
                    )}
                </ul>
            }       
      </div>
    );
  }
  
  export default MythQuery;