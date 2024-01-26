import React, { useState } from "react";
import "./style/style.scss";
function Home() {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState("");
  const [prompt, setPrompt] = useState("");
  const [jresult, setJresult] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue) {
      setError("Please enter a prompt");
      setPrompt("");
      setResult("");
      setJresult("");
      return;
    }

    try {
      const response = await fetch("/api/chatgpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputValue }),
      });

      if (response.status == 200) {
        const data = await response.json();
        console.log(data);
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      setResult("");
      setError("Something went wrong");
      setPrompt("");
      setJresult("");
    }
  };

  return (
    <div className="container">
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <div className="row form-group mt-2">
          <div className="col-sm-10">
            <div className="form-floating">
              <input
                className="form-control custom-input"
                id="floatingInput"
                type="text"
                placeholder="Enter a prompt here"
                value={inputValue}
                onchange={(e) => setInputValue(e.target.value)}
              />
              <label htmlFor="floatingInput">Input</label>
            </div>
          </div>
          <div className="col-sm-2">
            <button className="btn btn-primary custom-button" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {prompt && <div className="alert alert-info mt-3">{prompt}</div>}
      {result && <div className="alert alert-success mt-3">{result}</div>}
      {result && (
        <pre className="alert alert-warning mt-3">
          <code>{jresult}</code>
        </pre>
      )}
    </div>
  );
}
export default Home;
