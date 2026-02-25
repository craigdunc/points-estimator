import React, { useState, useEffect, useRef } from 'react';
import KoalaIdle from '../assets/images/sprites/Koala-idle.png';
import KoalaDown from '../assets/images/sprites/Koala-down.png';
import KoalaAh from '../assets/images/sprites/Koala-ah.png';
import KoalaTravel from '../assets/images/sprites/Koala-travel.png';
import KoalaTick from '../assets/images/sprites/Koala-tick.png';
import KoalaBig from '../assets/images/sprites/Koala-big.png';
import KoalaMap from '../assets/images/sprites/Koala-map.png';
import KoalaShop from '../assets/images/sprites/Koala-shop.png';
import KoalaCard from '../assets/images/sprites/Koala-card.png';

const SPRITE_CONFIG = {
  idle: { src: KoalaIdle, width: 219, height: 264, loop: true },
  down: { src: KoalaDown, width: 244, height: 267, loop: true },
  ah: { src: KoalaAh, width: 218, height: 261, loop: true },
  travel: { src: KoalaTravel, width: 295, height: 266, loop: false },
  tick: { src: KoalaTick, width: 255, height: 263, loop: false },
  big: { src: KoalaBig, width: 222, height: 261, loop: 'slider' },
  map: { src: KoalaMap, width: 262, height: 263, loop: false },
  shop: { src: KoalaShop, width: 368, height: 264, loop: false, cols: 6, totalFrames: 36 },
  card: { src: KoalaCard, width: 225, height: 270, loop: false, cols: 6, totalFrames: 36 },
};

export default function KoalaSprite({ className = '', style = {}, variant = 'idle', scale = 1 }) {
  const [frame, setFrame] = useState(0);
  const [activeVariant, setActiveVariant] = useState(variant);
  const frameRef = useRef(0);
  const loopCountRef = useRef(0);

  useEffect(() => {
    setActiveVariant(variant);
  }, [variant]);

  const config = SPRITE_CONFIG[activeVariant] || SPRITE_CONFIG.idle;
  const baseFrameWidth = config.width;
  const baseFrameHeight = config.height;
  const loop = config.loop !== false; // defaults to true
  const isContinuous = activeVariant === 'idle';

  const cols = config.cols || 6;
  const totalFrames = config.totalFrames || 36;
  const rows = Math.ceil(totalFrames / cols);

  useEffect(() => {
    frameRef.current = 0;
    setFrame(0);
    loopCountRef.current = 0;

    let isCancelled = false;
    let timerId = null;

    const playLoop = () => {
      if (isCancelled) return;
      frameRef.current = 0;
      setFrame(0);

      let nextFrame = 0;
      timerId = setInterval(() => {
        if (isCancelled) {
          clearInterval(timerId);
          return;
        }

        nextFrame++;

        if (config.loop === 'slider') {
          // Special handling for the Koala-big slider animation
          if (nextFrame >= totalFrames) {
            clearInterval(timerId);
            frameRef.current = totalFrames - 1;
            setFrame(totalFrames - 1);
            return;
          }
          frameRef.current = nextFrame;
          setFrame(nextFrame);
        } else if (!loop) {
          if (nextFrame >= totalFrames - 1) {
            clearInterval(timerId);
            frameRef.current = totalFrames - 1;
            setFrame(totalFrames - 1);
          } else {
            frameRef.current = nextFrame;
            setFrame(nextFrame);
          }
        } else {
          if (nextFrame >= totalFrames) {
            clearInterval(timerId);
            frameRef.current = 0;
            setFrame(0);

            if (isContinuous) {
              timerId = setTimeout(playLoop, 1000); // Continuous loop forever
            } else {
              loopCountRef.current++;
              if (loopCountRef.current < 3) {
                timerId = setTimeout(playLoop, 1000);
              } else {
                timerId = setTimeout(() => {
                  if (!isCancelled) setActiveVariant('idle');
                }, 1000);
              }
            }
          } else {
            frameRef.current = nextFrame;
            setFrame(nextFrame);
          }
        }
      }, 1000 / 24);
    };

    timerId = setTimeout(playLoop, 1000);

    return () => {
      isCancelled = true;
      clearTimeout(timerId);
      clearInterval(timerId);
    };
  }, [activeVariant, loop, totalFrames, isContinuous, config.loop]);

  // Special separate effect for the slider ping-pong logic
  useEffect(() => {
    if (activeVariant !== 'big') return;

    let isCancelled = false;
    let timerId = null;
    let forward = true;

    const tick = () => {
      if (isCancelled) return;

      setFrame(prev => {
        let nxt = forward ? prev + 1 : prev - 1;
        if (nxt >= totalFrames - 1 && forward) {
          nxt = totalFrames - 1;
          forward = false;
          clearInterval(timerId);
          setTimeout(() => {
            if (isCancelled) return;
            timerId = setInterval(tick, 1000 / 24);
          }, 1000);
        } else if (nxt <= 0 && !forward) {
          nxt = 0;
          forward = true;
          clearInterval(timerId);
          setTimeout(() => {
            if (isCancelled) return;
            timerId = setInterval(tick, 1000 / 24);
          }, 1000);
        }
        return nxt;
      });
    };

    // start the ping pong loop after initial 1s delay
    const startTimeout = setTimeout(() => {
      if (isCancelled) return;
      timerId = setInterval(tick, 1000 / 24);
    }, 1000);

    return () => {
      isCancelled = true;
      clearTimeout(startTimeout);
      clearInterval(timerId);
    };
  }, [activeVariant, totalFrames]);

  const frameWidth = baseFrameWidth * scale;
  const frameHeight = baseFrameHeight * scale;

  const x = (frame % cols) * frameWidth;
  const y = Math.floor(frame / cols) * frameHeight;
  const imageSrc = config.src;

  const bgWidth = baseFrameWidth * cols * scale;
  const bgHeight = baseFrameHeight * rows * scale;

  return (
    <div
      className={`inline-block ${className}`}
      style={{
        ...style,
        width: frameWidth,
        height: frameHeight,
        backgroundImage: `url(${imageSrc})`,
        backgroundSize: `${bgWidth}px ${bgHeight}px`,
        backgroundPosition: `-${x}px -${y}px`,
        backgroundRepeat: 'no-repeat',
      }}
    />
  );
}