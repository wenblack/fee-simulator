"use client";
import { ChartCard } from "@/components/ChartCard";
import { useEffect, useState } from "react";

export default function Home() {
  const [income, setIncome] = useState(0);
  const [total, setTotal] = useState(0);
  const [fee, setFee] = useState(0);
  const [startIncome, setStartIncome] = useState(0);
  const [monthIncome, setMonthIncome] = useState(0);
  const [feeTaxes, setFeeTaxes] = useState(0);
  const [months, setMonths] = useState(0);
  const [reloadPage, setItReloadPage] = useState(false);
  const [monthMultiplier, setMonthMultiplier] = useState(0);

  function calcularJurosCompostos(
    aporteInicial: number,
    aporteMensal: number,
    taxaJurosMensal: number,
    tempoMeses: number,
    multiplier: number
  ) {
    if (
      multiplier === 0 ||
      aporteInicial === 0 ||
      taxaJurosMensal === 0 ||
      tempoMeses === 0 ||
      aporteMensal === 0
    ) {
      alert("Por favor preencha todos os campos");
      return;
    }
    tempoMeses = tempoMeses * multiplier;
    let taxaDecimal = Number(taxaJurosMensal / 100);
    let montanteFinal = Number(
      aporteInicial * Math.pow(1 + taxaDecimal, tempoMeses)
    );
    montanteFinal +=
      aporteMensal *
      ((Math.pow(1 + taxaDecimal, tempoMeses) - 1) / taxaDecimal);
    montanteFinal = (montanteFinal * 100) / 100;
    let investido = Number(aporteInicial + aporteMensal * (tempoMeses - 1));

    setFee(montanteFinal - investido);
    setIncome(investido);
    setTotal(montanteFinal);
    setItReloadPage(true);

    console.log(`Resultado:
    Total investido: R$ ${Number(investido).toFixed(2)}
    Total de Juros : R$ ${Number(montanteFinal - investido).toFixed(2)}
    Total ganho: R$ ${Number(montanteFinal).toFixed(2)} 
    `);
  }

  useEffect(() => {}, [reloadPage]);

  return (
    <main>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          calcularJurosCompostos(
            startIncome,
            monthIncome,
            feeTaxes,
            months,
            monthMultiplier
          );
        }}
      >
        <fieldset>
          <legend>Simulador de Juros Compostos</legend>
          <label htmlFor="start value">Valor inicial</label>
          <input
            type="number"
            name="start value"
            id="start value"
            placeholder="0,00"
            onChange={(e) => {
              setStartIncome(Number(e.target.value));
            }}
          />
          <label htmlFor="month value">Valor mensal</label>
          <input
            type="number"
            name="month value"
            id="month value"
            placeholder="0,00"
            onChange={(e) => {
              setMonthIncome(Number(e.target.value));
            }}
          />
          <label htmlFor="fee">Taxa de juros</label>
          <input
            type="number"
            name="fee"
            id="fee"
            placeholder="0,00"
            onChange={(e) => {
              setFeeTaxes(Number(e.target.value));
            }}
          />
          <label htmlFor="time">Período em:</label>
          <input
            type="number"
            name="time"
            id="time"
            placeholder="0"
            onChange={(e) => {
              setMonths(Number(e.target.value));
            }}
          />
          <select
            name=""
            id=""
            onChange={(e) => {
              setMonthMultiplier(Number(e.target.value));
            }}
          >
            <option label="Selecione" value={undefined} defaultChecked />
            <option value="1" label="meses"></option>
            <option value="12" label="anos"></option>
          </select>
        </fieldset>
        <input type="submit" value="Calcular" />
      </form>

      <ChartCard
        name="CDB Inter"
        investido={income}
        totalGeral={total}
        totalJuros={fee}
      />
    </main>
  );
}
