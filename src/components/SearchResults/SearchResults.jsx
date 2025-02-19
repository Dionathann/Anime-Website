/* eslint-disable react/prop-types */
import axios from "axios"
import { useEffect, useState } from "react"

let Url = "https://api.jikan.moe/v4/top/anime";

function SearchResults(){
   const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        axios.get(Url)
            .then((response) => {
                setSearchResults(response.data.data);
                console.log(searchResults);
            })
            .catch((error) => {
                console.error("Error fetching data", error);
            });
        });
    

    return (
    <>
        <Display searchResults= {searchResults}  />

        <Image />
    
    </>
        
    );
}

function Display({searchResults}){
    return (  
    <>
        {searchResults.map((vanessa) => (
            <div key= {vanessa.mal_id}>
                <h1>{vanessa.title}</h1>
                <img src={vanessa.images.jpg.image_url} alt={vanessa.title} />
            </div>
        ))}
    </>

    );
}

function Image(){
    return (
        <button> Button </button>
    );
}

export default SearchResults