import React,{useState, useEffect} from 'react';
import Loader from "../../utils/Loader"
import SongDetails from './SongDetails';
import SongForm from './SongForm';
// import {helpFetch} from "../../helpers/helpFetch.js";

const SongSearch = () => {
    const clientID = "0a5a810744fa4b2291120b509d465eab";
    const clientSecret = "5de42875ad424214b549d811552aa2b6";

    const [search, setSearch] = useState({});
    const [lyrics, setLyrics] = useState({});
    const [accessToken, setAccessToken] = useState(""); //Spotify nos pide un  token para poder usar la API.
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {   //Obtenemos el token
        let authParam = {
           method:  "POST",
           headers:{
            "Content-Type": "application/x-www-form-urlencoded"
           },
           body: `grant_type=client_credentials&client_id=${clientID}&client_secret=${clientSecret}`
        };
        
        //No podemos usar el helpFetch porque tenemos al body con JSON.stringify, aca no lo necesitamos.
        fetch("https://accounts.spotify.com/api/token", authParam)
        .then(obj => obj.ok ? obj.json() : Promise.reject(obj))
        .then(json => setAccessToken(json.access_token))
        .catch(err => console.log(err))
    
    }, []);


    //Para obtener la info de un artista, Spotify nos pide el ID, por eso primero hacemos una peticion para obtener el ID y despues otra para obtener la info de el artista. Lo mismo con la cancion. 
    const getArtistAndLyrics = async(artist, song) =>{
        setLoading(true);
        setSearch({})
        setLyrics({})
     //RTIST
      let artParam = {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        }
    };
      let ID;
      let artistID = await fetch(`https://api.spotify.com/v1/search?q=${artist}&type=artist`, artParam)
      .then(res => res.ok? res.json() : Promise.reject(res))
      .then(json => ID = json.artists.items[0].id)
      .catch(err => setSearch({name: "Artist Not Found"}));
      
      if(ID){
      let info;
      let artistInfo = await fetch(`https://api.spotify.com/v1/artists/${ID}`, artParam)
      .then(res=> res.ok ? res.json() : Promise.reject(res))
      .then(json => info = json)
      .catch(err => console.log(err));

      setSearch(info);

      //LYRICS
      let songID = [];
      let songInfo = await fetch(`https://api.spotify.com/v1/search?q=${song}&type=track`, artParam)
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(json => json.tracks.items.filter(el => {
        if(el.artists[0].id === ID && songID.length < 1){
            songID.push(el.id);
        };
      }
      ))
      .catch(err=> songID=[])
      
      if(songID){
        let songInfo = await fetch(`https://api.spotify.com/v1/tracks/${songID[0]}`, artParam)
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(json =>setLyrics(json))
        .catch(err => setLyrics({name: "No Song Found"}));
      }
          
    };
      
      setLoading(false);
};//FIN GETARTISTANDLYRICS
         
    
    const resetUI = () =>{
        setSearch({});
        setLyrics({});
    }

    return ( 
        <div>
          <div className='song-search-title'>
            <img src="/images/spotify-logo.svg" alt="abc" />
            <h2>MGF Spotify</h2>
          </div>

            <SongForm getArtistAndLyrics={getArtistAndLyrics} resetUI={resetUI}/>
            {loading && <Loader/>}
            <SongDetails search={search} lyrics={lyrics}/>
          
        </div>
     );
}
 
export default SongSearch;



// helpFetch().get(artistURL)
//         .then(res => {
//             if(!res.artists){
//                 setSearch({error: "No se encontro el Artista"})
//                 setBio({});
//                 setLoading(false);
//             }else if(res.artists){
//                 setSearch({name: res.artists[0].strArtist, logo: res.artists[0].strArtistThumb})
//                 setBio({bio: res.artists[0].strBiographyEN});
//                 setLoading(false);
//             }


// const getArtistAndLyrics = async (artist, song) =>{
//     let artistURL;
//     let lyricsURL;
//     setLoading(true);

//     const [artistRes, songRes] = await Promise.all([  //Con este await, logramos que el console log y loss set que vienen despues de lass peticiones, esperen a que se realizen las peticiones.
//         helpFetch().get(artistURL),
//         helpFetch().get(lyricsURL),
//     ])
    
//     console.log(artistRes, songRes);
//     setSearch(artistRes);
//     setLyrics(songRes);
//     setLoading(false);
// };