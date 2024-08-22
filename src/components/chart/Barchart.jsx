import React from "react";
import { BarChart } from "@tremor/react";

export const BarChartWithGroups = ({ data = [] }) => {
  console.log(data);

  const dataFormatter = (number) =>
    Intl.NumberFormat("us").format(number).toString();

  // Colores asignados por índice
  const getColor = (index) => {
    const colors = [
      "lime",
      "purple",
      "pink",
      "blue",
      "yellow",
      "red",
      "green",
      "orange",
      "fuchsia",
      "teal",
    ];
    return colors[index % colors.length];
  };
  const formattedData = data.map((item, index) => ({
    ...item,
    color: getColor(index),
  }));

  return (
    <BarChart
      data={formattedData}
      index="language"
      categories={["Size (KB)"]}
      colors={formattedData.map((d) => d.color)}
      valueFormatter={dataFormatter}
      yAxisWidth={48}
      onValueChange={(v) => console.log(v)}
    />
  );
};
