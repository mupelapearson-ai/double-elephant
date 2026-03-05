import { useState } from "react";

export default function App() {
  const [songs, setSongs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    artist: "",
    genre: "Hip Hop",
    audio: "",
    cover: "",
    comments: []
  });

  const genres = [
    "Hip Hop",
    "Country",
    "Afrobeat",
    "R&B",
    "Pop",
    "Gospel",
    "Dancehall"
  ];

  const uploadSong = () => {
    if (!form.title || !form.audio || !form.cover) return;
    setSongs([{ ...form }, ...songs]);
    setForm({
      title: "",
      artist: "",
      genre: "Hip Hop",
      audio: "",
      cover: "",
      comments: []
    });
  };

  const addComment = (index, text) => {
    const updated = [...songs];
    updated[index].comments.push(text);
    setSongs(updated);
  };

  return (
    <div style={{fontFamily:"sans-serif",background:"#0f172a",color:"white",minHeight:"100vh"}}>
      
      <nav style={{padding:"15px",background:"#020617",display:"flex",justifyContent:"space-between"}}>
        <h2>🐘 Double Elephant</h2>
        <div>Home | Upload</div>
      </nav>

      <h2 style={{padding:"20px"}}>🔥 Top Songs</h2>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"20px",padding:"20px"}}>
        {songs.map((song,i)=>(
          <div key={i} style={{background:"#1e293b",padding:"15px",borderRadius:"12px"}}>
            <img src={song.cover} width="100%" style={{borderRadius:"10px"}}/>
            <h3>{song.title}</h3>
            <p>{song.artist}</p>
            <p>🎵 {song.genre}</p>

            <audio controls src={song.audio} style={{width:"100%"}} />

            <a href={song.audio} download>
              <button>⬇ Download</button>
            </a>

            <div>
              <h4>Comments</h4>
              {song.comments.map((c,ci)=><p key={ci}>💬 {c}</p>)}
              <input
                placeholder="Add comment"
                onKeyDown={(e)=>{
                  if(e.key==="Enter"){
                    addComment(i,e.target.value);
                    e.target.value="";
                  }
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div style={{padding:"20px"}}>
        <h2>Upload Song</h2>

        <input placeholder="Song Title"
          value={form.title}
          onChange={e=>setForm({...form,title:e.target.value})}
        /><br/><br/>

        <input placeholder="Artist Name"
          value={form.artist}
          onChange={e=>setForm({...form,artist:e.target.value})}
        /><br/><br/>

        <select
          value={form.genre}
          onChange={e=>setForm({...form,genre:e.target.value})}
        >
          {genres.map(g=><option key={g}>{g}</option>)}
        </select><br/><br/>

        <input placeholder="Audio URL (.mp3 link)"
          value={form.audio}
          onChange={e=>setForm({...form,audio:e.target.value})}
        /><br/><br/>

        <input placeholder="Cover Image URL"
          value={form.cover}
          onChange={e=>setForm({...form,cover:e.target.value})}
        /><br/><br/>

        <button onClick={uploadSong}>Upload</button>
      </div>

    </div>
  );
            }
