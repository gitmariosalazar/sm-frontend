import {
  Check,
  CheckBox,
  Clear,
  Close,
  DeleteForever,
  Info,
  Key,
  RemoveCircle,
  TimerOff,
  Token,
} from "@mui/icons-material";
import React, { useEffect } from "react";
import { menuicons } from "../../assets/assets";
import { Link } from "react-router-dom";
import "./Github.css";
import { getDateFormat } from "../../utils/functions";
import { useAuth } from "../../context/useAuth";
import Empty from "../../components/empty/Empty";

const GitHub = () => {
  const {
    tokens,
    getTokens,
    removeToken,
    setTokenJWT,
    remokeAllTokens,
    clearToken,
  } = useAuth();

  const handleClearToken = async () => {
    try {
      await clearToken();
      getTokens();
    } catch (error) {
      console.log("Error cleaaning token: ", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await removeToken(id);
      getTokens();
    } catch (error) {
      console.error("Error deleting token: ", error);
    }
  };

  const handleRevokeTokens = async () => {
    try {
      await remokeAllTokens();
      getTokens();
    } catch (error) {
      console.log("Error revoke tokens", error);
    }
  };

  const handleSetToken = async (id) => {
    try {
      await setTokenJWT(id);
      getTokens();
    } catch (error) {
      console.log("error set token ", error);
    }
  };

  useEffect(() => {
    getTokens();
  }, []);
  //const tokens = list_tokens;
  return (
    <div className="github">
      <div className="github-container">
        <div className="github-title">
          <Key className="key" />
          <h3>Personal Access Token</h3>
        </div>
        <hr />
        <div className="box-newtoken">
          <div className="text">
            <img src={menuicons.key} alt="" className="icon-menu icon-key" />
            <p>Personal Access Token</p>
          </div>
          <div className="box-right">
            <Link to="/addtoken" className="btn-new-token">
              <Token style={{ width: "20px", height: "20px" }} />
              Add new token
            </Link>
            <button
              className="btn-remove-token"
              onClick={() => {
                handleRevokeTokens();
              }}
            >
              <Close style={{ width: "20px", height: "20px" }} />
              Revoke All
            </button>
          </div>
        </div>
        <hr />
        <p className="desc">
          Tokens you have generated that can be used to access the{" "}
          <Link to="/" className="link-token" target="_blank">
            GitHub API
          </Link>
        </p>
        <div className="box-table">
          {tokens ? (
            <>
              {tokens.map((token, index) => (
                <div className="box-row" key={index}>
                  <div className="table-lefth">
                    <div className="box-head">
                      <h4>{token.token_name}</h4>
                      <p>{token.description}</p>
                    </div>
                    <div
                      className={
                        token.status == "expired" ? "box-expired" : "box-foot"
                      }
                    >
                      <Info />
                      <p>Expires on {getDateFormat(token.expire_date)}</p>
                    </div>
                  </div>
                  <div className="table-rigth">
                    <div className="box-head-r">
                      <h3>Last used within the last week</h3>
                      <button
                        className="btn-remove-token"
                        onClick={() => {
                          handleDelete(token._id);
                        }}
                      >
                        <DeleteForever
                          style={{ width: "20px", height: "20px" }}
                        />
                        Delete
                      </button>
                    </div>
                    <div className="box-foot-r">
                      <div className={token.status}>
                        <h3>Satatus:</h3>
                        <span className={`span-${token.status}`}>
                          {token.status == "disabled" ? (
                            <RemoveCircle
                              style={{ width: "17px", height: "17px" }}
                            />
                          ) : token.status == "enabled" ? (
                            <Check style={{ width: "17px", height: "17px" }} />
                          ) : token.status == "revoked" ? (
                            <Close style={{ width: "17px", height: "17px" }} />
                          ) : (
                            <TimerOff
                              style={{ width: "17px", height: "17px" }}
                            />
                          )}
                          <p>{token.status}</p>
                        </span>
                      </div>
                      {token.status == "disabled" ? (
                        <>
                          {" "}
                          <button
                            className="btn-new-token"
                            onClick={() => {
                              handleSetToken(token._id);
                            }}
                          >
                            <Check style={{ width: "20px", height: "20px" }} />
                            Use Token
                          </button>
                        </>
                      ) : token.status == "enabled" ? (
                        <>
                          {" "}
                          <button
                            className="btn-clear-token"
                            onClick={() => {
                              handleClearToken();
                            }}
                          >
                            <Clear style={{ width: "20px", height: "20px" }} />
                            Clear Token
                          </button>
                        </>
                      ) : (
                        <>
                          {" "}
                          <button
                            disabled
                            className="btn-new-token"
                            onClick={() => {
                              handleSetToken(token._id);
                            }}
                          >
                            <Check style={{ width: "20px", height: "20px" }} />
                            Use Token
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <Empty
              title={
                "No tokens yet, please add new token to use on search repositories"
              }
            />
          )}
        </div>
        <p className="token-info">
          Personal access tokens (classic) function like ordinary OAuth access
          tokens. They can be used instead of a password for Git over HTTPS, or
          can be used to{" "}
          <Link to="/" className="link-github" target="_blank">
            authenticate to the API over Basic Authentication.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default GitHub;
