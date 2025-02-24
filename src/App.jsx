import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/home";
import TopAnime from "./components/TopAnime/TopAnime";
import Genres from "./components/Genres/Genres";
import AnimeListbyGenre from "./components/Genres/AnimeListbyGenre";
import Seasonal from "./components/Seasonal/Seasonal";
import SearchResults from "./components/SearchResults/SearchResults";
import AnimeDetails from "./components/AnimeDetails/AnimeDetails";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";

function App(){
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/top-anime" element={<TopAnime />} />
        <Route path="/genres" element={<Genres />} />
        <Route path="/genres/:id" element={<AnimeListbyGenre />} />
        <Route path="/seasonal/:year/:season" element={<Seasonal />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/anime/:id" element={<AnimeDetails />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}


// function App (){
//   return(
//     <div className="container">
//     <h1 className="text-center text-3xl font-bold p-4">Anime</h1>
//     {/* <ComicViewer /> */}
//     <ComicList/>
//   </div>
//   );
// };


export default App;


// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
