import "./Search.css";
import addProductIcon from "../assets/add-product-button.svg";
import SearchBar from "../components/SearchBar";

export default function Search(){
    return (
        <section className="hero">
            <div className="search-bar-container">
                <SearchBar/>
            </div>
        </section>
    );

}