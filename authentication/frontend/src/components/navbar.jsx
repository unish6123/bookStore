
import Home from "../../pages/home.jsx";
import BrowseBooks from "../../pages/browseBooks.jsx"
import { Link } from "react-router-dom";
import "../css/navbar.css"
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext.jsx";
import { useContext } from "react";
import App from "../App.jsx";

const Navbar = () => {
    const {isLoggedin} = useContext(AppContent);

    const navigate = useNavigate();
  return (
    <nav className="container">
        <div className="subContainer">
            <div className="imageContainer"><img src="" alt = "logo"></img></div>
            <div className="navContents">
            <ul className="liContainer">
                <li>
                    <Link to ="/">Home</Link>
                    
                </li>

                {isLoggedin && 
                <li>
                    <Link to ="/browseBooks"> Browse Books</Link>
                    
                </li>
                }
                
                
            </ul>
            <div className="loginButton">
                <button onClick = {()=>navigate('/login')}>SiginIN</button>
            </div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar