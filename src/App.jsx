import { useCallback, useEffect, useState } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [year, setYear] = useState("");
  const [watched, setWatched] = useState(false);
  const [data, setData] = useState([]);
  const [id, setId] = useState([]);

  const handleSubmit=useCallback((event) => {
    event.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      title,
      desc,
      year,
      watched,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://sayan-4d2d9-default-rtdb.firebaseio.com/movies.json",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
      })
      .catch((error) => console.error(error));


  })

  const handleDelete=useCallback((index)=>{
    const uid = id[index];

    const requestOptions = {
      method: "DELETE",
    };

    fetch(
      `https://sayan-4d2d9-default-rtdb.firebaseio.com/movies/${uid}.json`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  })

  useEffect(() => {
    fetch("https://sayan-4d2d9-default-rtdb.firebaseio.com/movies.json")
      .then((res) => res.json())
      .then((result) => {
        if(!result){
          throw new Error
        }
        setId(Object.keys(result));
        setData(Object.values(result));
      });
  }, [handleSubmit,handleDelete]);

  return (
    <>
      <div>
        <form
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <div>
            <label htmlFor="">Movie Title:</label>
            <input
              type="text"
              name=""
              id="title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="">Movie description:</label>
            <input
              type="text"
              name=""
              id="desc"
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="">Movie Release Year:</label>
            <input
              type="date"
              name=""
              id="year"
              onChange={(e) => {
                setYear(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="">Watched:</label>
            <input
              type="checkbox"
              name=""
              id="watched"
              onChange={(e) => {
                setWatched(e.target.checked);
              }}
            />
          </div>
          <input type="submit" value="Add Movie" />
        </form>
      </div>
      <div id="container" style={{display:"grid"}}>
        {data.map((ele, index) => {
          return (
            <>
              <div className="card" key={index}>
                <h1>{ele.title}</h1>
                <h3>{ele.desc}</h3>
                <p>{ele.year}</p>
                <p>{ele.watched?"Watched":"Not Watched"}</p>
                <button
                  onClick={() => {
                    handleDelete(index);
                  }}
                >
                  Delete Movie
                </button>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

export default App;
