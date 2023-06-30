import React, {useState} from 'react';




const SongForm = ({getArtistAndLyrics, resetUI}) => {
    
    const [form, setForm] = useState({
        artist: "",
        song: ""
    });
    
    const handleChange = (e) =>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        getArtistAndLyrics(e.target.artist.value, e.target.song.value);
    }

    const handleReset = (e) =>{
        setForm({
            artist: "",
            song: ""
        });
        resetUI();

    };
    return ( 
        <div className='song-form'>
        <form onSubmit={handleSubmit}>
            <div>
                <input type="text" placeholder="Artist" name="artist" value={form.artist} onChange={handleChange} required />
                <input type="text" placeholder="Song" name="song" value={form.song} onChange={handleChange} required />
            </div>
            <div>
                <input type="submit" value="Search"className='inputPink'/>
                <input type="reset" value="Reset" onClick={handleReset} className='inputPink'/>
            </div>
        </form>
        </div>
     );
}
 
export default SongForm;