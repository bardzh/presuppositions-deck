"use client";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.scss";
import { useSprings, animated, to as interpolate } from "react-spring";
import { useDrag } from "react-use-gesture";

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = (i) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
});
const from = (i) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r, s) =>
  `perspective(1500px) rotateX(30deg) rotateY(${
    r / 10
  }deg) rotateZ(${r}deg) scale(${s})`;

const Deck = ({
  cards,
  onPick,
  selected,
  setSelected,
  onDiscard,
  isReview,
  onReview,
  onClear,
  isFinal,
  onRound,
}) => {
  const [gone] = useState(() => new Set()); // The set flags all the cards that are flicked out
  const [props, api] = useSprings(cards.length, (i) => ({
    ...from(i),
    to: to(i),
  }));

  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useDrag(
    ({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
      const trigger = velocity > 0.2; // If you flick hard enough it should trigger the card to fly out
      const dir = xDir < 0 ? -1 : 1; // Direction should either point left or right
      if (!down && trigger) gone.add(index);

      // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
      api.start((i) => {
        if (index !== i) return; // We're only interested in changing spring-data for the current spring
        const isGone = gone.has(index);
        if (isGone && dir == -1) {
          onDiscard(index);
        }
        if (isGone && dir == 1) {
          onPick(index);
        }
        const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0; // When a card is gone it flys out left or right, otherwise goes back to zero
        const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0); // How much the card tilts, flicking it harder makes it rotate faster
        const scale = down ? 1.1 : 1; // Active cards lift up a bit
        return {
          dir,
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
        };
      });
      if (!down && gone.size === cards.length) {
        if (isFinal) {
          onRound();
        }
        setTimeout(() => gone.clear() || api.start((i) => to(i)), 600);
      }
    }
  );
  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-
  return (
    <>
      {props.map(({ x, y, rot, scale, dir }, i) => {
        return (
          <animated.div key={cards[i].title} style={{ x, y }}>
            {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
            <animated.div
              {...bind(i)}
              style={{
                transform: interpolate([rot, scale], trans),
              }}
              className={styles.card}
            >
              <div className="flex flex-col justify-between flex-1 px-2 py-4 border rounded-lg">
                <h1 className="font-serif text-3xl font-semibold text-center capitalize">
                  {cards[i].title}
                </h1>
                <div>
                  <img
                    className="w-full pointer-events-none select-none max-h-52"
                    src={`/svg/${cards[i].src}.svg`}
                    alt=""
                  />
                </div>
              </div>
            </animated.div>
          </animated.div>
        );
      })}

      {selected.length > 0 && (
        <nav className="fixed inset-x-0 flex flex-col items-center justify-center gap-2 bottom-4">
          {!isFinal && (
            <div>
              {selected.length >= 5 ? (
                <button
                  onClick={() => {
                    gone.clear();
                    api.start((i) => to(i));
                    onReview();
                  }}
                  className="justify-center px-20 py-4 font-semibold text-white bg-orange-500 rounded-full"
                >
                  {selected.length === 5
                    ? isReview
                      ? "Confirm"
                      : "Select"
                    : "Review"}{" "}
                  your {selected.length} Card{selected.length > 1 && "s"}
                </button>
              ) : (
                <span className="justify-center p-2 px-4 font-semibold text-white bg-orange-500 rounded-full">
                  {selected.length} card{selected.length > 1 && "s"} selected
                </span>
              )}
            </div>
          )}
          <button
            className="justify-center p-2 px-4 text-gray-800 rounded-full"
            onClick={() => {
              gone.clear();
              api.start((i) => to(i));
              onClear();
            }}
          >
            Start Over
          </button>
        </nav>
      )}
    </>
  );
};

export default Deck;
