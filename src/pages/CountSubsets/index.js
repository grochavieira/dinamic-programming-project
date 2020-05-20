import React, { useState } from "react";

import Header from "../../components/Header";
import Input from "../../components/Input";
import Button from "../../components/Button";

import "./styles.css";

export default function CountSubsets() {
  const [value, setValue] = useState("");
  const [array, setArray] = useState("");
  const [showResult, setShowResult] = useState("on");
  const [result, setResult] = useState("");

  function handleSubmit() {
    let arr = array.split(",");
    let x = parseInt(value);

    arr = arr.filter((item) => item !== "");

    arr = arr.map((item) => parseInt(item));

    if (arr.length > 0 && !isNaN(x)) {
      setResult(countSumSubsets(arr, x));
      setShowResult("");
    } else {
      alert("Por favor, preencha os campos!");
    }
  }

  function countSumSubsets(arr, x) {
    let matrix = [];

    for (let i = 0; i <= arr.length; i++) {
      matrix[i] = [];
      for (let j = 0; j <= x; j++) {
        if (j === 0) {
          matrix[i][j] = 1;
        } else {
          matrix[i][j] = 0;
        }
      }
    }

    for (let i = 1; i <= arr.length; i++) {
      for (let j = 1; j <= x; j++) {
        if (j - arr[i - 1] >= 0) {
          matrix[i][j] += matrix[i - 1][j - arr[i - 1]] + matrix[i - 1][j];
        } else {
          matrix[i][j] = matrix[i - 1][j];
        }
      }
    }

    return matrix[arr.length][x];
  }

  function setXValue(value) {
    setShowResult("on");
    const regex = /^[0-9\b]+$/;

    if (value === "" || regex.test(value)) {
      setValue(value);
    }
  }

  function setArrayValue(value) {
    setShowResult("on");
    const regex = /^[0-9\,\s]+$/;

    if (value === "" || regex.test(value)) {
      setArray(value);
    }
  }

  return (
    <>
      <Header tabTwo="on" />
      <div className="coin-container">
        <div className="content">
          <Input
            value={value}
            onAction={setXValue}
            name="Valor (X)"
            placeholder="Ex: 5"
          />
          <Input
            value={array}
            onAction={setArrayValue}
            name="Vetor (arr)"
            placeholder="Digite os valores separados por vírgula - Ex: 1, 2, 3, 4"
          />
          <Button onAction={() => handleSubmit()} />
          <div className={`results ${showResult}`}>
            <span>Número de subconjuntos que formam X: {result}</span>
          </div>
        </div>
      </div>
    </>
  );
}
