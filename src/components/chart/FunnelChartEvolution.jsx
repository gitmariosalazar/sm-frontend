"use client";

import { FunnelChart } from "@tremor/react";

const chartdata = [
  {
    name: "Python",
    value: 890 + 338 + 538,
  },
  {
    name: "Go",
    value: 289 + 233 + 253,
  },
  {
    name: "Java",
    value: 380 + 535 + 352,
  },
  {
    name: "GraphQL",
    value: 90 + 98 + 28,
  },
  {
    name: "Ruby",
    value: 90 + 98 + 28,
  },
];

export function FunnelChartEvolution({ data }) {
  return (
    <FunnelChart
      evolutionGradient
      gradient={false}
      className="h-80"
      data={data}
      showArrow={false}
    />
  );
}
