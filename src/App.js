import { useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [input, setInput] = useState("");
  const [allcomments, setAllcomments] = useState([]);

  const getComments = async () => {
    const result = await axios.get("https://dummyjson.com/comments");
    setAllcomments(result.data.comments);
  };

  const deletComment = (getid) => {
    console.log("Deleted", getid);
    setAllcomments(allcomments.filter((d) => d.id !== getid));
  };

  return (
    <div className="main">
      <div className="comments-section">
        <h1>Comments</h1>
        <div className="search">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={getComments}>Search</button>
        </div>
        <div className="comments-box">
          {allcomments
            .filter((d) => d.body.indexOf(input) >= 0)
            .map((d) => (
              <div className="comments" key={d.id}>
                <p>{d.body}</p>
                <div>
                  <i
                    className="gg-close-o"
                    key={d.id}
                    onClick={() => deletComment(d.id)}
                  ></i>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default App;
