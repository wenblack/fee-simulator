import Chart from "react-google-charts";

interface ChartProps {
  investido: number;
  totalJuros: number;
  totalGeral: number;
  desconto?: any;
}

const BRL = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});
export function ChartCard({
  investido,
  totalGeral,
  totalJuros,
  desconto,
}: ChartProps) {
  let data = [
    ["", "Descontos", "Juros", "Investido", "Geral"],
    [
      " ",
      BRL.format(desconto),
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
  if (totalGeral === 0 || totalJuros === 0 || investido === 0) {
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
