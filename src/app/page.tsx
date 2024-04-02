"use client";
import { ChartCard } from "@/components/ChartCard";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

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
      MySwal.fire({
        title: <p>Por favor , preencha todos os campos</p>,
        icon: "warning",
        showConfirmButton: false,
      });
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
        className="max-w-4xl mx-auto mt-5 p-6 bg-white rounded-md shadow-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          Simulador de Investimentos
        </h1>
        <div className="grid sm:grid-cols-2 gap-8">
          <div>
            <label
              htmlFor="initial-investment"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Aporte Inicial:
            </label>
            <input
              id="initial-investment"
              aria-label="Initial Investment"
              aria-describedby="initial-investment-help"
              className="shadow-md hover:ring-2  w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              type="number"
              min={100}
              placeholder="0,00"
              onChange={(e) => {
                setStartIncome(Number(e.target.value));
              }}
            />
          </div>
          <div>
            <label
              htmlFor="monthly-contribution"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Aporte Mensal:
            </label>
            <input
              id="monthly-contribution"
              aria-label="Monthly Contribution"
              aria-describedby="monthly-contribution-help"
              className="shadow-md hover:ring-2  w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              type="number"
              min={100}
              placeholder="0,00"
              onChange={(e) => {
                setMonthIncome(Number(e.target.value));
              }}
            />
          </div>
          <div>
            <label
              htmlFor="interest-rate"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Taxa de Juros:
            </label>
            <input
              id="interest-rate"
              aria-label="Interest Rate"
              aria-describedby="interest-rate-help"
              className="shadow-md hover:ring-2  w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              type="number"
              placeholder="0,00"
              onChange={(e) => {
                setFeeTaxes(Number(e.target.value));
              }}
            />
          </div>
          <div>
            <label
              htmlFor="time"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Período:
            </label>
            <span className="flex">
              <input
                id="time"
                aria-label="Time"
                aria-describedby="time-help"
                className="w-full shadow-md hover:ring-2  px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                type="number"
                min={1}
                placeholder="0"
                onChange={(e) => {
                  setMonths(Number(e.target.value));
                }}
              />
              <select
                className="w-full shadow-md hover:ring-2  py-2 pl-3 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                onChange={(e) => {
                  setMonthMultiplier(Number(e.target.value));
                }}
                name=""
                id=""
              >
                <option label="Selecione" value={undefined} defaultChecked />
                <option value="1" label="Meses"></option>
                <option value="12" label="Anos"></option>
              </select>
            </span>
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 focus:ring-1 ring-blue-800 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Calcular
        </button>
      </form>
      <section className="max-w-4xl mx-auto p-6">
        <ChartCard investido={income} totalGeral={total} totalJuros={fee} />
      </section>
    </main>
  );
}
