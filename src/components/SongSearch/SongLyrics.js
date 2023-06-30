import React from 'react';


const SongLyrics = ({lyrics}) => {
   let error = {
    backgroundColor: "#cf4242",
    padding: "1rem",
    color: "#fff",
    width: "100%",
    marginBotom: "1rem",
    textAlign: "center",
    fontWeight: "bolder",
    fontSize: "large"
   };

    return ( 
        <div className='song-lyrics'>
           {lyrics.name === "No Song Found" ? <h2 style={error}>{lyrics.name}</h2> : <h2 className='artist-title'>{lyrics.name}</h2> }
           {lyrics.album && <img src={lyrics.album.images[0].url || "#"} alt="album"/>}
           <br/><br/>
           {lyrics.external_urls && <a href={lyrics.external_urls.spotify} target="_blank" rel="noopener noreferrer"> Listen on Spotify </a>}
        </div>
     );
}
 
export default SongLyrics;