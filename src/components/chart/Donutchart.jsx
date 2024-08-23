import { DonutChart } from "@tremor/react";

/**
 * Formatea un número para mostrar como porcentaje.
 * @param {number} number - El número a formatear.
 * @param {number} totalValue - El valor total para calcular el porcentaje.
 * @returns {string} - El porcentaje formateado como cadena.
 */
const dataFormatter = (number, totalValue) =>
  totalValue === 0 ? "0.00 %" : `${((number / totalValue) * 100).toFixed(2)} %`;

/**
 * Componente DonutChartHero para mostrar un gráfico de dona.
 * @param {Object} props - Las propiedades del componente.
 * @param {string} props.title - El título del gráfico.
 * @param {Array} [props.data=[]] - Los datos para el gráfico.
 * @returns {JSX.Element|null} - El componente DonutChartHero.
 */
export const DonutChartHero = ({ title, data = [] }) => {
  if (!Array.isArray(data)) {
    console.error("Data prop is not an array:", data);
    return null;
  }
  if (typeof title !== "string") {
    console.error("Title prop is not a string:", title);
    return null; // O renderiza un valor predeterminado
  }

  const totalValue = data.reduce((sum, entry) => sum + (entry.value || 0), 0);

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

  return (
    <div className="flex mx-auto space-y-12 box-row max-w-96">
      <div className="space-y-0 mr-3">
        <span className="text-center block font-mono text-tremor-default text-tremor-content dark:text-dark-tremor-content title-chart">
          {title}
        </span>
        <div className="flex justify-center">
          <DonutChart
            data={data}
            variant="pie"
            valueFormatter={(value) => dataFormatter(value, totalValue)}
            onValueChange={(v) => console.log(v)}
            colors={colors}
            label={({ value }) => dataFormatter(value, totalValue)}
          />
        </div>
        <div className="labels-info" style={{ padding: "0px" }}>
          <ul
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "5px",
              padding: 0,
              margin: 0,
              listStyleType: "none",
            }}
          >
            {data.length > 0 ? (
              data.map((hero, index) => (
                <li
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      backgroundColor: colors[index % colors.length],
                      marginRight: "8px",
                    }}
                  />
                  <span>
                    {typeof hero.name === "string"
                      ? hero.name === "GraphQL"
                        ? `${hero.name} ${
                            typeof hero.value === "number"
                              ? hero.value.toFixed(2)
                              : ""
                          }`
                        : hero.name
                      : "Invalid name"}
                  </span>
                </li>
              ))
            ) : (
              <li>No data available</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
