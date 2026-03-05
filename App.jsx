import React, { useState } from "react";

export default function App() {
  const [tracks, setTracks] = useState([]);
  const [title, setTitle] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);

  const upload = (e) => {
    e.preventDefault();
    if (!title || !audioFile || !coverFile) return;

    setTracks([
      {
        id: Date.now(),
        title,
        audioUrl: URL.createObjectURL(audioFile),
        coverUrl: URL.createObjectURL(coverFile),
        likes: 0,
        comments: []
      },
      ...tracks
    ]);

    // Clear form after upload
    setTitle("");
    setAudioFile(null);
    setCoverFile(null);
  };

  const like = (id) => {
    setTracks(tracks.map(t => t.id === id ? {...t, likes: t.likes + 1} : t));
  };

  return (
    <div style={{maxWidth:900,margin:"auto",padding:20}}>
      <h1 style={{textAlign:"center",fontSize:40}}>🎵 Double Elephant</h1>

      <form onSubmit={upload} style={{marginBottom:30}}>
        <input 
          placeholder="Song title" 
          value={title}
          onChange={e=>setTitle(e.target.value)} 
        /><br/><br/>
        <input 
          type="file" 
          accept="audio/*" 
          onChange={e=>setAudioFile(e.target.files[0])} 
        /><br/><br/>
        <input 
          type="file" 
          accept="image/*" 
          onChange={e=>setCoverFile(e.target.files[0])} 
        /><br/><br/>
        <button>Upload Song</button>
      </form>

      {tracks.map(track => (
        <div key={track.id} style={{marginBottom:30,background:"#111",padding:15,borderRadius:10}}>
          <img src={track.coverUrl} style={{width:"100%",maxHeight:250,objectFit:"cover"}} alt={track.title}/>
          <h3>{track.title}</h3>
          <audio controls src={track.audioUrl} style={{width:"100%"}}/>
          <br/><br/>
          <button onClick={()=>like(track.id)}>❤️ React ({track.likes})</button>
          <a 
            href={track.audioUrl} 
            download={track.title}
            style={{marginLeft:10,textDecoration:"none"}}
          >
            <button>⬇ Download</button>
          </a>
        </div>
      ))}
    </div>
  );
}