import React from "react";
import { AreaChart } from "@tremor/react";

const Chart = ({ data, name }) => {
  console.log(data);
  const extractCategories = (data, name) => {
    try {
      const categoriesSet = new Set();
      data.forEach((item) => {
        Object.keys(item).forEach((key) => {
          if (key !== name && typeof item[key] === "number") {
            categoriesSet.add(key);
          }
        });
      });
      return Array.from(categoriesSet);
    } catch (error) {
      return null;
    }
  };

  const categories = extractCategories(data, name);

  console.log("Categories:", categories); // Log categories to debug
  console.log("Data:", data); // Log data to debug

  return (
    <AreaChart
      className="h-80"
      data={data}
      index={name}
      categories={categories}
      colors={[
        "blue-700",
        "fuchsia-700",
        "yellow",
        "red",
        "pink",
        "blue",
        "green",
        "orange",
        "fuchsia",
        "teal",
        "lime",
        "purple",
      ]}
      yAxisWidth={30}
      yAxisLabel="KB"
      style={{
        marginLeft: "4px",
      }}
    />
  );
};

export default Chart;
