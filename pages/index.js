import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.scss";
import { useSprings, animated, to as interpolate } from "react-spring";
import { useDrag } from "react-use-gesture";

const list = [
  {
    title: "The map is not the territory",
    description:
      "The map of the world we have in our minds is not the real world. The map is a metaphor for our belief system, values and principles",
  },
  {
    title: "People work perfectly",
    description:
      "People are not broken, therefore they need no repair. people function perfectly, even if the results are counter productive or harm them",
  },
  {
    title: "People always make the best choice for them at any given time",
    description:
      "Every behavior, whether it's evil, weird or crazy is the best choice for this person in that moment.",
  },
  {
    title: "People have all the resources they need",
    description:
      "Different people have different dreams and people have all the resources they need to achieve their goals and desired results",
  },
  {
    title: "The meaning of communication is the response you get",
    description:
      "take full responsibility for the results of your communication",
  },
  {
    title: "Every behavior has a positive intent in some context",
    description:
      "there's a positive intent lies within every behavior. This assumption separates the person from the action",
  },
  {
    title: "You cannot not communicate",
    description:
      "the mind affects the body and our body language will communicate the message",
  },
  {
    title: "Mind and body are connected",
    description:
      "There's an inseparable connection between the mind and the body, each affects the other and they form a system",
  },
  {
    title: "If one person can do it, you can learn how to do it",
    description:
      "if any one in the world producing a certain result, you also can learn how to produce it",
  },
  {
    title: "There is no failure, only feedback",
    description:
      "Every result gives you information, maybe about how to do something different in the future",
  },
  {
    title: "The person and the behavior are separated",
    description:
      "We are not our behaviors and that means you can change your behavior",
  },
  {
    title: "Flexibility is power",
    description:
      "The person or element with the most flexibility in a system will have the most influence",
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
    <div className={styles.container}>
      <Head>
        <title>The 14 Presuppositions of NLP Practice</title>
        <link
          rel="stylesheet"
          href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css"
        />
        <meta name="theme-color" content="#bfdbfe" />
        <meta
          name="description"
          content="The 14 Presuppositions of NLP Practice
"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#bfdbfe" />
      </Head>
      <main className={styles.main}>
        <section className="absolute top-0 inset-x-0 px-4">
          <h1 className="text-center font-extralight text-4xl text-neutral-800 py-2 pt-8">
            Presuppositions Deck
          </h1>
          {selected.length < 5 ? (
            <p className="text-center text-gray-700">
              Swipe right to pick 5 presuppositions that you think can help you
              solve your problem. Swipe left to discard.
            </p>
          ) : (
            <p className="text-center text-gray-700">
              How can this presupposition help you solve your problem?
            </p>
          )}
          {selected.length > 0 && (
            <div className="fixed z-50 bottom-20 inset-x-0 flex space-x-2 justify-center">
              <span className="justify-center bg-white p-2 px-4 rounded-full">
                {selected.length} / 5
              </span>
              {selected.length > 0 && (
                <button
                  className="justify-center bg-white p-2 px-4 rounded-full"
                  onClick={() => {
                    setSelected([]);
                  }}
                >
                  Clear
                </button>
              )}
            </div>
          )}
        </section>
        {selected.length < 5 && (
          <Deck
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
            cards={selected}
            onSelect={() => {}}
            selected={selected}
            remove={(i) => {}}
          />
        )}
      </main>
    </div>
  );
}

const Deck = ({ cards, onSelect, selected, remove }) => {
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
  return props.map(({ x, y, rot, scale, dir }, i) => {
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
              <i className="las la-check bg-green-600 text-white p-2 text-xl rounded-full"></i>
            </div>
          )}
          <h1 className="text-3xl text-center font-bold capitalize font-serif">
            {cards[i].title}
          </h1>
          <p className="text-xl text-center mt-8 font-light text-neutral-800 min-h-[200px]">
            {cards[i].description}
          </p>
        </animated.div>
      </animated.div>
    );
  });
};
