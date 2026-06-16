"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useTranslations } from "next-intl";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { useBrokersData } from "@/shared/lib/hooks/useBrokersData";

import styles from "./BrokerListings.module.scss";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const BrokerListings = () => {
  const t = useTranslations("FindABrokerPageBrokerListings");
  const title = t("title", { fallback: "Descubre las mejores compañías del mercado" });
  const description = t("description", {
    fallback:
      "Explora las plataformas disponibles y revisa sus entornos a través de una visión general. Cada listado presenta detalles clave de cada una de estas, lo que permite explorar diferentes alternativas dentro de la misma estructura.",
  });
 
  const itemLinkOne = t("itemLinkOno", { fallback: "Ver reseñas" });
  const itemLinkTwo = t("itemLinkTwo", { fallback: "Visitar broker" });

  const sliderNext = t("sliderNext", { fallback: "Siguiente" });
  const sliderPrev = t("sliderPrev", { fallback: "Anterior" });

  const [activeIndex, setActiveIndex] = useState(0);

  const { cards } = useBrokersData();

  return (
    <section className={styles.broker_listings}>
      <div className="container">
        <div className={styles.broker_listings__top}>
          <h2 className={styles.broker_listings__title}>{title}</h2>
          <p className={styles.broker_listings__description}>{description}</p>
        </div>
      </div>

      <div className={styles.broker_listings__slider_container}>
        <button
          className={`${styles.broker_listings__slider_prev} ${
            activeIndex === 0 ? styles.broker_listings__slider_prev_hidden : ""
          } prev-btn`}
        >
          ← {sliderPrev}
        </button>

        <button className={`${styles.broker_listings__slider_next} next-btn`}>
          {sliderNext} →
        </button>

        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: ".prev-btn",
            nextEl: ".next-btn",
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          spaceBetween={40}
          breakpoints={{
            0: {
              slidesPerView: 1.3,
            },
            1024: {
              slidesPerView: 1.7,
            },
          }}
          loop={true}
        >
          {cards?.map((card) => (
            <SwiperSlide
              className={`${styles.broker_listings__slide} swiper-slide`}
              key={card.key}
            >
              <div
                className={`${styles.broker_listings__item} ${
                  card.dark ? styles.broker_listings__item_first : ""
                }`}
              >
                <div>
                  <Link href={card.link || ""} target="_blank" rel="noopener noreferrer" className={styles.broker_listings__item_image}>
                    <Image
                      src={card.logo}
                      alt={card.logoAlt}
                      width={card.logoWidth}
                      height={card.logoHeight}
                      loading={"lazy"}
                    />
                  </Link>

                  <h3 className={styles.broker_listings__item_title}>
                    {card.name}
                  </h3>
                  <p className={styles.broker_listings__item_description}>
                    {card.description}
                  </p>
                </div>

                <div className={styles.broker_listings__item_right}>
                  <div className={styles.broker_listings__item_specs}>
                    {card?.specs?.map((spec) => (
                      <div key={`${card.key}-${spec.label}`}>
                        <p className={styles.broker_listings__item_spec_label}>
                          {spec.label}
                        </p>
                        <p className={styles.broker_listings__item_spec_value}>
                          {spec.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className={styles.broker_listings__item_links}>
                    <Link
                      href={card.trustpilot || ""}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.broker_listings__item_link_one}
                    >
                      {itemLinkOne} →
                    </Link>
                    <Link
                      href={card.link || ""}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.broker_listings__item_link_two}
                    >
                      {itemLinkTwo} →
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
