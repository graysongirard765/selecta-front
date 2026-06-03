"use client";

import { type ReactNode,useId, useMemo, useState } from "react";

import { useTranslations } from "next-intl";

import styles from "./ToolsSection.module.scss";

type AccountType = "standard" | "mini" | "micro";
type Instrument = "EUR/USD" | "GBP/USD" | "USD/JPY" | "XAU/USD";

type CalculatorCardProps = {
  badge: string;
  category: string;
  title: string;
  description: string;
  accent: "green" | "orange";
  inputs: ReactNode;
  result: ReactNode;
};

type FieldRowProps = {
  label: string;
  field: ReactNode;
};

type SelectFieldProps = {
  id: string;
  value: string;
  options: readonly { value: string; label: string }[];
  onChange: (value: string) => void;
};

type NumberFieldProps = {
  id: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  onChange: (value: number) => void;
};

const numberFormatter = new Intl.NumberFormat("es-ES");

const formatInteger = (value: number) => numberFormatter.format(Math.round(value));

const formatDecimal = (value: number, digits = 2) =>
  new Intl.NumberFormat("es-ES", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);

const formatCurrency = (value: number, digits = 0) =>
  `€ ${digits === 0 ? formatInteger(value) : formatDecimal(value, digits)}`;

const formatSignedCurrency = (value: number, digits = 0) =>
  `${value >= 0 ? "+" : "-"}${formatCurrency(Math.abs(value), digits)}`;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const SelectField = ({
  id,
  value,
  options,
  onChange,
}: SelectFieldProps) => (
  <label className={styles.fieldControl} htmlFor={id}>
    <span className={styles.fieldContent}>
      <select
        id={id}
        value={value}
        className={styles.select}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </span>
  </label>
);

const NumberField = ({
  id,
  value,
  min,
  max,
  step = 1,
  prefix,
  suffix,
  decimals = 0,
  onChange,
}: NumberFieldProps) => {
  const [draft, setDraft] = useState<string | null>(null);

  const formattedValue = String(Number(value.toFixed(decimals))).replace(".", ",");
  const displayValue = draft ?? formattedValue;
  const inputWidth = `${Math.max(displayValue.length, 2)}ch`;

  const handleChange = (raw: string) => {
    setDraft(raw);

    const normalized = raw.replace(",", ".");
    if (normalized === "" || normalized === "-" || normalized === ".") {
      return;
    }

    const parsed = Number(normalized);
    if (!Number.isNaN(parsed)) {
      onChange(parsed);
    }
  };

  const handleBlur = () => {
    if (draft !== null) {
      const normalized = draft.replace(",", ".");
      const parsed = Number(normalized);
      if (normalized === "" || Number.isNaN(parsed)) {
        onChange(min ?? 0);
      }
    }
    setDraft(null);
  };

  return (
    <label className={styles.fieldControl} htmlFor={id}>
      <span className={styles.fieldContent}>
        {prefix ? <span className={styles.fieldPrefix}>{prefix}</span> : null}
        <input
          id={id}
          type="text"
          inputMode="decimal"
          className={styles.numberInput}
          style={{ width: inputWidth }}
          value={displayValue}
          min={min}
          max={max}
          step={step}
          onChange={(event) => handleChange(event.target.value)}
          onBlur={handleBlur}
        />
        {suffix ? <span className={styles.fieldSuffix}>{suffix}</span> : null}
      </span>
    </label>
  );
};

const FieldRow = ({ label, field }: FieldRowProps) => (
  <div className={styles.inputRow}>
    <p className={styles.inputLabel}>{label}</p>
    {field}
  </div>
);

const ResultChart = ({ bars, orange = false }: { bars: number[]; orange?: boolean }) => (
  <div className={`${styles.chart} ${orange ? styles.chartOrange : ""}`} aria-hidden="true">
    {bars.map((height, index) => (
      <span
        key={`${height}-${index}`}
        className={styles.chartBar}
        style={{ height }}
      />
    ))}
  </div>
);

const CalculatorCard = ({
  badge,
  category,
  title,
  description,
  accent,
  inputs,
  result,
}: CalculatorCardProps) => (
  <article className={styles.toolCard}>
    <div
      className={`${styles.toolHeader} ${
        accent === "orange" ? styles.toolHeaderOrange : styles.toolHeaderGreen
      }`}
    >
      <span className={styles.toolBadge}>{badge}</span>
      <span className={styles.toolCategory}>{category}</span>
    </div>

    <div className={styles.toolBody}>
      <div className={styles.toolIntro}>
        <h3 className={styles.toolTitle}>{title}</h3>
        <p className={styles.toolDescription}>{description}</p>
      </div>

      <div className={styles.toolContent}>
        {inputs}
        {result}
      </div>
    </div>
  </article>
);

