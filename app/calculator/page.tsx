"use client";

import { useEffect, useReducer } from "react";
import styles from "./calculator.module.css";
import { checkLogin } from "@/utils/login";
import { useRouter } from "next/dist/client/components/navigation";

type CalculatorState = {
  display: string;
  history: string;
  first: number;
  second: number;
  operator: "+" | "-" | "?";
  inputState: "first" | "operator" | "second";
};

type Action =
  | { type: "number"; value: number }
  | { type: "operator"; value: "+" | "-" }
  | { type: "equal" }
  | { type: "clear" };

const initialState: CalculatorState = {
  display: "0",
  history: "",
  first: 0,
  second: 0,
  operator: "?",
  inputState: "first",
};

function calculate(state: CalculatorState): CalculatorState {
  let second = state.second;

  if (state.inputState === "operator") {
    second = state.first;
  } else if (state.inputState === "second") {
    second = Number(state.display);
  } else if (state.operator !== "+" && state.operator !== "-") {
    return state;
  }

  const first =
    state.operator === "+"
      ? state.first + second
      : state.operator === "-"
        ? state.first - second
        : state.first;

  return {
    ...state,
    first,
    second,
    history: `${formatDisplay(String(state.first))} ${state.operator} ${formatDisplay(String(second))} =`,
    display: String(first),
    inputState: "first",
  };
}

function reducer(state: CalculatorState, action: Action): CalculatorState {
  switch (action.type) {
    case "clear":
      return initialState;
    case "number":
      if (state.inputState === "operator") {
        return {
          ...state,
          display: String(action.value),
          history: `${formatDisplay(String(state.first))} ${state.operator} ${action.value}`,
          inputState: "second",
        };
      }
      if (state.display.length >= 9) return state;
      const display =
        state.display === "0"
          ? String(action.value)
          : state.display + String(action.value);
      return {
        ...state,
        display,
        history:
          state.inputState === "second"
            ? `${formatDisplay(String(state.first))} ${state.operator} ${formatDisplay(display)}`
            : "",
      };
    case "operator":
      if (state.inputState === "first") {
        return {
          ...state,
          first: Number(state.display),
          operator: action.value,
          history: `${formatDisplay(state.display)} ${action.value}`,
          inputState: "operator",
        };
      }
      if (state.inputState === "operator") {
        return {
          ...state,
          operator: action.value,
          history: `${formatDisplay(String(state.first))} ${action.value}`,
        };
      }
      const result = calculate(state);
      return {
        ...result,
        operator: action.value,
        history: `${formatDisplay(result.display)} ${action.value}`,
        inputState: "operator",
      };
    case "equal":
      return calculate(state);
  }
}

function formatDisplay(value: string): string {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function Calculator() {
  const router = useRouter();
    useEffect(() => checkLogin(router, "/calculator"), [router]);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dispatch({ type: "clear" });
      else if (event.key === "Enter") dispatch({ type: "equal" });
      else if (/^[0-9]$/.test(event.key)) {
        dispatch({ type: "number", value: Number(event.key) });
      } else if (event.key === "-") {
        dispatch({ type: "operator", value: "-" });
      } else if (event.key === "=" || event.key === "+") {
        dispatch({ type: "operator", value: "+" });
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const numberButton = (value: number) => (
    <button
      className={`${styles.button} ${styles.blue}`}
      key={value}
      onClick={() => dispatch({ type: "number", value })}
    >
      {value}
    </button>
  );

  const disabledButton = (
    label: string,
    color: "green" | "blue" = "green",
  ) => (
    <button
      className={`${styles.button} ${styles[color]}`}
      disabled
      key={label}
    >
      {label}
    </button>
  );

  return (
    <div className={styles.calculator}>
      <div className={styles.outer}>
        <div className={styles.inner}>
          <div className={styles.screen} aria-live="polite">
            <div className={styles.history}>{state.history}</div>
            <div className={styles.displayValue}>{formatDisplay(state.display)}</div>
          </div>
          <div className={styles.buttonRow}>
            {["MC", "MR", "M+", "M-"].map((label) =>
              disabledButton(label),
            )}
            <button
              className={`${styles.button} ${styles.red}`}
              onClick={() => dispatch({ type: "clear" })}
            >
              CE
            </button>
          </div>
          <div className={styles.buttonRow}>
            {[7, 8, 9].map(numberButton)}
            {disabledButton("÷")}
            {disabledButton("√")}
          </div>
          <div className={styles.buttonRow}>
            {[4, 5, 6].map(numberButton)}
            {disabledButton("×")}
            {disabledButton("%")}
          </div>
          <div className={styles.buttonRow}>
            {[1, 2, 3].map(numberButton)}
            <button
              className={`${styles.button} ${styles.green}`}
              onClick={() => dispatch({ type: "operator", value: "-" })}
            >
              −
            </button>
            {disabledButton("1/x")}
          </div>
          <div className={styles.buttonRow}>
            {numberButton(0)}
            {disabledButton(".", "blue")}
            {disabledButton("+/−", "blue")}
            <button
              className={`${styles.button} ${styles.green}`}
              onClick={() => dispatch({ type: "operator", value: "+" })}
            >
              +
            </button>
            <button
              className={`${styles.button} ${styles.green}`}
              onClick={() => dispatch({ type: "equal" })}
            >
              =
            </button>
          </div>
        </div>
        <div className={styles.student}>68030206 ธนภูมิ พุฒทอง</div>
      </div>
    </div>
  );
}
