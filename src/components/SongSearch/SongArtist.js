import React from 'react';


const SongArtist = ({data}) => {
   

    return ( 
        <div className='song-artist'>
            <h2 className='artist-title'>{data.name && data.name}</h2>
            {data.images && <img src={data.images[0].url} alt="img"/>}
            <br/><br/><br/>

            <div className='genres-followers'>
                <div className='genres'>
                    {data.genres && data.genres.map((el, index)=> <span key={index}># {el.charAt(0).toUpperCase() + el.slice(1)}</span>)}
                </div>
                <div>
                    {data.followers && (
                        <div className='followers-div' style={{display:"flex", alignItems:"center", gap:"7px"}}>
                            <span className='followers'>{data.followers.total}</span>
                            <span className='followers2'>Followers</span>
                        </div>
                    )}
                </div>
            <br/>
            </div>
            
            <br/>
            {data.external_urls && <a href={data.external_urls.spotify} target="_blank" rel="noopener noreferrer">Spotify Profile</a>}
           
        </div>
     );
    }
    
    export default SongArtist;
    


    // <h2>{data.artists[0].strArtist || "No se encontro el Artista"}</h2> {/* IMPORTANTE, no podemos poner data.name ? data.name : data    porque toma data como un objeto, y nos marca error. */}
    // {data.artists[0].strArtistThumb && <img src={data.artists[0].strArtistThumb} alt={data.artists[0].strArtist}/>}
    