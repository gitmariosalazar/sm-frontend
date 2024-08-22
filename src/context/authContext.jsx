import React, { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import {
  getCurrentToken,
  setTokenEnable,
  logout as Logout,
  addToken,
  findAllTokens,
  deleteToken,
  revokeAll,
  searchLanguage,
  removeCookieJWT,
  checkComponents,
  getDataLanguages,
} from "../api/auth";
import { ToastCustom } from "../components/ui/ToastCustom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [components, setComponents] = useState({
    response: {
      schema: {
        info: "Components not found to this project!",
      },
    },
  });
  const [branch, setBranch] = useState("no selected");
  const [language, setLanguage] = useState(null);
  const [datalanguages, setDataLanguages] = useState(null);
  const [languages, setLanguages] = useState(null);
  const [tokens, setTokens] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const checkLogin = async () => {
      if (!cookies.jwt) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const response = await getCurrentToken();
        if (response) {
          setToken(response);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error fetching current token:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, [cookies.jwt]);

  const getToken = async () => {
    try {
      const res = await getCurrentToken();
      setToken(res);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error fetching current token: ", error);
      setToken(null);
      setIsAuthenticated(false);
    }
  };

  const getTokens = async () => {
    try {
      const res = await findAllTokens();
      console.log(res.data.token);
      setTokens(res.data.token);
    } catch (error) {
      console.error("Error fetching tokens: ", error);
    }
  };

  const addNewToken = async (user) => {
    try {
      const res = await addToken(user);
      console.log("object new token", res.data.token);
      if (res.data.token != null) {
        setToken(res.data.token);
        setIsAuthenticated(true);
        ToastCustom(
          "success",
          res.data.message,
          "Success Message",
          "top-right"
        );
      } else {
        ToastCustom("info", res.data.message, "Info Message", "top-right");
      }
    } catch (error) {
      ToastCustom(
        "error",
        "Register user failed!",
        "Error Message",
        "top-right"
      );
    }
  };

  const searchLanguageByName = async (name, quantity) => {
    try {
      const res = await searchLanguage(name, quantity);
      //console.log(res.data.repositories);
      if (res.data.repositories.length > 0) {
        setLanguages(res.data.repositories);
        ToastCustom(
          "success",
          res.data.message,
          "Success Message",
          "top-right"
        );
      } else {
        ToastCustom("info", res.data.message, "Info Message", "top-right");
      }
      if (res.status == 403) {
        ToastCustom(
          "info",
          "The token provided is not valid!",
          "Info Message",
          "top-right"
        );
      }
    } catch (error) {
      console.log("Error to search language", error);
      ToastCustom(
        "error",
        "The limit is too high; use a smaller quantity!!",
        "Error Message",
        "top-right"
      );
    }
  };

  const removeToken = async (id) => {
    try {
      const res = await deleteToken(id);
      //console.log("delete token ", res.data.message);
      ToastCustom("success", res.data.message, "Info Message", "top-right");
      if (res.status === 204)
        setTokens(tokens.filter((token) => token._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const remokeAllTokens = async () => {
    try {
      const res = await revokeAll();
      //console.log("delete token ", res.data.message);
      ToastCustom("success", res.data.message, "Info Message", "top-right");
    } catch (error) {
      console.log(error);
    }
  };

  const setTokenJWT = async (data) => {
    try {
      const res = await setTokenEnable(data);
      if (res.data.token === null) {
        ToastCustom("error", res.data.message, "Error Message", "top-right");
      } else {
        setToken(res.data.token);
        setIsAuthenticated(true);
        ToastCustom(
          "success",
          res.data.message,
          "Success Message",
          "top-right"
        );
      }
    } catch (error) {
      setErrors([error.response.data.message]);
      ToastCustom("error", "Login failed!", "Error Message", "top-right");
    }
  };

  const clearToken = async () => {
    try {
      const res = await removeCookieJWT();
      console.log(res.data.error);
      if (res.data.error == 0) {
        setToken(null);
        setIsAuthenticated(false);
        ToastCustom(
          "info",
          "RRRRRRRR " + res.data.message,
          "Info Message",
          "top-right"
        );
      } else {
        ToastCustom("info", res.data.message, "Info Message", "top-right");
      }
    } catch (error) {
      console.error("Error during clear token:", error);
      ToastCustom("error", "No token provided!", "Error Message", "top-right");
    }
  };

  const selectObject = async (object) => {
    try {
      setLanguage(object);
      ToastCustom(
        "info",
        "Project selected successfully! ",
        "Info Message",
        "top-right"
      );
    } catch (error) {
      console.log("Error ocurred: ", error);
    }
  };

  const getDataLanaguagesByArray = async (languages) => {
    try {
      const res = await getDataLanguages(languages);
      console.log("Get datas");
      console.log(res.data.response);
      setDataLanguages(res.data.response);
      console.log("get datas 999");
    } catch (error) {
      console.log("Error to get data languages: ", error);
    }
  };

  const searchComponets = async (owner, repo, branch) => {
    try {
      const res = await checkComponents(owner, repo, branch);
      console.log(res.status);
      ToastCustom("info", res.data.message, "Info Message", "top-right");
      if (res.status == 200) {
        setComponents({
          response: res.data.response,
        });
        setBranch(branch);
      } else {
        setComponents({
          response: {
            schema: {
              info: "Components not found to this project!",
            },
          },
        });
      }
    } catch (error) {
      console.log("Error ocurred: ", error);
      setBranch(branch);
      setComponents({
        response: {
          schema: {
            info: "Components not found to this project!",
          },
        },
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated,
        loading,
        getToken,
        setTokenJWT,
        addNewToken,
        getTokens,
        tokens,
        removeToken,
        remokeAllTokens,
        searchLanguageByName,
        languages,
        clearToken,
        language,
        selectObject,
        components,
        searchComponets,
        branch,
        setBranch,
        setComponents,
        getDataLanaguagesByArray,
        datalanguages,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
