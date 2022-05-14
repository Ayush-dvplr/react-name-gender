import {  useState } from "react";
import "./styles.css";

export default function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState({ name: "", gender: "" });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setInput(e.target.value.trim().slice(0, 50));
  };
  const handleSearch = async () => {
    setInput("");
    setLoading(true);
    const url = "https://api.genderize.io/?name=" + input.slice(0, 50);

    const request = await fetch(url, { method: "GET" });
    const response = await request.json();
    for (var key in Correction) {
      if (key === response.name.toLowerCase()) {
        response.gender = Correction[key];
      }
    }

    setResult({ name: response.name, gender: response.gender });
    setLoading(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const Correction = {
    jaya: "female",
    vir: "male",
    sindhu: "male"
  };

  return (
    <div className="App">
      <div className={"container"}>
        <h2>Predict your gender</h2>
        <form onSubmit={handleFormSubmit}>
          <div className={"searchBox"}>
            <div className={"inputBox"}>
              <input
                maxLength="50"
                placeholder={"Enter first name only"}
                value={input}
                onChange={handleInputChange}
              />
            </div>
            {loading ? (
              <div className={"searchBtn"}>
                <div className="loader">.</div>
              </div>
            ) : (
              <div className={"searchBtn"} onClick={handleSearch}>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/751/751463.png"
                  alt="search"
                />
              </div>
            )}
          </div>
        </form>

        <div className={"resultBox"}>
          <div
            className={"genderBox"}
            style={{
              backgroundImage:
                result.gender === "male"
                  ? "linear-gradient(to right,#4E65FF  ,#92EFFD)"
                  : ""
            }}
          >
            <div className={"genderIcon"}>
              <img
                src="https://cdn-icons-png.flaticon.com/128/949/949822.png"
                alt="gender"
              />
            </div>
            <div className={"genderName"}>
              {result.gender === "male" ? result.name : ""}
            </div>
          </div>
          <div
            className={"genderBox"}
            style={{
              backgroundImage:
                result.gender === "female"
                  ? "linear-gradient(to right,#EE9CA7 ,#FFDDE1)"
                  : ""
            }}
          >
            <div className={"genderIcon"}>
              <img
                src="https://cdn-icons-png.flaticon.com/128/949/949823.png"
                alt="gender"
              />
            </div>
            <div className={"genderName"}>
              {result.gender === "female" ? result.name : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
