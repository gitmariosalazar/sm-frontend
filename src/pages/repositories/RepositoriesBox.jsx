import { DeleteForever, EditNote, Visibility } from "@mui/icons-material";
import { menuicons } from "../../assets/assets";
import "./RepositoriesBox.css";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/functions";
import { ImFileEmpty } from "react-icons/im";
import { useAuth } from "../../context/useAuth";
import Empty from "../../components/empty/Empty";

//const projectsData = repositories;
const RepositoriesBox = ({ repositories }) => {
  const projectsData = repositories;
  const { selectObject } = useAuth();

  const handleSelectLanguage = async (object) => {
    try {
      await selectObject(object);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="taskbox">
      <div className="taskbox-box-container">
        {projectsData ? (
          <>
            {projectsData.map((repo, index) => (
              <div key={index} className="taskbox-box">
                <div className="repo-header">
                  <h2 className="text-container">{repo.name}</h2>
                  <h4 className="hf">{formatDate(repo.createdAt)}</h4>
                </div>
                <div className="underline-taskbox">
                  <span></span>
                </div>

                <div className="box-footer-taskbox">
                  <div className="taskbox-icons">
                    <p className="text-container">{repo.description}</p>
                  </div>
                </div>
                <div className="box-info">
                  <div className="repositories-info">
                    <h3>Primary Language: </h3>
                    <p>{repo.primaryLanguage["name"]}</p>
                  </div>
                  <div className="repositories-info">
                    <h3>Owner:</h3>
                    <p>{repo.owner["login"]}</p>
                  </div>
                  <div className="repositories-info">
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
                <div className="taskbox-info">
                  <div className="repo-counts">
                    <div className="box-count">
                      <div className="box-img">
                        <img
                          src={menuicons.codefork}
                          alt=""
                          className="icon-menu"
                        />
                        <p>Forks</p>
                      </div>
                      <p>{repo.forkCount}</p>
                    </div>
                    <div className="box-count">
                      <div className="box-img">
                        <img src={menuicons.eye} alt="" className="icon-menu" />
                        <p>Watches</p>
                      </div>
                      <p>{repo.stargazerCount}</p>
                    </div>
                    <div className="box-count">
                      <div className="box-img">
                        <img
                          src={menuicons.star}
                          alt=""
                          className="icon-menu"
                        />
                        <p>Stars</p>
                      </div>
                      <p>{repo.watchers["totalCount"]}</p>
                    </div>
                  </div>
                  <div className="floating-icons-task">
                    <Link
                      onClick={() => {
                        handleSelectLanguage(repo);
                      }}
                      to="/details"
                      className="floating-link-task"
                      title="View more"
                    >
                      <Visibility className="icon-floating-task-edit" />
                    </Link>{" "}
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            <div className="isempty">
              <Empty
                title={
                  "No projects yet, please search projects by language name"
                }
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RepositoriesBox;
