import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="homeContainer">
      <header className="header">
        <h1 className="pageTitle">zentradetasks</h1>
      </header>

      <div className="buttonContainer">
        <div className="buttonBox">
          <ul className="buttonList">
            <li>
              <button
                onClick={() => navigate("/zentrades_task1")}
                type="button"
                className="btn btn-lg"
              >
                zentrades_task1
              </button>
            </li>

            <li>
              <button
                onClick={() => navigate("/zentrades_task2")}
                type="button"
                className="btn btn-lg"
              >
                zentrades_task2
              </button>
            </li>

            

            <li>
              <button
                onClick={() => navigate("/zentrades_task3")}
                type="button"
                className="btn btn-lg"
              >
                zentrades_task3,4
              </button>
            </li>

          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
