import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./AnimeDetails.css"; // Custom styling

function AnimeDetails() {
    const location = useLocation();
    const anime = location.state?.anime || JSON.parse(localStorage.getItem("anime"));

    useEffect(() => {
        if (anime) {
            localStorage.setItem("anime", JSON.stringify(anime));
        }
    }, [anime]);

    if (!anime) {
        return <p className="error-message">❌ No anime details available.</p>;
    }

    return (
        <div className="anime-details">
            <h1>{anime.title}</h1>

            <div className="anime-header">
                <img className="anime-cover" src={anime.images.jpg.image_url} alt={anime.title} />
                <div className="anime-info">
                    <p><strong>Score:</strong> ⭐ {anime.score} / 10</p>
                    <p><strong>Rank:</strong> #{anime.rank}</p>
                    <p><strong>Popularity:</strong> #{anime.popularity}</p>
                    <p><strong>Members:</strong> {anime.members}</p>
                    <p><strong>Episodes:</strong> {anime.episodes || "Unknown"}</p>
                    <p><strong>Duration:</strong> {anime.duration}</p>
                    <p><strong>Aired:</strong> {anime.aired.string}</p>
                    <p><strong>Genres:</strong> {anime.genres.map((genre) => genre.name).join(", ")}</p>
                </div>
            </div>

            <div className="synopsis">
                <h2>Synopsis</h2>
                <p>{anime.synopsis}</p>
            </div>
        </div>
    );
}

export default AnimeDetails;
