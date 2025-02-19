import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
function AnimeDisplay({anime}){
    const Navigate = useNavigate();
    return(
        <div >
            <div className="grid-container">
                {anime.map((anime) => (
                    <div key={anime.mal_id} className="p-4 bg-white shadow rounded">
                        <img
                            src={anime.images.jpg.image_url}
                            alt={anime.title}
                            className="w-full h-48 object-cover rounded"
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