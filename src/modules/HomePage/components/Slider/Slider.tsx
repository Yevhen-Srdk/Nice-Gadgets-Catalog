import { useEffect, useState } from 'react';
import styles from './Slider.module.scss';
import cn from 'classnames';
import { sliderData } from '@type/SliderData';

const SLIDER_DELAY = 5000;

export const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goNext = () => {
    setCurrentSlide(prev => (prev === sliderData.length - 1 ? 0 : prev + 1));
  };

  const goBack = () => {
    setCurrentSlide(prev => (prev === 0 ? sliderData.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => goNext(), SLIDER_DELAY);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.slider}>
      <div className={styles.controls}>
        <button
          className={styles.btn}
          onClick={goBack}
          aria-label="Previous slide"
        >
          <img src="icons/chevron-arrow-left.svg" alt="arrow-left" />
        </button>
        <div className={styles.imgContainer}>
          <div
            className={styles.track}
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {sliderData.map((slide, index) => (
              <a
                className={styles.sliderLink}
                href={slide.link}
                key={`slide-btn-${slide.alt}`}
                aria-label={slide.alt}
                rel="noreferrer"
                target="_blank"
              >
                <picture className={styles.sliderPicture}>
                  <source media="(min-width: 640px)" srcSet={slide.url} />
                  <img
                    className={styles.sliderImg}
                    src={slide.croppedImgUrl}
                    alt={slide.alt}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    fetchPriority={index === 0 ? 'high' : 'auto'}
                  />
                </picture>
              </a>
            ))}
          </div>
        </div>
        <button className={styles.btn} onClick={goNext} aria-label="Next slide">
          <img src="icons/chevron-arrow-right.svg" alt="arrow-right" />
        </button>
      </div>
      <div className={styles.sliderBtns}>
        {sliderData.map((_, index) => (
          <button
            key={index}
            className={cn(styles.sliderBtn, {
              [styles.active]: currentSlide === index,
            })}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};
