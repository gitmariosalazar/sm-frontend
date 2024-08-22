import "./Repositories.css";
import { AddTask } from "@mui/icons-material";
import { Link } from "react-router-dom";
import RepositoriesBox from "./RepositoriesBox";

const Repositories = ({ repositories }) => {
  return (
    <>
      <div className="task" id="tasks">
        <h3 className="contact-title">
          <div className="underline-project">
            <span></span>
          </div>
        </h3>
        <div className="task-box-container">
          <div className="task-box-right">
            <div className="task-box">
              <RepositoriesBox repositories={repositories} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Repositories;
