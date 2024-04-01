"use client";
import { useEffect } from "react";
import Chart from "react-google-charts";

interface ChartProps {
  investido: number;
  totalJuros: number;
  totalGeral: number;
}

export function ChartCard({ investido, totalGeral, totalJuros }: ChartProps) {
  let data = [
    ["", "Investido", "Juros", "Total"],
    ["2014", investido, totalJuros, totalGeral],
  ];
  const options = {
    chart: {
      title: "Resultado da Simulação",
    },
  };
  function calculate(
    aporteInicial: number,
    aporteMensal: number,
    taxaJurosMensal: number,
    tempoMeses: number
  ) {
    let taxaDecimal = taxaJurosMensal / 100;
    let montanteFinal = aporteInicial * Math.pow(1 + taxaDecimal, tempoMeses);
    montanteFinal +=
      aporteMensal *
      ((Math.pow(1 + taxaDecimal, tempoMeses) - 1) / taxaDecimal);
    montanteFinal = Math.round(montanteFinal * 100) / 100;

    console.log("Montante final após", tempoMeses, " meses:", montanteFinal);
  }
  useEffect(() => {
    calculate(500, 1000, 1, 12);
  }, []);
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
      height="400px"
      data={data}
      options={options}
    />
  );
}
