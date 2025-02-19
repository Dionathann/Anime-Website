/* eslint-disable no-unused-vars */
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Header from "../Header/Header";

import AnimeDetails from "../AnimeDetails/AnimeDetails";
import "./Seasonal.css";

function Seasonal() {
    const { year, season } = useParams(); // Get year and season from URL
    const navigate = useNavigate();
    const [animeList, setAnimeList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchSeasonalAnime = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://api.jikan.moe/v4/seasons/${year}/${season}`);
                setAnimeList(response.data.data);
                console.log(response.data.data);    
                setLoading(false);
            } catch (error) {
                setError("Error fetching seasonal anime.");
                setLoading(false);
            }
        };

        fetchSeasonalAnime();
    }, [year, season]); // Re-fetch when year or season changes

    const seasons = ["winter", "spring", "summer", "fall"];
    const currentYear = parseInt(year);

    const handleChangeSeason = (newSeason) => {
        navigate(`/seasonal/${year}/${newSeason}`);
    };

    const handleChangeYear = (newYear) => {
        navigate(`/seasonal/${newYear}/${season}`);
    };

    console.log(location.pathname);

    

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;


    return (
        <>
        
        
        <Header />

        <div className="seasonal-container">
            <h2>Seasonal Anime - {season.charAt(0).toUpperCase() + season.slice(1)} {year}</h2>

            <div className="season-tabs">
                <button onClick={() => handleChangeYear(currentYear - 1)}>← {currentYear - 1}</button>
                <span>{currentYear}</span>
                <button onClick={() => handleChangeYear(currentYear + 1)}>{currentYear + 1} →</button>
            </div>

            <div className="seasonal-container">
                {seasons.map((s) => (
                    <button key={s} onClick={() => handleChangeSeason(s)} disabled={s === season}>
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                ))}
            </div>

            
            {animeList.length > 0 ? (
            <div className="anime-grid">
                {[...new Map(animeList.map(anime => [anime.mal_id, anime])).values()]
                    .map((anime) => (
                        <div key={anime.mal_id} className="anime-card" onClick={() => navigate(`/anime/${anime.mal_id}`, { state: { anime } })}>
                            <img src={anime.images.jpg.image_url} alt={anime.title} />
                            <div className="anime-title">{anime.title}</div>
                        </div>
                    ))}
            </div>
        ) : (
            <div className="no-anime-message">
                <p>❌ No anime available for this season or data has not been released yet.</p>
            </div>
        )}
        </div>

        </>
    );
}

export default Seasonal;
