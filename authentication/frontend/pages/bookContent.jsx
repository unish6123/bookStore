import { useParams } from "react-router-dom";
import { books } from "../src/constants/content.js";
import { useNavigate } from "react-router-dom";
import "../src/css/bookContent.css"
import { faHandPointLeft } from "@fortawesome/free-regular-svg-icons";


const BookContent =() =>{





    const { bookId } = useParams();
    console.log(bookId);

    const navigate = useNavigate();
    const handleGeminiResponse =()=>{
        console.log("You clicked the plus icon.")
    }
    

    return (
        <div>
            
            <ul> 
                {books.map((content, index) => (
                    content[0] == bookId && 
                    <div>
                        <li key={index} className="content">     
                            {/* {console.log(content)} */}
                            {content[1]["bookDetails"].map((chapterInfo, index) =>(
                                
                                    <div  
                                        key={index} 
                                       
                                        className="chapterNameContainer"
                                        >
                                            <p className="chapterName">{chapterInfo[1]} <span onClick = {handleGeminiResponse} className="plusIcon">+</span></p>
                                                
                                    </div>

                                
                            ))}
                            
                        </li>
                        </div>
                ))}
            </ul>
        </div>
    );
} 

export default BookContent;
