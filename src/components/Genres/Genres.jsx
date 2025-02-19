/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Genres.css";
import Header from "../Header/Header";
let url = "https://api.jikan.moe/v4/genres/anime";

function Genres() {
    const [Genre, SetGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnime = async () => {
            try {
                const response = await axios.get(url);
                SetGenres(response.data.data);
                console.log(response.data.data);
                console.log("Data Fetched");
                setLoading(false);
            } catch (error) {
                if (error.response?.status === 429) {
                    setError("Rate limit exceeded. Please wait and try again.");
                } else {
                    setError("Error fetching data.");
                }
                setLoading(false);
            }
        };
        setTimeout(fetchAnime, 2000);
    }, []);

    if (loading) return <p>Loading...</p>;

    if (error) return <p>{error}</p>;
    
    return (
        <>
            <Header />
            <ShowGenres Genres = {Genre}/>
        </>
    );
}

function ShowGenres({Genres}){
    const navigate = useNavigate();
    
    return (
    <div className="container">
        <h1 className="title">
            Genres
        </h1>
        <div className="genre-grid">
          {Genres.map((item) => (
            <div 
            key={item.mal_id} 
            className="genre-item" 
            onClick={()=> navigate(`/genres/${item.mal_id}`)} style={{ cursor: "pointer" }}>
              <h2>{item.name}</h2>
              <h3>{item.count}</h3>
            </div>
          ))}
        </div>
    </div>
  )
}


export default Genres