import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
function AnimeDisplay({anime}){
    const Navigate = useNavigate();
    return(
        <div className="top-anime-container">
            <div className="top-anime-grid-container">
                {anime.map((anime) => (
                    <div key={anime.mal_id} className="top-anime-grid-item">
                        <img
                            src={anime.images.jpg.image_url}
                            alt={anime.title}
                            className="top-anime-cover"
                            onClick={() => Navigate(`/anime/${anime.mal_id}`, { state: { anime : anime } })}
                        />
                        <h3 className="mt-2 font-bold">{anime.title}</h3>
                        <p>Score: {anime.score}</p>
                    </div>
            ))}
            </div>
        </div>
    );
  }

export default AnimeDisplay