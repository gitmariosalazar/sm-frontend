import { BarChart } from "@tremor/react";

const chartdata = [
  {
    language: "Python",
    Forks: 890,
    Watches: 338,
    Stars: 538,
  },
  {
    language: "Go",
    Forks: 289,
    Watches: 233,
    Stars: 253,
  },
  {
    language: "Java",
    Forks: 380,
    Watches: 535,
    Stars: 352,
  },
  {
    language: "GraphQL",
    Forks: 90,
    Watches: 98,
    Stars: 28,
  },
  {
    language: "Ruby",
    Forks: 90,
    Watches: 98,
    Stars: 28,
  },
];

const dataFormatter = (number) =>
  Intl.NumberFormat("us").format(number).toString();

export function BarChartWithGroups({ data }) {
  return (
    <>
      <BarChart
        className="mt-6"
        data={data}
        index="language"
        categories={["Forks", "Watches", "Stars"]}
        colors={["blue", "teal", "amber", "rose", "indigo", "emerald"]}
        valueFormatter={dataFormatter}
        yAxisWidth={48}
      />
    </>
  );
}
