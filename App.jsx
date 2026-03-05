import React, { useState } from "react";

export default function App() {
  const [tracks, setTracks] = useState([]);
  const [title, setTitle] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [error, setError] = useState("");

  const upload = (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Please enter a song title");
      return;
    }
    if (!audioFile) {
      setError("Please select an audio file");
      return;
    }
    if (!coverFile) {
      setError("Please select a cover image");
      return;
    }

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

  const deleteTrack = (id) => {
    setTracks(tracks.filter(t => t.id !== id));
  };

  return (
    <div style={{maxWidth:900,margin:"auto",padding:20}}>
      <h1 style={{textAlign:"center",fontSize:40,marginBottom:30}}>🎵 Double Elephant</h1>

      <form onSubmit={upload} style={{marginBottom:30,background:"#1a1a2e",padding:20,borderRadius:10}}>
        <input 
          placeholder="Song title" 
          value={title}
          onChange={e=>setTitle(e.target.value)}
          required
        />
        <input 
          type="file" 
          accept="audio/*" 
          onChange={e=>setAudioFile(e.target.files[0])}
          required
        />
        <input 
          type="file" 
          accept="image/*" 
          onChange={e=>setCoverFile(e.target.files[0])}
          required
        />
        {error && <div style={{color:"#ff6b6b",marginBottom:10,fontSize:14}}>{error}</div>}
        <button type="submit" style={{width:"100%"}}>Upload Song</button>
      </form>

      {tracks.length === 0 && !error && <p style={{textAlign:"center",color:"#888"}}>No tracks yet. Upload one to get started!</p>}

      {tracks.map(track => (
        <div key={track.id} style={{marginBottom:30,background:"#1a1a2e",padding:15,borderRadius:10}}>
          <img src={track.coverUrl} style={{width:"100%",maxHeight:250,objectFit:"cover",borderRadius:5,marginBottom:15}} alt={track.title}/>
          <h3 style={{marginBottom:10}}>{track.title}</h3>
          <audio controls src={track.audioUrl} style={{width:"100%",marginBottom:15}}/>
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            <button onClick={()=>like(track.id)}>❤️ Like ({track.likes})</button>
            <a 
              href={track.audioUrl} 
              download={track.title}
              style={{textDecoration:"none"}}
            >
              <button>⬇ Download</button>
            </a>
            <button onClick={()=>deleteTrack(track.id)} style={{background:"#ff6b6b",color:"white"}}>🗑️ Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}