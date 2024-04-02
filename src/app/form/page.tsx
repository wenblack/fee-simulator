"use client";
import React, { useState } from "react";

function CompoundInterestCalculator() {
  const [initialInvestment, setInitialInvestment] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [time, setTime] = useState("");
  const [finalAmount, setFinalAmount] = useState("");

  const calculateCompoundInterest = () => {
    const principal = parseFloat(initialInvestment);
    const contribution = parseFloat(monthlyContribution);
    const rate = parseFloat(interestRate) / 100;
    const months = parseFloat(time);

    const finalAmount =
      principal * Math.pow(1 + rate, months) +
      contribution * ((Math.pow(1 + rate, months) - 1) / rate);

    setFinalAmount(finalAmount.toFixed(2));
  };

  return (
    <div>
      <h1>Compound Interest Calculator</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          calculateCompoundInterest();
        }}
      >
        <label>
          Initial Investment:
          <input
            type="number"
            value={initialInvestment}
            onChange={(e) => setInitialInvestment(e.target.value)}
          />
        </label>
        <br />
        <label>
          Monthly Contribution:
          <input
            type="number"
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(e.target.value)}
          />
        </label>
        <br />
        <label>
          Interest Rate (in percentage):
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
          />
        </label>
        <br />
        <label>
          Time (in months):
          <input
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Calculate</button>
      </form>
      {finalAmount && (
        <p>
          Final Amount after {time} months: {finalAmount}
        </p>
      )}
    </div>
  );
}

export default CompoundInterestCalculator;