export const ToolsSection = () => {
  const t = useTranslations("toolsPage");
  const capitalId = useId();
  const monthlyId = useId();
  const returnId = useId();
  const periodId = useId();
  const balanceId = useId();
  const riskId = useId();
  const stopLossId = useId();
  const accountTypeId = useId();
  const instrumentId = useId();
  const spreadId = useId();
  const commissionId = useId();
  const tradeSizeId = useId();
  const strategyCapitalId = useId();
  const winRateId = useId();
  const strategyRiskId = useId();
  const rewardRatioId = useId();

  const [initialCapital, setInitialCapital] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [annualReturn, setAnnualReturn] = useState(8);
  const [years, setYears] = useState(10);

  const [accountBalance, setAccountBalance] = useState(5000);
  const [riskPerTrade, setRiskPerTrade] = useState(1.5);
  const [stopLossPips, setStopLossPips] = useState(20);
  const [accountType, setAccountType] = useState<AccountType>("standard");

  const [instrument, setInstrument] = useState<Instrument>("EUR/USD");
  const [spreadPips, setSpreadPips] = useState(0.8);
  const [commission, setCommission] = useState(3.5);
  const [tradeSizeLots, setTradeSizeLots] = useState(0.5);

  const [strategyCapital, setStrategyCapital] = useState(10000);
  const [winRate, setWinRate] = useState(55);
  const [strategyRisk, setStrategyRisk] = useState(1);
  const [rewardRatio, setRewardRatio] = useState(2);

  const capitalProjection = useMemo(() => {
    const monthlyRate = annualReturn / 100 / 12;
    const periods = years * 12;

    const projectedCapital =
      monthlyRate === 0
        ? initialCapital + monthlyContribution * periods
        : initialCapital * (1 + monthlyRate) ** periods +
          monthlyContribution * (((1 + monthlyRate) ** periods - 1) / monthlyRate);

    const investedCapital = initialCapital + monthlyContribution * periods;
    return {
      projectedCapital,
      netGain: projectedCapital - investedCapital,
    };
  }, [annualReturn, initialCapital, monthlyContribution, years]);

  const riskModel = useMemo(() => {
    const riskAmount = accountBalance * (riskPerTrade / 100);
    const pipValuePerLotMap: Record<AccountType, number> = {
      standard: 10,
      mini: 1,
      micro: 0.1,
    };
    const pipValuePerLot = pipValuePerLotMap[accountType];
    const lots = stopLossPips > 0 ? riskAmount / (stopLossPips * pipValuePerLot) : 0;

    return {
      riskAmount,
      lots,
    };
  }, [accountBalance, accountType, riskPerTrade, stopLossPips]);

  const tradingCosts = useMemo(() => {
    const pipValueByInstrument: Record<Instrument, number> = {
      "EUR/USD": 10,
      "GBP/USD": 10,
      "USD/JPY": 9.1,
      "XAU/USD": 1,
    };
    const spreadCost = spreadPips * pipValueByInstrument[instrument] * tradeSizeLots;
    const totalCost = spreadCost + commission;

    return {
      spreadCost,
      totalCost,
    };
  }, [commission, instrument, spreadPips, tradeSizeLots]);

  const strategySimulation = useMemo(() => {
    const trades = 100;
    const riskFraction = strategyRisk / 100;
    const expectancyPerTrade =
      winRate / 100 * rewardRatio * riskFraction -
      (1 - winRate / 100) * riskFraction;
    const estimatedProjection = strategyCapital * expectancyPerTrade * trades;

    return {
      estimatedProjection,
      finalCapital: strategyCapital + estimatedProjection,
    };
  }, [rewardRatio, strategyCapital, strategyRisk, winRate]);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.heading}>
          <p className={styles.kicker}>
            {t("toolsKicker", { fallback: "HERRAMIENTAS DE ANÁLISIS" })}
          </p>
          <h2 className={styles.title}>
            {t("toolsTitle", {
              fallback:
                "Cuatro herramientas para explorar condiciones de trading y supuestos de estrategia.",
            })}
          </h2>
        </div>

        <div className={styles.cards}>
          <CalculatorCard
            badge="01"
            category={t("card1.category", { fallback: "PROYECCIÓN DE CAPITAL" })}
            title={t("card1.title", {
              fallback: "Calculadora de proyección de capital",
            })}
            description={t("card1.description", {
              fallback:
                "Estima cómo el capital puede cambiar con el tiempo en función del saldo inicial, las aportaciones adicionales y el rendimiento asumido.",
            })}
            accent="green"
            inputs={
              <div className={styles.inputsColumn}>
                <p className={styles.columnLabel}>
                  {t("inputsLabel", { fallback: "ENTRADAS" })}
                </p>
                <div className={styles.inputsList}>
                  <FieldRow
                    label={t("card1.initialCapital", { fallback: "Capital inicial" })}
                    field={
                      <NumberField
                        id={capitalId}
                        value={initialCapital}
                        min={0}
                        step={500}
                        prefix="€"
                        onChange={(value) => setInitialCapital(clamp(value || 0, 0, 1_000_000))}
                      />
                    }
                  />
                  <FieldRow
                    label={t("card1.monthlyContribution", {
                      fallback: "Aportación mensual",
                    })}
                    field={
                      <NumberField
                        id={monthlyId}
                        value={monthlyContribution}
                        min={0}
                        step={50}
                        prefix="€"
                        onChange={(value) =>
                          setMonthlyContribution(clamp(value || 0, 0, 100_000))
                        }
                      />
                    }
                  />
                  <FieldRow
                    label={t("card1.annualReturn", {
                      fallback: "Rentabilidad anual",
                    })}
                    field={
                      <NumberField
                        id={returnId}
                        value={annualReturn}
                        min={0}
                        max={50}
                        step={0.1}
                        suffix="%"
                        decimals={1}
                        onChange={(value) =>
                          setAnnualReturn(clamp(value || 0, 0, 50))
                        }
                      />
                    }
                  />
                  <FieldRow
                    label={t("card1.period", { fallback: "Período" })}
                    field={
                      <NumberField
                        id={periodId}
                        value={years}
                        min={1}
                        max={50}
                        step={1}
                        suffix={t("card1.years", { fallback: "AÑOS" })}
                        onChange={(value) => setYears(clamp(value || 1, 1, 50))}
                      />
                    }
                  />
                </div>
              </div>
            }
            result={
              <div className={styles.resultColumn}>
                <p className={styles.columnLabel}>
                  {t("resultLabel", { fallback: "RESULTADO" })}
                </p>
                <div className={`${styles.resultCard} ${styles.resultCardGreen}`}>
                  <ResultChart bars={[18, 26, 34, 44, 52, 60, 52, 40]} />
                  <div className={styles.resultCopy}>
                    <p className={styles.resultLabel}>
                      {t("card1.projectedCapital", {
                        fallback: "CAPITAL PROYECTADO",
                      })}
                    </p>
                    <p className={styles.resultValue}>
                      {formatCurrency(capitalProjection.projectedCapital)}
                    </p>
                    <p className={styles.resultHint}>
                      {`${formatSignedCurrency(capitalProjection.netGain)} ${t("card1.overCapital", {
                        fallback: "sobre el capital aportado",
                      })}`}
                    </p>
                  </div>
                </div>
              </div>
            }
          />

          <CalculatorCard
            badge="02"
            category={t("card2.category", { fallback: "RIESGO POR OPERACIÓN" })}
            title={t("card2.title", {
              fallback: "Estimación de riesgo por operación",
            })}
            description={t("card2.description", {
              fallback:
                "Estima la exposición potencial por operación en función del saldo de la cuenta y del porcentaje de riesgo seleccionado.",
            })}
            accent="green"
            inputs={
              <div className={styles.inputsColumn}>
                <p className={styles.columnLabel}>
                  {t("inputsLabel", { fallback: "ENTRADAS" })}
                </p>
                <div className={styles.inputsList}>
                  <FieldRow
                    label={t("card2.accountBalance", { fallback: "Saldo de cuenta" })}
                    field={
                      <NumberField
                        id={balanceId}
                        value={accountBalance}
                        min={0}
                        step={100}
                        prefix="€"
                        onChange={(value) => setAccountBalance(clamp(value || 0, 0, 1_000_000))}
                      />
                    }
                  />
                  <FieldRow
                    label={t("card2.riskPerTrade", {
                      fallback: "Riesgo por operación",
                    })}
                    field={
                      <NumberField
                        id={riskId}
                        value={riskPerTrade}
                        min={0.1}
                        max={10}
                        step={0.1}
                        suffix="%"
                        decimals={1}
                        onChange={(value) => setRiskPerTrade(clamp(value || 0.1, 0.1, 10))}
                      />
                    }
                  />
                  <FieldRow
                    label={t("card2.stopLoss", { fallback: "Stop loss" })}
                    field={
                      <NumberField
                        id={stopLossId}
                        value={stopLossPips}
                        min={1}
                        max={1000}
                        step={1}
                        suffix="pips"
                        onChange={(value) => setStopLossPips(clamp(value || 1, 1, 1000))}
                      />
                    }
                  />
                  <FieldRow
                    label={t("card2.accountType", { fallback: "Tipo de cuenta" })}
                    field={
                      <SelectField
                        id={accountTypeId}
                        value={accountType}
                        onChange={(value) => setAccountType(value as AccountType)}
                        options={[
                          {
                            value: "standard",
                            label: t("card2.accountStandard", { fallback: "Estándar" }),
                          },
                          {
                            value: "mini",
                            label: t("card2.accountMini", { fallback: "Mini" }),
                          },
                          {
                            value: "micro",
                            label: t("card2.accountMicro", { fallback: "Micro" }),
                          },
                        ]}
                      />
                    }
                  />
                </div>
              </div>
            }
            result={
              <div className={styles.resultColumn}>
                <p className={styles.columnLabel}>
                  {t("resultLabel", { fallback: "RESULTADO" })}
                </p>
                <div className={`${styles.resultCard} ${styles.resultCardSoft}`}>
                  <div className={styles.resultSplit}>
                    <div className={styles.resultStat}>
                      <p className={styles.resultLabel}>
                        {t("card2.riskApplied", {
                          fallback: "RIESGO POR OPERACIÓN",
                        })}
                      </p>
                      <p className={styles.resultValue}>
                        {formatCurrency(riskModel.riskAmount, 2)}
                      </p>
                      <p className={styles.resultHint}>
                        {t("card2.percentageApplied", {
                          fallback: "por operación aplicada",
                        })}
                      </p>
                    </div>
                    <div className={styles.resultStat}>
                      <p className={styles.resultLabel}>
                        {t("card2.positionSize", {
                          fallback: "TAMAÑO DE LA POSICIÓN",
                        })}
                      </p>
                      <p className={styles.resultValue}>
                        {`${formatDecimal(riskModel.lots, 2)} ${t("card2.lots", {
                          fallback: "Lots",
                        })}`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            }
          />

          <CalculatorCard
            badge="03"
            category={t("card3.category", { fallback: "COSTES DE TRADING" })}
            title={t("card3.title", { fallback: "Aplicación de costes" })}
            description={t("card3.description", {
              fallback:
                "Revisa cómo los spreads, las comisiones y el tamaño de la operación influyen en el coste total de una operación.",
            })}
            accent="green"
            inputs={
              <div className={styles.inputsColumn}>
                <p className={styles.columnLabel}>
                  {t("inputsLabel", { fallback: "ENTRADAS" })}
                </p>
                <div className={styles.inputsList}>
                  <FieldRow
                    label={t("card3.instrument", { fallback: "Instrumento" })}
                    field={
                      <SelectField
                        id={instrumentId}
                        value={instrument}
                        onChange={(value) => setInstrument(value as Instrument)}
                        options={[
                          { value: "EUR/USD", label: "EUR/USD" },
                          { value: "GBP/USD", label: "GBP/USD" },
                          { value: "USD/JPY", label: "USD/JPY" },
                          { value: "XAU/USD", label: "XAU/USD" },
                        ]}
                      />
                    }
                  />
                  <FieldRow
                    label={t("card3.spread", { fallback: "Spread" })}
                    field={
                      <NumberField
                        id={spreadId}
                        value={spreadPips}
                        min={0}
                        max={100}
                        step={0.1}
                        suffix="pips"
                        decimals={1}
                        onChange={(value) => setSpreadPips(clamp(value || 0, 0, 100))}
                      />
                    }
                  />
                  <FieldRow
                    label={t("card3.commission", { fallback: "Comisión" })}
                    field={
                      <NumberField
                        id={commissionId}
                        value={commission}
                        min={0}
                        max={1000}
                        step={0.1}
                        prefix="€"
                        decimals={2}
                        onChange={(value) => setCommission(clamp(value || 0, 0, 1000))}
                      />
                    }
                  />
                  <FieldRow
                    label={t("card3.tradeSize", {
                      fallback: "Tamaño de operación",
                    })}
                    field={
                      <NumberField
                        id={tradeSizeId}
                        value={tradeSizeLots}
                        min={0.01}
                        max={100}
                        step={0.1}
                        suffix={t("card3.tradeLots", { fallback: "lotes" })}
                        decimals={1}
                        onChange={(value) =>
                          setTradeSizeLots(clamp(value || 0.01, 0.01, 100))
                        }
                      />
                    }
                  />
                </div>
              </div>
            }
            result={
              <div className={styles.resultColumn}>
                <p className={styles.columnLabel}>
                  {t("resultLabel", { fallback: "RESULTADO" })}
                </p>
                <div className={`${styles.resultCard} ${styles.resultCardSoft}`}>
                  <ResultChart bars={[18, 26, 34, 44, 52, 60, 52, 40]} />
                  <div className={styles.resultCopy}>
                    <p className={styles.resultLabel}>
                      {t("card3.totalCost", { fallback: "COSTE TOTAL" })}
                    </p>
                    <p className={styles.resultValue}>
                      {formatCurrency(tradingCosts.totalCost, 2)}
                    </p>
                    <p className={styles.resultHint}>
                      {`${t("card3.spreadLabel", { fallback: "spread" })} ${formatCurrency(
                        tradingCosts.spreadCost,
                        2,
                      )} · ${t("card3.commissionLabel", {
                        fallback: "comisión",
                      })} ${formatCurrency(commission, 2)}`}
                    </p>
                  </div>
                </div>
              </div>
            }
          />

          <CalculatorCard
            badge="04"
            category={t("card4.category", { fallback: "SIMULADOR DE ESTRATEGIA" })}
            title={t("card4.title", {
              fallback: "Simulador de resultados de estrategia",
            })}
            description={t("card4.description", {
              fallback:
                "Simula posibles resultados a lo largo de una serie de operaciones en función de la tasa de aciertos y la relación riesgo-beneficio.",
            })}
            accent="orange"
            inputs={
              <div className={styles.inputsColumn}>
                <p className={styles.columnLabel}>
                  {t("inputsLabel", { fallback: "ENTRADAS" })}
                </p>
                <div className={styles.inputsList}>
                  <FieldRow
                    label={t("card4.initialCapital", { fallback: "Capital inicial" })}
                    field={
                      <NumberField
                        id={strategyCapitalId}
                        value={strategyCapital}
                        min={0}
                        step={500}
                        prefix="€"
                        onChange={(value) =>
                          setStrategyCapital(clamp(value || 0, 0, 1_000_000))
                        }
                      />
                    }
                  />
                  <FieldRow
                    label={t("card4.winRate", { fallback: "Tasa de aciertos" })}
                    field={
                      <NumberField
                        id={winRateId}
                        value={winRate}
                        min={0}
                        max={100}
                        step={1}
                        suffix="%"
                        onChange={(value) => setWinRate(clamp(value || 0, 0, 100))}
                      />
                    }
                  />
                  <FieldRow
                    label={t("card4.riskPerTrade", {
                      fallback: "Riesgo por operación",
                    })}
                    field={
                      <NumberField
                        id={strategyRiskId}
                        value={strategyRisk}
                        min={0.1}
                        max={10}
                        step={0.1}
                        suffix="%"
                        decimals={1}
                        onChange={(value) => setStrategyRisk(clamp(value || 0.1, 0.1, 10))}
                      />
                    }
                  />
                  <FieldRow
                    label={t("card4.rewardRatio", { fallback: "Ratio R/R" })}
                    field={
                      <NumberField
                        id={rewardRatioId}
                        value={rewardRatio}
                        min={0.1}
                        max={10}
                        step={0.1}
                        prefix="1 :"
                        decimals={1}
                        onChange={(value) => setRewardRatio(clamp(value || 0.1, 0.1, 10))}
                      />
                    }
                  />
                </div>
              </div>
            }
            result={
              <div className={styles.resultColumn}>
                <p className={styles.columnLabel}>
                  {t("resultLabel", { fallback: "RESULTADO" })}
                </p>
                <div className={`${styles.resultCard} ${styles.resultCardOrange}`}>
                  <ResultChart
                    orange
                    bars={[18, 26, 34, 44, 52, 60, 52, 40]}
                  />
                  <div className={styles.resultCopy}>
                    <p className={styles.resultLabel}>
                      {t("card4.estimatedProjection", {
                        fallback: "PROYECCIÓN ESTIMADA",
                      })}
                    </p>
                    <p className={styles.resultValue}>
                      {formatSignedCurrency(strategySimulation.estimatedProjection, 0)}
                    </p>
                    <p className={styles.resultHint}>
                      {t("card4.overTrades", { fallback: "en 100 operaciones" })}
                    </p>
                  </div>
                </div>
              </div>
            }
          />
        </div>
      </div>
    </section>
  );
};
