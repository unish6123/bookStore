import { Link } from "react-router-dom";
import '../css/displayBooks.css';



function BookDisplay ({book}){
    

    
    return (
        <div className="gallery">
            
            <div className = "galleryPannelWrapper">
            <Link className ="galleryPanel" to = {`/bookContent/${book[0]}`}>
                <img src= {book[1]["imageUrl"]} className = "liked" alt = "error loading the image." />
            </Link>
            <p>{book[1]["bookName"]} </p>

            </div>

            {/* {console.log(`the url that we got is  : ${book[1]} `)} */}
        </div>
    )
}

export default BookDisplay