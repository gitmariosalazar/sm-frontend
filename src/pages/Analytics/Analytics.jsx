import React, { useEffect, useState } from "react";
import Chart from "../../components/chart/Chart";
import { DonutChartHero } from "../../components/chart/Donutchart";
import { Scatterchart } from "../../components/chart/Scatterchart";
import { BarChartColor } from "../../components/chart/BarChartColor";
import "./Analytics.css";
import { BarChartWithGroups } from "../../components/chart/BarChartWithGroups";
import { FunnelChartEvolution } from "../../components/chart/FunnelChartEvolution";
import { useAuth } from "../../context/useAuth";
import { transformData, transformDataFunnet } from "../../utils/functions";
import Empty from "../../components/empty/Empty";
import { Link } from "react-router-dom";
import { Token } from "@mui/icons-material";

const Analytics = () => {
  const { getDataLanaguagesByArray, datalanguages, isAuthenticated } =
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
  const [languages, setSelectedValues] = useState(["GraphQL", ["R"]]);

  // Maneja el cambio en el checkbox
  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    const label = event.target.nextElementSibling.innerText; // Obtener el texto de la etiqueta

    if (checked) {
      setSelectedValues((prevSelectedValues) => [...prevSelectedValues, label]);
    } else {
      setSelectedValues((prevSelectedValues) =>
        prevSelectedValues.filter((value) => value !== label)
      );
    }
  };

  useEffect(() => {
    getDataLanaguagesByArray(languages);
  }, [languages]);

  const handleGetDataLanguages = async (languages) => {
    try {
      await getDataLanaguagesByArray(languages);
    } catch (error) {
      console.log("Error get... ", error);
    }
  };
  const datahero = datalanguages;
  const chartdata = transformData(datahero);
  const datafunnet = transformDataFunnet(chartdata);
  return (
    <div className="analytics">
      <div className="select-options">
        <div className="title-analitycs">
          GraphQL language is default selected
        </div>
        <div className="options">
          <div className="filter-actions">
            <div className="flex items-center mb-4">
              <input
                id="ts"
                type="checkbox"
                value="TypeScript"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={handleCheckboxChange}
                checked={languages.includes("TypeScript")}
              />
              <label
                htmlFor="ts"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                TypeScript
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                id="python"
                type="checkbox"
                value="Python"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={handleCheckboxChange}
                checked={languages.includes("Python")}
              />
              <label
                htmlFor="python"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Python
              </label>
            </div>{" "}
            <div className="flex items-center mb-4">
              <input
                id="java"
                type="checkbox"
                value="Java"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={handleCheckboxChange}
                checked={languages.includes("Java")}
              />
              <label
                htmlFor="java"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Java
              </label>
            </div>{" "}
            <div className="flex items-center mb-4">
              <input
                id="c"
                type="checkbox"
                value="C++"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={handleCheckboxChange}
                checked={languages.includes("C++")}
              />
              <label
                htmlFor="c"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                C++
              </label>
            </div>{" "}
            <div className="flex items-center mb-4">
              <input
                id="go"
                type="checkbox"
                value="Go (Golang)"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={handleCheckboxChange}
                checked={languages.includes("Go (Golang)")}
              />
              <label
                htmlFor="go"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                {"Go (Golang)"}
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                id="ruby"
                type="checkbox"
                value="Ruby"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={handleCheckboxChange}
                checked={languages.includes("Ruby")}
              />
              <label
                htmlFor="ruby"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Ruby
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                id="js"
                type="checkbox"
                value="Java Script"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={handleCheckboxChange}
                checked={languages.includes("Java Script")}
              />
              <label
                htmlFor="js"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Java Script
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                id="ccat"
                type="checkbox"
                value="C#"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={handleCheckboxChange}
                checked={languages.includes("C#")}
              />
              <label
                htmlFor="ccat"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                C#
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                id="perl"
                type="checkbox"
                value="Perl"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={handleCheckboxChange}
                checked={languages.includes("Perl")}
              />
              <label
                htmlFor="perl"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Perl
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="box-main">
        <div className="dashboards">
          <div className="pie-chart">
            <div className="charts">
              {datahero ? (
                <>
                  {datahero.map((res, index) => (
                    <DonutChartHero
                      data={res.data}
                      title={res.language}
                      key={index}
                    />
                  ))}
                </>
              ) : (
                <>Not Data</>
              )}
            </div>
          </div>
          <div className="graphics-d">
            <div className="graphics-container">
              <div className="db db1">
                {chartdata ? (
                  <Chart data={chartdata} name={"language"} />
                ) : (
                  <></>
                )}
              </div>
              <div className="db">
                {chartdata ? <Scatterchart data={chartdata} /> : <></>}
              </div>
            </div>
          </div>
          <div className="graphics-d">
            <div className="graphics-container">
              <div className="db db1">
                {datafunnet ? (
                  <FunnelChartEvolution data={datafunnet} />
                ) : (
                  <></>
                )}
              </div>
              <div className="db db1">
                <BarChartWithGroups data={chartdata} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
