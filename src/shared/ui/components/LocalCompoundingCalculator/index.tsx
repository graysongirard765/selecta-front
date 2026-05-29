'use client';

import { useState } from 'react';

import type { ChangeEvent } from 'react';

import styles from './LocalCompoundingCalculator.module.scss';

type CalculatorInputs = {
  balance: string;
  periods: string;
  gain: string;
};

type CalculationRow = {
  period: number;
  startingBalance: number;
  cumulativeGainPercent: number;
  endingBalance: number;
};

const DEFAULT_VALUES: CalculatorInputs = {
  balance: '20000',
  periods: '12',
  gain: '5',
};

const parsePositiveNumber = (value: string) => {
  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed < 0) {
    return 0;
  }

  return parsed;
};

const parsePeriods = (value: string) => {
  const parsed = Math.floor(Number(value));

  if (!Number.isFinite(parsed) || parsed < 1) {
    return 1;
  }

  return parsed;
};

const formatNumber = (value: number, maximumFractionDigits = 2) =>
  new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: 0,
    maximumFractionDigits,
  }).format(value);

const formatPercent = (value: number, maximumFractionDigits = 2) =>
  `${formatNumber(value, maximumFractionDigits)} %`;

const buildRows = (initialBalance: number, periods: number, gainPercent: number) => {
  const rate = gainPercent / 100;
  const rows: CalculationRow[] = [];
  let startingBalance = initialBalance;

  for (let index = 1; index <= periods; index += 1) {
    const endingBalance = startingBalance * (1 + rate);
    const cumulativeGainPercent =
      initialBalance === 0 ? 0 : ((endingBalance - initialBalance) / initialBalance) * 100;

    rows.push({
      period: index,
      startingBalance,
      cumulativeGainPercent,
      endingBalance,
    });

    startingBalance = endingBalance;
  }

  return rows;
};

export default function LocalCompoundingCalculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_VALUES);
  const [submittedInputs, setSubmittedInputs] = useState<CalculatorInputs>(DEFAULT_VALUES);

  const balance = parsePositiveNumber(submittedInputs.balance);
  const periods = parsePeriods(submittedInputs.periods);
  const gain = parsePositiveNumber(submittedInputs.gain);
  const rows = buildRows(balance, periods, gain);
  const finalBalance = rows.at(-1)?.endingBalance ?? balance;
  const totalGainPercent =
    balance === 0 ? 0 : ((finalBalance - balance) / balance) * 100;

  const handleInputChange =
    (field: keyof CalculatorInputs) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setInputs((current) => ({
        ...current,
        [field]: event.target.value,
      }));
    };

  const handleCalculate = () => {
    setSubmittedInputs(inputs);
  };

  return (
    <div className={styles.calculator}>
      <div className={styles.topPane}>
        <div className={styles.controlsGrid}>
          <label className={styles.field}>
            <span className={styles.label}>Balance inicial</span>
            <input
              className={styles.input}
              type="number"
              inputMode="decimal"
              min="0"
              step="100"
              value={inputs.balance}
              onChange={handleInputChange('balance')}
            />
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Cantidad de periodos</span>
            <input
              className={styles.input}
              type="number"
              inputMode="numeric"
              min="1"
              step="1"
              value={inputs.periods}
              onChange={handleInputChange('periods')}
            />
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Ganancia % por periodo</span>
            <input
              className={styles.input}
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              value={inputs.gain}
              onChange={handleInputChange('gain')}
            />
          </label>
        </div>
      </div>

      <div className={styles.bottomPane}>
        <button type="button" className={styles.button} onClick={handleCalculate}>
          Calcular
        </button>

        <div className={styles.summary}>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Balance final</span>
            <strong className={styles.summaryValue}>{formatNumber(finalBalance)}</strong>
          </div>

          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Ganancias totales</span>
            <strong className={styles.summaryValue}>{formatPercent(totalGainPercent, 1)}</strong>
          </div>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th aria-label="Periodo" />
                <th>Balance inicial</th>
                <th>Ganancias totales</th>
                <th>Balance final</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.period}>
                  <td>{row.period}</td>
                  <td>{formatNumber(row.startingBalance)}</td>
                  <td>{formatPercent(row.cumulativeGainPercent)}</td>
                  <td>{formatNumber(row.endingBalance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
