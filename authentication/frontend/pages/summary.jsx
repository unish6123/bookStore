import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";

function Summary({}){
    // const [backendData , setBackendData] = useState(null);
    const[genAIoutput, setGenAIoutput] = useState("");


    const {contentId} = useParams();


    console.log(` The contentId we got from Book Content page : ${contentId}`);

    // useEffect(()=>{

    //     fetch('http://localhost:8000/api/data') //fetch from backend.
    //         .then((response) => response.json())
    //         .then((data) => setBackendData(data));
            
    // },[]);

    useEffect(() => {
        fetch('http://localhost:8000/api/frontendToBackend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Telling the server it's JSON
            },
            body: JSON.stringify({ contentId: contentId }), // Sending the data in the body
        })
            .then(response => response.json())
            .then(data => {
                console.log(`The data that we got is `,data);
                if (data['genAiOutput'] !== "") {
                    setGenAIoutput(data['genAiOutput']);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);
    
    return (
        
            <div>
                {contentId}
                {/* {console.log(backendData.message)} */}

                {genAIoutput ? <h1> {genAIoutput}</h1> : <h1> Loading...</h1> }
                {/* {backendData ? <h1> {backendData.message}</h1> : <h1> Loading...</h1> } */}
            </div>
        
    )
}
export default Summary