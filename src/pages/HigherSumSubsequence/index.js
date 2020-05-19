import React, { useState } from "react";

import Header from "../../components/Header";
import Input from "../../components/Input";
import Button from "../../components/Button";

import "./styles.css";

export default function HigherSumSubsequence() {
  const [array, setArray] = useState("");
  const [showResult, setShowResult] = useState("on");
  const [result, setResult] = useState("");

  function handleSubmit() {
    let v = array.split(",");

    v = v.filter((item) => item !== "");

    v = v.map((item) => parseInt(item));

    console.log(v);
    setShowResult("");
  }

  function setArrayValue(value) {
    const regex = /^[0-9\-\,\s]+$/;

    if (value === "" || regex.test(value)) {
      setArray(value);
    }
  }

  return (
    <>
      <Header tabThree="on" />
      <div className="coin-container">
        <div className="content">
          <Input
            value={array}
            onAction={setArrayValue}
            name="Vetor (V)"
            placeholder="Digite os valores separados por vírgula - Ex: -2, -3, 4, -1"
          />
          <Button onAction={() => handleSubmit()} />
          <div className={`results ${showResult}`}>
            <span>Maior soma de subsequência contínua de V: {result}</span>
          </div>
        </div>
      </div>
    </>
  );
}
