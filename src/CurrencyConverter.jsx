import { useState, useMemo, useEffect } from "react";
import "./CurrencyConverter.css";
import { baseUrl } from "./api/baseUrl";

function CurrencyConverter() {
  const [amount, setAmount] = useState(1);
  const [startCurrency, setStartCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("EUR");
  const [rates, setRates] = useState({});

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(baseUrl);
      const data = await response.json();
      console.log(typeof data.conversion_rates);
      setRates(data.conversion_rates);

    };
    getData();
  }, []);

  const amountInUSD = useMemo(() => {
    return Number(amount) / rates[startCurrency];
  }, [amount, startCurrency]);

  const converted = amountInUSD * rates[targetCurrency];

  return (
    <div className="page-center">
      <div className="converter">
        <h1>Currency Converter</h1>

        <span className="conversion-label">
          {startCurrency} → {targetCurrency}
        </span>

        <div className="field">
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="field">
          <label>Start Currency</label>
          <select
            value={startCurrency}
            onChange={(e) => setStartCurrency(e.target.value)}
          >
            {Object.keys(rates).map((cur) => (
              <option key={cur} value={cur}>
                {cur}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label>Target Currency</label>
          <select
            value={targetCurrency}
            onChange={(e) => setTargetCurrency(e.target.value)}
          >
            {Object.keys(rates).map((cur) => (
              <option key={cur} value={cur}>
                {cur}
              </option>
            ))}
          </select>
        </div>

        <div className="result">
          {converted.toFixed(2)} {targetCurrency}
        </div>
      </div>
    </div>
  );
}

export default CurrencyConverter;
