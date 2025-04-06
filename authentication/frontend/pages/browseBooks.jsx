import BookDisplay from "../src/components/displayBooks";
import { books } from "../src/constants/content.js";
import '../src/css/browseBooks.css';
import { useState } from "react";

const BrowseBooks = () => {

  const [query, setQuery] = useState('');
  const queryHandler = (e) =>{
    e.preventDefault();
    alert(query);
};

  return (
    <div className="wrapperContainer">
        
        <form onSubmit={queryHandler} className="searchForm">
            <input className = "searchInput"
                type = "text" 
                placeholder="Search for Books" 
                onChange= {(e) => setQuery(e.target.value)}
                value = {query}>
            </input>

            <button className = "searchButton"  type="submit"> Search </button>
        </form>
        
        <div className="bookContainer">{
            books.map((book, index) => (
                
                book[1]["bookName"].toLowerCase().startsWith(query) && (<BookDisplay book = {book} key = {index}  />
                
            )))
           }
        </div>
           
        </div>
  )
}

export default BrowseBooks;