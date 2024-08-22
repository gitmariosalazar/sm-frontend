import "./Home.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import InputLabel from "../../components/inputs/InputLabel";
import { menuicons } from "../../assets/assets";
import { Search, Token } from "@mui/icons-material";
import Repositories from "../repositories/Repositories";
import { useState } from "react";

const Home = () => {
  const { user, isAuthenticated, searchLanguageByName, languages } = useAuth();

  const [language, setLanguage] = useState("");
  const [quantity, setQuantity] = useState(0);

  const handleChangeLanguage = async (e) => {
    setLanguage(e.target.value);
  };

  const handleChangeQuantity = async (e) => {
    setQuantity(e.target.value);
  };

  const data = {
    language: language,
    quantity: quantity,
  };

  const handleSearchLanguage = async (name, quantity) => {
    try {
      await searchLanguageByName(name, quantity);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <>
      <div className="home" id="home">
        <div className="home-box-container">
          <div className="title">
            <h1>Search Repositories on GitHub</h1>
            <div className={isAuthenticated == false ? "btn-home" : "inactive"}>
              <p>You need a Git Hub token to search.</p>

              <Link to="/githubtoken" className="btn-new-token">
                <Token style={{ width: "20px", height: "20px" }} />
                Set Token
              </Link>
            </div>
          </div>
          <div className="search-box">
            <div className="input-number-a">
              <div className="in">
                <div className="col-span-1">
                  <label htmlFor="cvv-input" className="sr-only">
                    Card CVV code:
                  </label>
                  <input
                    type="number"
                    id="cvv-input"
                    aria-describedby="helper-text-explanation"
                    className="bg-black border-x-2 border-y-2 h-12 border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-20 p-2.5 dark:bg-gray-900 dark:border-gray-800 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Limit"
                    required
                    onChange={handleChangeQuantity}
                  />
                </div>
              </div>
            </div>
            <InputLabel
              placeholder={"Type your language here"}
              onChange={handleChangeLanguage}
            />
            <button
              className="btn-search"
              onClick={() => {
                handleSearchLanguage(data.language, data.quantity);
              }}
            >
              <Search />
              Search
            </button>
          </div>
          <Repositories repositories={languages} />
        </div>
      </div>
    </>
  );
};

export default Home;
