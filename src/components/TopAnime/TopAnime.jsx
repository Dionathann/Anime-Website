/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";
import AnimeDisplay from "./AnimeDisplay";
import Header from "../Header/Header";
import "./ComicListStyle.css";

let url = "https://api.jikan.moe/v4/top/anime";
let hasNextPage = true;

function TopAnime(){
    const [anime, setAnime] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    FetchingData({ setAnime, setLoading, page });

    if(loading) return <p>Loading...</p>;

    return (
      <>  
        <Header/>
        <h1>Top Anime</h1>
        <AnimeDisplay anime={anime}/>
        <PageHandler page= {page} setPage={setPage} />
      </>
      
    );
}

function FetchingData({setAnime, setLoading,page}){
    useEffect(() => {
    let newurl = (`${url}?page=${page}`);
    axios.get(newurl)
    .then((response) => {
      console.log(response.data.data);
      setAnime(response.data.data);
      setLoading(false);
      console.log("Data Fetched");
    })
    .catch((error) => {
      console.error("Error Fetching Data", error);
      setLoading(false);
    });   
    
    console.log(newurl);
    }, [page]);
}

function PageHandler({page,setPage}){
  return(

    <div className="flex justify-center gap-4 mt-4">
    <button 
        onClick={() => setPage(page - 1)} 
        disabled={page === 1} // Disable on first page
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
    >
        Prev
    </button>

    <button 
        onClick={() => nextPage(page,setPage)}
        disabled={!hasNextPage}
        className="px-4 py-2 bg-blue-500 text-white rounded"
    >
        Next
    </button>
</div>
  );
}

function nextPage(page,setPage){
  setPage(page + 1);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export default TopAnime