import React, { useEffect } from "react";
import "./Details.css";
import { GridView } from "@mui/icons-material";
import { Link } from "react-router-dom";

import Chart from "../../components/chart/Chart";
import { DonutChartHero } from "../../components/chart/Donutchart";
import { Scatterchart } from "../../components/chart/Scatterchart";
import { BarChartWithGroups } from "../../components/chart/Barchart";
import { BarChartColor } from "../../components/chart/BarChartColor";
import { menuicons } from "../../assets/assets";
import { getDateFormat } from "../../utils/functions";
import Code from "../../components/Code/Code";
import { useAuth } from "../../context/useAuth";
import Empty from "../../components/empty/Empty";

const Details = () => {
  const {
    language,
    components,
    searchComponets,
    branch,
    setBranch,
    setComponents,
  } = useAuth();
  const repos = language;

  if (!language) {
    return (
      <div className="not-found">
        <Empty title={"No selected language"} />
        <div className="box-column-btn">
          <div className="buttons">
            <Link to="/graphqlexplorer" className="btn-new-token-t">
              <GridView
                style={{ width: "17px", height: "17px" }}
                className="icon-key"
              />
              Get Language
            </Link>
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    setBranch("No selected");
    setComponents({
      response: {
        schema: {
          info: "Components not found to this project!",
        },
      },
    });
  }, [setBranch, setComponents]);

  const handleViewComponents = async (owner, repo, branch) => {
    try {
      console.log(owner, repo, branch);
      await searchComponets(owner, repo, branch);
      vc.branch = branch;
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const dataLanguages = repos.languages.edges
    .map((lang) => ({
      name: lang.node.name,
      value: lang.size,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 3);

  const dataLanguagesChart = repos.languages.edges.map((lang) => ({
    language: lang.node.name,
    "Size (KB)": parseFloat((lang.size / 1024).toFixed(2)),
  }));

  const datahero = [
    { name: "Forks", value: repos.forkCount },
    { name: "Stars", value: repos.stargazerCount },
    { name: "Watches", value: repos.watchers.totalCount },
  ];

  const json_data = components;

  const jsonString = JSON.stringify(json_data, null, 2);

  console.log("Componets: ", repos);

  return (
    <div className="home">
      <div className="home-box-container">
        <div className="title">
          <h1>Project Details</h1>
        </div>
        <div className="details">
          <div className="details-lefth">
            <div className="analytics">
              <div className="box-main">
                <div className="details-info">
                  <div className="detail-header">
                    <div className="det-cont">
                      <div className="date-created">
                        <p>Create Date: {getDateFormat(repos.createdAt)}</p>
                      </div>
                      <div className="det-title">
                        <h4>Project Name</h4>
                        <h3>
                          {repos.name} - {repos.nameWithOwner}
                        </h3>
                        <h4>Description</h4>
                        <p>{repos.description}</p>
                        <h4>Project Link</h4>
                        <a href={repos.url} target="_blank">
                          {repos.url}
                        </a>
                        <h4>License Info</h4>
                        <p>{repos.licenseInfo.name}</p>
                      </div>
                    </div>
                    <div className="det-cont-right">
                      <div>
                        <div className="det-cont-r">
                          <div className="box-count-explorer">
                            <div className="box-img">
                              <img
                                src={menuicons.branch}
                                alt=""
                                className="icon-menu"
                              />
                              <p>Selected Branch</p>
                            </div>
                            <p className="value-counts">{branch}</p>
                          </div>
                          <div className="box-count-explorer">
                            <div className="box-img">
                              <img
                                src={menuicons.code}
                                alt=""
                                className="icon-menu"
                              />
                              <p>Primary Language</p>
                            </div>
                            <p className="value-counts">
                              {repos.primaryLanguage.name}
                            </p>
                          </div>
                        </div>
                        <div className="code-box">
                          <h2>Components GraphQL Found</h2>
                          <Code code={jsonString} language="javascript" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="box-table">
                    <div className="det-title">
                      <h3>Branchs</h3>
                      <hr />
                    </div>
                    <div className="table-header">
                      <div className="box-column">Owner</div>
                      <div className="box-column">Repository</div>
                      <div className="box-column">Branch</div>
                      <div className="box-column">Option</div>
                    </div>
                    {repos.branches.nodes ? (
                      <>
                        {repos.branches.nodes.map((branch, index) => (
                          <div className="box-row-details" key={index}>
                            <div className="box-column">
                              {branch.target.author.name}
                            </div>
                            <div className="box-column text-container">
                              {branch.target.author.email}
                            </div>
                            <div className="box-column text-container">
                              {branch.name}
                            </div>
                            <div className="box-column-btn">
                              <div className="buttons">
                                <Link
                                  to="/details"
                                  className="btn-new-token-t"
                                  onClick={() => {
                                    handleViewComponents(
                                      branch.target.author.name,
                                      repos.name,
                                      branch.name
                                    );
                                  }}
                                >
                                  <GridView
                                    style={{ width: "17px", height: "17px" }}
                                    className="icon-key"
                                  />
                                  Components
                                </Link>
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <Empty
                        title={
                          " This project haven't Branchs yet language name"
                        }
                      />
                    )}
                  </div>
                </div>
                <div className="dashboards">
                  <div className="pie-chart">
                    <div className="charts">
                      <DonutChartHero
                        title={repos.primaryLanguage.name}
                        data={datahero}
                      />
                      <DonutChartHero title="Languages" data={dataLanguages} />
                    </div>
                  </div>
                  <div className="graphics-d">
                    <div className="graphics-container">
                      <div className="db db1">
                        <Chart data={dataLanguagesChart} name={"language"} />
                      </div>
                      <div className="db">
                        <BarChartWithGroups data={dataLanguagesChart} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
