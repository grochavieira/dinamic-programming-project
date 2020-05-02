import React, { useState } from "react";

import Header from "../../components/Header";

import Input from "../../components/Input";
import Button from "../../components/Button";

import "./styles.css";

export default function CoinChange() {
  const [requestedChange, setRequestedChange] = useState("");
  const [availableCoins, setAvailableCoins] = useState("");
  const [result, setResult] = useState("");
  const [showResult, setShowResult] = useState("on");

  function handleSubmit() {
    // format the output from the user
    let coins = availableCoins.split(",");
    let change = parseInt(requestedChange);

    coins = coins.filter((coin) => coin !== "");

    let res = Number.MAX_VALUE;

    if (!isNaN(change) && change > 0 && coins.length > 0) {
      res = findMinCoins(coins, change);
    }

    if (res !== Number.MAX_VALUE) {
      setResult(res);
      setShowResult("");
    } else {
      setShowResult("on");
      alert("Não foi possível calcular o troco");
    }
  }

  function findMinCoins(coins, change) {
    let savedResults = [];
    for (let i = 0; i <= change; i++) {
      savedResults[i] = undefined;
    }
    savedResults[0] = 1;

    for (let i = 1; i <= change; i++) {
      let copyChange = i;
      let bestCount = Number.MAX_VALUE;
      for (let j = 0; j <= coins.length; j++) {
        let count = 0;
        copyChange = i;
        if (coins[j] <= copyChange) {
          if (copyChange - coins[j] === 0) {
            copyChange = 0;
            count++;
          } else if (savedResults[copyChange - coins[j]] !== undefined) {
            count = savedResults[copyChange - coins[j]] + 1;
          }
          if (bestCount > count) {
            bestCount = count;
          }
        }
      }

      if (bestCount !== 0) {
        savedResults[i] = bestCount;
      }
    }
    return savedResults[change];
  }

  function setChangeValue(value) {
    const regex = /^[0-9\b]+$/;

    if (value === "" || regex.test(value)) {
      setRequestedChange(value);
    }
  }

  function setCoinsValue(value) {
    const regex = /^[0-9\,\s]+$/;

    if (value === "" || regex.test(value)) {
      setAvailableCoins(value);
    }
  }

  return (
    <>
      <Header tabOne="on" />
      <div className="coin-container">
        <div className="content">
          <Input
            value={requestedChange}
            onAction={setChangeValue}
            name="Trocado Requisitado (N)"
            placeholder="Ex: 62"
          />
          <Input
            value={availableCoins}
            onAction={setCoinsValue}
            name="Moedas Disponíveis (S)"
            placeholder="Digite os valores separados por vírgula - Ex: 25, 16, 15, 4, 3, 1"
          />
          <Button onAction={() => handleSubmit()} />
          <div className={`results ${showResult}`}>
            <span>Número mínimo de moedas: </span>
            <span>{result}</span>
          </div>
        </div>
      </div>
    </>
  );
}
