"use client";
import { ChartCard } from "@/components/ChartCard";
import { useEffect, useState } from "react";

export default function Home() {
  const [income, setIncome] = useState(0);
  const [total, setTotal] = useState(0);
  const [fee, setFee] = useState(0);

  function calcularJurosCompostos(
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
    montanteFinal = (montanteFinal * 100) / 100;
    let investido = aporteInicial + aporteMensal * (tempoMeses - 1);

    setFee(montanteFinal - investido);
    setIncome(investido);
    setTotal(montanteFinal);

    console.log(`Resultado:
    Total investido: R$ ${Number(investido).toFixed(2)}
    Total de Juros : R$ ${Number(montanteFinal - investido).toFixed(2)}
    Total ganho: R$ ${Number(montanteFinal).toFixed(2)} 
    `);
  }

  useEffect(() => {
    calcularJurosCompostos(1000, 100, 1, 12);
  }, []);

  return (
    <ChartCard
      name="CDB Inter"
      investido={income}
      totalGeral={total}
      totalJuros={fee}
    />
  );
}
