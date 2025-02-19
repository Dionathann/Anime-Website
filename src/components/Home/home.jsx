/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Header/Header";
import "./Home.css";


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
        <div>
            <Header />

            <h1>Currently Airing</h1>

            <AnimeDisplay anime={Anime} navigate={navigate}/>
        </div>
    );
    
}

function AnimeDisplay({anime, navigate}){
    console.log(anime.mal_id);

    return(
        <div >
            <div className="grid-container">
                {anime.map((anime) => (
                    <div key={anime.mal_id} className="p-4 bg-white shadow rounded">
                        <img
                            src={anime.images.jpg.image_url}
                            alt={anime.title}
                            onClick={() => {
                                navigate(`/anime/${anime.mal_id}`, { state: { anime : anime } });}
                            }
                            className="w-full h-48 object-cover rounded"
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