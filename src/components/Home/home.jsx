/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Header/Header";
import "./home.css";


let url = "https://api.jikan.moe/v4/seasons/now";

function Home(){
    
    const navigate = useNavigate();
    const [Anime, setAnime] = useState([]);
    useEffect(() => {
        axios.get(url)
        .then((response) => {
        setAnime(response.data.data);
        console.log("Data Fetched");
        })
        .catch((error) => {
        console.error("Error Fetching Data", error);
        });   
        }, []);

    return(
        <div className="page">
            <Header />

            <h1>Currently Airing</h1>

            <AnimeDisplay anime={Anime} navigate={navigate}/>
        </div>
    );
    
}

function AnimeDisplay({anime, navigate}){
    return(
        <div className="home-anime-container" >
            <div className="home-grid-container">
                {anime.map((anime) => (
                    <div key={anime.mal_id} className="home-grid-item">
                        <img
                            src={anime.images.jpg.image_url}
                            alt={anime.title}
                            onClick={() => {
                                navigate(`/anime/${anime.mal_id}`, { state: { anime : anime } });}
                            }
                            className="home-anime-cover"
                        />
                        <h3 className="mt-2 font-bold">{anime.title}</h3>
                        <p>Score: {anime.score}</p> 
                    </div>
                ))}
            </div>
        </div>
    );
  }

export default Home;