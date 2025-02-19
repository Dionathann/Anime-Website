/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState} from "react";
import { useParams, useSearchParams } from "react-router-dom";

import Header from "../Header/Header";

let genreUrl = "https://api.jikan.moe/v4/genres/anime";
let hasNextPage = true;
function AnimeList(){
    const {id} = useParams();
    const [animeList, setAnimeList] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams("");
    const [genreName, setGenreName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const page = parseInt(searchParams.get("page")) || 1;

    useEffect(() => {
        if(!id) return;

        const fetchGenreName = async () => {
            try {
              const response = await axios.get(genreUrl);
              const genre = response.data.data.find((g) => g.mal_id.toString() === id);
              
              if (genre) {
                setGenreName(genre.name);
              } else {
                setGenreName("Unknown Genre");
              }
            } catch (error) {
              console.log(error);
            }
          };

        const fetchAnime = async () =>{
            setLoading(true);
            setError(null);
            setAnimeList([]);

            try{
                const animeUrl = `https://api.jikan.moe/v4/anime?genres=${id}&page=${page}`;
                const response = await axios.get(animeUrl);
                
                setAnimeList(response.data.data);
            }
            catch(error){
                console.log(error);
                console.log("Error fetching data");
            } 
            finally{
                setLoading(false);
            }
        };
        fetchGenreName();
        fetchAnime();
    }, [page, id]);

    return (
        <div>
            <Header/>
            <h1>{genreName}</h1>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div className="anime-grid">
                {animeList.map((anime) => (
                    <div key={anime.mal_id} className="anime-item">
                        <img src={anime.images.jpg.image_url} alt={anime.title} />
                        <h3>{anime.title}</h3>
                    </div>
                ))}
            </div>
            <PageHandler page={page} setSearchParams={setSearchParams} selectedGenreName={genreName}/>
        </div>
    );
}

function PageHandler({page, setSearchParams, selectedGenreName}){
    return(

        <div className="flex justify-center gap-4 mt-4">
        <button 
            onClick={() => setSearchParams({ genre: selectedGenreName, page: page - 1 })} 
            disabled={page === 1} // Disable on first page
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
            Prev
        </button>
    
        <button 
            onClick={() => nextPage(page,setSearchParams, selectedGenreName)}
            disabled={!hasNextPage}
            className="px-4 py-2 bg-blue-500 text-white rounded"
        >
            Next
        </button>
    </div>
      );
}

function nextPage(page,setSearchParams, selectedGenreName){
    setSearchParams({genre: selectedGenreName, page: page + 1 });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

export default AnimeList