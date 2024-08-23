import {
  Analytics,
  BarChart,
  Check,
  CheckBox,
  Close,
  DeleteForever,
  GridView,
  Info,
  Key,
  Menu,
  RemoveCircle,
  TimerOff,
  Token,
} from "@mui/icons-material";
import React, { useState } from "react";
import { menuicons } from "../../assets/assets";
import { Link } from "react-router-dom";
import "./Graphql.css";
import { formatDate } from "../../utils/functions";
import { useAuth } from "../../context/useAuth";
import { ImFileEmpty } from "react-icons/im";
import Empty from "../../components/empty/Empty";

const Graphql = () => {
  const { searchLanguageByName, languages, selectObject, isAuthenticated } =
    useAuth();

  if (!isAuthenticated) {
    return (
      <>
        <div className="no-token">
          <div className="nt-cont">
            <Empty title={"No token provided"} />
            <p>You need a Git Hub token to Analytics.</p>

            <div>
              <Link to="/githubtoken" className="btn-new-token">
                <Token style={{ width: "20px", height: "20px" }} />
                Set Token
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  const [language, setLanguage] = useState("");
  const [quantity, setQuantity] = useState(0);

  const handleChangeLanguage = async (e) => {
    setLanguage(e.target.value);
  };

  const handleChangeQuantity = async (e) => {
    setQuantity(e.target.value);
  };

  const body = {
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

  const handleSelectLanguage = async (object) => {
    try {
      await selectObject(object);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="github">
      <div className="github-container-graphql">
        <div className="github-title">
          <img src={menuicons.graphqllogo} alt="" className="icon-menu" />
          <h3>GraphQL Projects</h3>
        </div>
        <hr />
        <div className="box-newtoken">
          <div className="box-info-title">
            <img src={menuicons.graphqllogo} alt="" className="icon-menu" />
            <p>GraphQL Analytics with Other Languages</p>
          </div>

          <div className="box-right-graphql">
            <div className="input-number-a">
              <div className="ing">
                <div className="col-span-1">
                  <label htmlFor="cvv-input" className="sr-only">
                    Card CVV code:
                  </label>
                  <input
                    type="number"
                    id="cvv-input"
                    aria-describedby="helper-text-explanation"
                    className="bg-black border-x-2 border-y-2 h-10 border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-20 p-2.5 dark:bg-gray-900 dark:border-gray-800 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Limit"
                    required
                    onChange={handleChangeQuantity}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-end max-w-sm mx-auto search">
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-start p-2 pointer-events-none">
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m8 8-4 4 4 4m8 0 4-4-4-4m-2-3-4 14"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="simple-search"
                  className="bg-gray-50 h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-36 ps-8 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search language name..."
                  required
                  onChange={handleChangeLanguage}
                />
              </div>
              <button
                onClick={() => {
                  handleSearchLanguage(body.language, body.quantity);
                }}
                type="submit"
                className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </div>
          </div>
        </div>

        <div className="box-table">
          {languages ? (
            <>
              {languages.map((repo, index) => (
                <div className="box-row-g" key={index}>
                  <div className="fi">
                    <div className="first">
                      <div className="repo-header-explorer">
                        <h2 className="text-container-n">{repo.name}</h2>
                        <h4 className="hf">{formatDate(repo.createdAt)}</h4>
                      </div>
                      <div className="box-info-explorer">
                        <div className="repositories-info-explorer">
                          <h3>Primary Language: </h3>
                          <p>
                            {" "}
                            {repo.primaryLanguage
                              ? repo.primaryLanguage["name"]
                              : "No Name"}
                          </p>
                        </div>
                        <div className="repositories-info-explorer">
                          <h3>Owner:</h3>
                          <p>{repo.owner["login"]}</p>
                        </div>
                        <div className="repositories-info-explorer">
                          <h3>URL:</h3>
                          <a
                            href={repo.url}
                            className="text-container"
                            target="_blank"
                          >
                            {repo.url}
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="second">
                      <div className="description">
                        <p className="text-container">{repo.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="fi">
                    <div className="third">
                      <div className="repo-counts-explorer">
                        <div className="box-count-explorer">
                          <div className="box-img">
                            <img
                              src={menuicons.codefork}
                              alt=""
                              className="icon-menu"
                            />
                            <p>Forks</p>
                          </div>
                          <p className="value-counts">{repo.forkCount}</p>
                        </div>
                        <div className="box-count-explorer">
                          <div className="box-img">
                            <img
                              src={menuicons.eye}
                              alt=""
                              className="icon-menu"
                            />
                            <p>Watches</p>
                          </div>
                          <p className="value-counts">
                            {repo.watchers["totalCount"]}
                          </p>
                        </div>
                        <div className="box-count-explorer">
                          <div className="box-img">
                            <img
                              src={menuicons.star}
                              alt=""
                              className="icon-menu"
                            />
                            <p className="value-counts">Stars</p>
                          </div>
                          <p>{repo.stargazerCount}</p>
                        </div>
                      </div>
                    </div>
                    <div className="fourth">
                      <div className="check-box">
                        <div className="languages">
                          <ul className="list">
                            {repo.languages.edges &&
                            repo.languages.edges.length > 0 ? (
                              <>
                                {repo.languages.edges
                                  .slice(0, 4)
                                  .map((edge, ind) => (
                                    <li key={ind} className="list-item">
                                      {edge.node.name}
                                    </li>
                                  ))}
                              </>
                            ) : (
                              <li className="list-item">No Languages</li>
                            )}
                          </ul>
                        </div>
                      </div>
                      <div className="buttons">
                        <Link
                          to={"/details"}
                          className="btn-new-token-t"
                          onClick={() => {
                            handleSelectLanguage(repo);
                          }}
                        >
                          <Menu style={{ width: "17px", height: "17px" }} />
                          Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <Empty
              title={"No projects yet, please search projects by language name"}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Graphql;
