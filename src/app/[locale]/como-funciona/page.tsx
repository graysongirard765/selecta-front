import type { Metadata } from "next";
import { useLocale, useTranslations } from "next-intl";

import {
  ExploreSection,
  HeroSection,
  IntroSection,
  SelectionSection,
  StepsSection,
} from "./components";
import type { StepItem } from "./components/StepsSection/StepsSection";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: 'Cómo elegir un broker online paso a paso | Silecta',
  description: 'Descubre cómo comparar brokers, revisar plataformas de trading y analizar herramientas antes de abrir una cuenta de inversión.',
};

export default function HowItWorksPage() {
  const t = useTranslations("howItWorksPage");
  const locale = useLocale();
  const homePrefix = locale === "es" ? "" : `/${locale}`;
  const brokersHref = `${homePrefix}/silecta`;
  const updatesHref = `${homePrefix}/actualizaciones-del-sector`;
  const toolsHref = `${homePrefix}/herramientas`;

  const steps: readonly StepItem[] = [
    {
      step: t("step1.kicker", { fallback: "Paso 1" }),
      title: t("step1.title", { fallback: "Explorar brokers" }),
      body: t("step1.body", {
        fallback:
          "Comienza conociendo las plataformas más utilizadas y con mejores condiciones del mercado. <br/><br/>La sección Silecta reúne perfiles de plataformas en un solo lugar. Cada perfil presenta los elementos clave de un entorno de corretaje en un formato consistente, lo que facilita revisar y moverse entre plataformas.",
      }),
      dark: true,
      ctas: [
        {
          label: t("step1.ctaPrimary", { fallback: "Explorar brokers" }),
          href: brokersHref,
          filled: true,
        },
      ],
    },
    {
      step: t("step2.kicker", { fallback: "Paso 2" }),
      title: t("step2.title", {
        fallback: "No quedarse ahí e ir más allá del listado",
      }),
      body: t("step2.body", {
        fallback:
          "La investigación de brokers rara vez se detiene en el perfil básico. La sección Herramientas ofrece utilidades analíticas que ayudan a interpretar las condiciones de trading. Al mismo tiempo, Actualizaciones del sector sigue los cambios en torno a las plataformas, incluyendo nuevas funciones, ajustes y cambios en el acceso al mercado.",
      }),
      ctas: [
        {
          label: t("step2.ctaTools", { fallback: "Ver herramientas" }),
          href: toolsHref,
        },
        {
          label: t("step2.ctaUpdates", {
            fallback: "Leer actualizaciones del sector",
          }),
          href: updatesHref,
        },
      ],
    },
    {
      step: t("step3.kicker", { fallback: "Paso 3" }),
      title: t("step3.title", { fallback: "Ver las diferencias" }),
      body: t("step3.body", {
        fallback:
          "Después de explorar los listados y revisar el contexto, el siguiente paso es observar cómo se diferencian las plataformas. Los usuarios suelen fijarse en los siguientes aspectos:",
      }),
      dark: true,
      bullets: [
        t("step3.bulletPlatform", { fallback: "Entorno de la plataforma" }),
        t("step3.bulletTrading", { fallback: "Condiciones de trading" }),
        t("step3.bulletTechnology", { fallback: "Tecnologías disponibles" }),
        t("step3.bulletReviews", {
          fallback: "Opiniones de usuarios externos",
        }),
      ],
      bottomBody: t("step3.bottomBody", {
        fallback: "Analizar estos elementos en conjunto ayuda a formar una visión más completa de cada plataforma.",
      }),
    },
    {
      step: t("step4.kicker", { fallback: "Paso 4" }),
      title: t("step4.title", { fallback: "Continua tu investigación" }),
      body: t("step4.body", {
        fallback:
          "Una vez que una plataforma capte tu atención puedes seguir explorándola directamente. Silecta no abre cuentas, no gestiona transacciones ni participa en actividades de trading. El servicio se centra en organizar la información de brokers para que los usuarios puedan revisar las plataformas antes de avanzar por su cuenta.",
      }),
      ctas: [
        {
          label: t("step4.ctaPrimary", { fallback: "Silecta" }),
          href: brokersHref,
        },
      ],
    },
  ] as const;

  return (
    <div className={styles.page}>
      <HeroSection
        kicker={t("hero.kicker", { fallback: "Silecta · Cómo funciona" })}
        title={t("hero.title", { fallback: "Cómo funciona." })}
        description={t("hero.description", {
          fallback:
            "Sigue la lista de las mejores plataformas que los inversores utilizan al invertir, pero antes de nada explora y revisa las plataformas.",
        })}
      />

      <IntroSection
        kicker={t("intro.kicker", {
          fallback: "Cómo comienza la elección de una plataforma Silecta",
        })}
        title={t("intro.title", {
          fallback:
            "Silecta reúne listados de plataformas, contexto de mercado y herramientas prácticas para que los usuarios puedan avanzar en la búsqueda de una forma más clara y estructurada.",
        })}
        body={t("intro.body", {
          fallback:
            "Silecta reúne listados de plataformas, contexto de mercado y herramientas prácticas para que los usuarios puedan avanzar en la búsqueda de una forma más clara y estructurada. El proceso se desarrolla en cuatro pasos que se describen a continuación.",
        })}
      />

      <StepsSection steps={steps} />

      <ExploreSection
        kicker={t("explore.kicker", { fallback: "Explora a tu propio ritmo" })}
        lead={t("explore.lead", {
          fallback:
            "La investigación de brokers rara vez sigue un único camino. Algunos usuarios identifican rápidamente las plataformas que desean explorar más a fondo, mientras que otros dedican más tiempo a revisar herramientas, actualizaciones del sector y detalles de las plataformas antes de decidir en qué centrarse a continuación.",
        })}
        body={t("explore.body", {
          fallback:
            "La estructura de la plataforma permite a los usuarios moverse libremente entre secciones a medida que evoluciona su investigación.",
        })}
      />

      <SelectionSection
        kicker={t("selection.kicker", { fallback: "Selección a tu medida" })}
        body={t("selection.body", {
          fallback:
            "Silecta opera como una plataforma independiente de búsqueda y comparación de brokers. No retiene fondos de clientes ni proporciona asesoramiento de inversión. Su función se limita a presentar información de brokers, herramientas y contexto del sector dentro de una estructura de investigación más clara.",
        })}
      />
    </div>
  );
}
