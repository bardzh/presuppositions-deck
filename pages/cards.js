import { useState, useEffect } from "react";
import styles from "../styles/Home.module.scss";
import { useSprings, animated, to as interpolate } from "react-spring";
import { useDrag } from "react-use-gesture";

const list = [
  {
    title: "All Procedures should increase Wholeness",
    src: 5,
  },
  {
    title: "All Procedures should be designed to increase choice",
    src: 9,
  },
  {
    title:
      "People have all the resources they need to succeed and to achieve their outcomes",
    src: 8,
  },
  {
    title:
      "If you do what you've always done, you'll get what you've always gotten",
    src: 10,
  },
  {
    title: "Flexibility is power",
    src: 4,
  },
  {
    title: "Respect for the other person's model of the world",
    src: 6,
  },
  {
    title: "Every behavior has a positive intent behind every behavior",
    src: 13,
  },
  {
    title:
      "Behavior and change are to be evaluated in terms of context and ecology",
    src: 14,
  },
  {
    title: "The meaning of communication is the response you get",
    src: 11,
  },
  {
    title:
      "Calibrate on behavior: The most important information about a person is that person's behavior",
    src: 7,
  },
  {
    title: "You are in charge of your mind, and therfore your results",
    src: 3,
  },
  {
    title: "Mind and body are connected",
    src: 4,
  },
  {
    title: "People are not their behaviors",
    src: 15,
  },
  {
    title: "The map is not the territory",
    src: 2,
  },
  {
    title:
      "Everyone is doing the best they can with the resources they have available",
    src: 12,
  },
  {
    title: "There is no failure, only feedback",
    src: 11,
  },
  {
    title: "You cannot not communicate",
    src: 1,
  },

  {
    title: "Modelling successful performance leads to excellence",
    src: 5,
  },
  {
    title: "If you want to learn, Act",
    src: 13,
  },
];

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

export default function Home() {
  const [cards, setCards] = useState(list);
  const [selected, setSelected] = useState([]);

  return (
    <main className={styles.main}>
      <section className="absolute inset-x-0 top-0 px-4">
        {selected.length < 5 ? (
          <p className="text-center text-gray-700"></p>
        ) : (
          <p className="text-center text-gray-700">
            How can this presupposition help you solve your problem?
          </p>
        )}
      </section>
      {selected.length < 5 && (
        <Deck
          setSelected={setSelected}
          cards={cards}
          onSelect={(index) => {
            if (selected.find((i) => i.title === cards[index].title)) return;
            if (selected.length === 5) return;
            setSelected([...selected, cards[index]]);
          }}
          selected={selected}
          remove={(i) => {
            setSelected(selected.filter((item) => item.title !== i.title));
          }}
        />
      )}
      {selected.length === 5 && (
        <Deck
          setSelected={setSelected}
          cards={selected}
          onSelect={() => {}}
          selected={selected}
          remove={(i) => {}}
        />
      )}
    </main>
  );
}

const Deck = ({ cards, onSelect, selected, setSelected, remove }) => {
  const [gone] = useState(() => new Set()); // The set flags all the cards that are flicked out
  const [props, set] = useSprings(cards.length, (i) => ({
    ...to(i),
    from: from(i),
  }));
  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useDrag(
    ({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
      const trigger = velocity > 0.2; // If you flick hard enough it should trigger the card to fly out
      const dir = xDir < 0 ? -1 : 1; // Direction should either point left or right
      if (!down && trigger) gone.add(index);

      // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
      set((i) => {
        if (index !== i) return; // We're only interested in changing spring-data for the current spring
        const isGone = gone.has(index);
        if (
          isGone &&
          dir == -1 &&
          selected.some((item) => item.title === cards[index])
        ) {
          remove(index);
        }
        if (isGone && dir == 1) {
          onSelect(index);
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
      if (!down && gone.size === cards.length)
        setTimeout(() => gone.clear() || set((i) => to(i)), 600);
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
              {x > 0 && (
                <div className="flex justify-center mb-2">
                  <i className="p-2 text-xl text-white bg-green-600 rounded-full las la-check"></i>
                </div>
              )}
              <h1 className="font-serif text-3xl font-bold text-center capitalize">
                {cards[i].title}
              </h1>
              <div>
                <img
                  className="w-full pointer-events-none select-none max-h-52"
                  src={`/svg/${cards[i].src}.svg`}
                  alt=""
                />
              </div>
            </animated.div>
          </animated.div>
        );
      })}

      {selected.length > 0 && (
        <nav className="fixed inset-x-0 flex items-center justify-center space-x-2 bottom-20">
          <span className="justify-center p-2 px-4 bg-white rounded-full">
            {selected.length} / 5
          </span>
          {selected.length > 0 && (
            <button
              className="justify-center p-2 px-4 bg-white rounded-full"
              onClick={() => {
                setSelected([]);
                gone.clear();
                set((i) => to(i));
              }}
            >
              Clear
            </button>
          )}
        </nav>
      )}
    </>
  );
};
