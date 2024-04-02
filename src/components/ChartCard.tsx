import Chart from "react-google-charts";

interface ChartProps {
  investido: number;
  totalJuros: number;
  totalGeral: number;
}

const BRL = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});
export function ChartCard({ investido, totalGeral, totalJuros }: ChartProps) {
  let data = [
    ["", "Juros", "Investido", "Geral"],
    [
      " ",
      BRL.format(totalJuros),
      BRL.format(investido),
      BRL.format(totalGeral),
    ],
  ];
  const options = {
    chart: {
      title: "Resultado da Simulação",
      legend: { position: "none" },
    },
  };
  if (
    totalGeral === undefined ||
    totalJuros === undefined ||
    investido === undefined
  ) {
    return <h1></h1>;
  }
  return (
    <Chart
      chartType="Bar"
      width="100%"
      className="font-medium"
      height="300px"
      data={data}
      options={options}
    />
  );
}
