import { Card, ScatterChart } from "@tremor/react";

const colors = [
  "pink",
  "blue",
  "yellow",
  "red",
  "green",
  "orange",
  "fuchsia",
  "teal",
  "lime",
  "purple",
];
export function Scatterchart({ data }) {
  return (
    <Card>
      <ScatterChart
        className="-ml-2 mt-6 h-64"
        yAxisWidth={50}
        data={data}
        category="language"
        x="Forks"
        y="Watches"
        size="Stars"
        colors={colors}
        showOpacity={true}
        minYValue={0}
        valueFormatter={{
          x: (amount) => `${amount} Forks`,
          y: (watchers) => `${watchers} Watches`,
          size: (stars) => `${stars} Stars`,
        }}
      />
    </Card>
  );
}
