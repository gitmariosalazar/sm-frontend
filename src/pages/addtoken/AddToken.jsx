import {
  Check,
  CheckBox,
  Close,
  DeleteForever,
  Info,
  Key,
  RemoveCircle,
  TimerOff,
  Token,
} from "@mui/icons-material";
import React, { useState } from "react";
import { menuicons } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import InputLabel from "../../components/inputs/InputLabel";
import TextArea from "../../components/inputs/TextArea";
import InputNumber from "../../components/inputs/InputNumber";
import "./AddToken.css";
import { addDays } from "../../utils/functions";
import { useAuth } from "../../context/useAuth";

const AddToken = () => {
  const [token_name, setTokenName] = useState("");
  const [token_github, setTokenGithub] = useState("");
  const [expire_days, setExpireDays] = useState(0);
  const { token, addNewToken, getTokens } = useAuth();
  const navigate = useNavigate();

  const handleChangeTokenName = async (e) => {
    setTokenName(e.target.value);
  };

  const handleChangeTokenGithub = async (e) => {
    setTokenGithub(e.target.value);
  };

  const handleChangeExpireDays = async (e) => {
    setExpireDays(e.target.value);
  };

  const data = {
    token_name: token_name,
    token_github: token_github,
    expire_days: expire_days,
  };

  const onSubmit = async (data) => {
    try {
      console.log(data);
      addNewToken(data);
      getTokens();
      navigate("/githubtoken");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="github">
      <div className="github-container">
        <div className="github-title">
          <img src={menuicons.padlock} alt="" className="icon-menu" />
          <h3>Personal Access Token</h3>
        </div>
        <hr />

        <p className="token-info">
          Personal access tokens (classic) function like ordinary OAuth access
          tokens. They can be used instead of a password for Git over HTTPS, or
          can be used to{" "}
          <Link to="/" className="link-github">
            authenticate to the API over Basic Authentication.
          </Link>
        </p>
        <div className="box-table">
          <div className="box-input">
            <InputLabel
              placeholder="Type your note about token here"
              label="Note"
              onChange={handleChangeTokenName}
            />

            <p>What’s this token for?</p>
          </div>
          <div className="box-input-a">
            <TextArea
              placeholder="Type your token here"
              label="Token"
              onChange={handleChangeTokenGithub}
            />
            <p>What’s this token for?</p>
          </div>
          <div className="input-number-a">
            <div className="inxs">
              <div className="col-span-1">
                <label htmlFor="cvv-input" className="sr-only">
                  Card CVV code:
                </label>
                <input
                  type="number"
                  id="cvv-input"
                  aria-describedby="helper-text-explanation"
                  className="bg-black border-x-2 border-y-2  border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-800 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Days"
                  required
                  value={expire_days}
                  onChange={handleChangeExpireDays}
                />
              </div>
            </div>

            <p>The token will expire on {addDays(expire_days)}</p>
          </div>
        </div>
        <div className="github">
          <button
            to="/addtoken"
            className="btn-new-token"
            onClick={() => {
              onSubmit(data);
            }}
          >
            <Token style={{ width: "20px", height: "20px" }} />
            Add Token
          </button>
          <Link className="btn-remove-token" to={"/githubtoken"}>
            <Close style={{ width: "20px", height: "20px" }} />
            Cancel
          </Link>
        </div>
        <p className="get-token">
          Get Token on{" "}
          <a
            href="https://github.com/settings/tokens"
            className="link-github"
            target="_blank"
            rel="noopener noreferrer"
          >
            Git Hub.
          </a>
        </p>
      </div>
    </div>
  );
};

export default AddToken;
