import React, { useState } from "react";

import Header from "../../components/Header";
import Input from "../../components/Input";
import Button from "../../components/Button";

import "./styles.css";

export default function Fibonacci() {
  const [value, setValue] = useState("");
  const [showResult, setShowResult] = useState("on");
  const [result, setResult] = useState("");

  function handleSubmit() {
    let x = parseInt(value);

    setResult(findFibonacci(x));
    setShowResult("");
  }

  function findFibonacci(x) {
    let array = [];
    array[0] = 0;
    array[1] = 1;

    for (let i = 2; i <= x; i++) {
      array[i] = array[i - 1] + array[i - 2];
    }

    return array[x];
  }

  function setXValue(value) {
    setShowResult("on");
    const regex = /^[0-9\b]+$/;

    if (value === "" || regex.test(value)) {
      setValue(value);
    }
  }

  return (
    <>
      <Header tabThree="on" />
      <div className="coin-container">
        <div className="content">
          <Input
            value={value}
            onAction={setXValue}
            name="Termo (I)"
            placeholder="Digite aqui o termo de fibonacci a ser encontrado..."
          />
          <Button onAction={() => handleSubmit()} />
          <div className={`results ${showResult}`}>
            <span>
              Fibonacci({value}) = {result}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
