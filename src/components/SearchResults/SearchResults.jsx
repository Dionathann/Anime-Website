/* eslint-disable react/prop-types */
import axios from "axios"
import { useEffect, useState } from "react"
import Header from "../Header/Header";
import { useLocation, useNavigate } from "react-router-dom";
import "./SearchResult.css";
//let Url = "https://api.jikan.moe/v4/top/anime";

function SearchResults(){
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("q");

    useEffect(() => {
        //const query = "naruto";
        if(!query) return;

        const fetchAnime = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${query}&limit=10`);
                setSearchResults(response.data.data);
                console.log(response.data.data);
            } catch (error) {
                if (error.response?.status === 429) {
                    setError("Rate limit exceeded. Please wait and try again.");
                } else {
                    setError("Error fetching data.");
                }
            }
            
            setLoading(false);
        };
        setTimeout(fetchAnime, 2000);
    }, [query]);
    
    if (loading) return <p className="text-center text-gray-400">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
    <>
        <div className="search-container">
            <Header />
            <h1 className="search-title">Search Results for {query}</h1>
            <div className="search-list">
                {searchResults.map((anime) => (
                    <AnimeCard key={anime.mal_id} anime={anime} navigate={navigate}/>
                ))}
            </div>
        </div>
    </>
        
    );
}

function AnimeCard({ anime , navigate}) {
    return (
        <div className="anime-card"
                            onClick={() => {
                                navigate(`/anime/${anime.mal_id}`, { state: { anime : anime } });}
                            }>
            <div className="anime-cover">
                <img src={anime.images.jpg.image_url} alt={anime.title} />
            </div>

            <div className="anime-details">
                <h2 className="anime-title">{anime.title}</h2>
                <p className="anime-info">{anime.type} ({anime.episodes || "?"} eps)</p>
                <p className="anime-score">Scored: <strong>{anime.score || "N/A"}</strong></p>
                <p className="anime-members">{anime.members.toLocaleString()} members</p>
                <p className="anime-synopsis">
                    {anime.synopsis ? anime.synopsis.slice(0, 150) + "..." : "No synopsis available."}
                </p>
            </div>
        </div>
    );
}

export default SearchResults