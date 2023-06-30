import React from 'react';
import SongArtist from './SongArtist';
import SongLyrics from './SongLyrics';


const SongDetails = ({search, lyrics}) => {
    return ( 
        <div className='song-details'>
        <article className='grid-1-2'>
        <SongArtist data={search}/>
        
        <SongLyrics lyrics={lyrics}/>
        </article>
        </div>
     );
}
 
export default SongDetails;