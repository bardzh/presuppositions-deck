"use client";
const CardsDeck = dynamic(() => import("../../components/cards"), {
  ssr: false,
});
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "../../styles/Home.module.scss";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
const list = shuffleArray([
  {
    title: "Resistance in a client is a sign of lack of rapport",
    src: 5,
    id: 1,
  },
  {
    title: "All Procedures should increase Wholeness",
    src: 5,
    id: 2,
  },
  {
    title: "All Procedures should be designed to increase choice",
    src: 9,
    id: 3,
  },
  {
    title:
      "People have all the resources they need to succeed and to achieve their outcomes",
    src: 8,
    id: 4,
  },
  {
    title:
      "If you do what you've always done, you'll get what you've always gotten",
    src: 10,
    id: 5,
  },
  {
    title:
      "The System/Person with the most flexibility of behavior will control the system",
    src: 4,
    id: 6,
  },
  {
    title: "Respect for the other person's model of the world",
    src: 6,
    id: 7,
  },
  {
    title: "There is always a positive intention behind every behavior",
    src: 13,
    id: 8,
  },
  {
    title:
      "Behavior and change are to be evaluated in terms of context and ecology",
    src: 14,
    id: 9,
  },
  {
    title: "The meaning of communication is the response you get",
    src: 11,
    id: 10,
  },
  {
    title:
      "Calibrate on behavior: The most important information about a person is that person's behavior",
    src: 7,
    id: 11,
  },
  {
    title: "You are in charge of your mind, and therfore your results",
    src: 3,
    id: 12,
  },
  {
    title: "Mind and body are connected",
    src: 4,
    id: 13,
  },
  {
    title: "People are not their behaviors",
    src: 15,
    id: 14,
  },
  {
    title: "The map is not the territory",
    src: 2,
    id: 15,
  },
  {
    title:
      "Everyone is doing the best they can with the resources they have available",
    src: 12,
    id: 16,
  },
  {
    title: "There is no failure, only feedback",
    src: 11,
    id: 17,
  },
  {
    title: "You cannot not communicate",
    src: 1,
    id: 18,
  },
  {
    title: "Modelling successful performance leads to excellence",
    src: 5,
    id: 19,
  },
  {
    title: "If you want to learn, Act",
    src: 13,
    id: 20,
  },
]);

export default function Deck() {
  const router = useRouter();
  const [cards, setCards] = useState(list);
  const [selected, setSelected] = useState([]);
  const [isReview, setIsReview] = useState(false);
  const [isFinal, setIsFinal] = useState(false);
  const [round, setRound] = useState(0);

  const onClear = () => {
    setSelected([]);
    setIsReview(false);
    setIsFinal(false);
    setRound(0);
    setCards(shuffleArray(list));
  };
  const onReview = () => {
    if (selected.length === 5) {
      setIsFinal(true);
    } else {
      setIsReview(true);
    }
    setCards(selected);
    setSelected(selected);
  };
  const onPick = (index) => {
    if (selected.find((i) => i.id === cards[index].id)) return;
    setSelected([...selected, cards[index]]);
  };
  const onDiscard = (index) => {
    const filteredlist = selected.filter((item) => item.id !== cards[index].id);
    if (isReview) {
      setSelected(filteredlist);
    }
  };
  useEffect(() => {
    if (round === 2) {
      router.push("/results");
    }
  }, [round]);

  return (
    <main className={styles.main}>
      {!isReview && !isFinal && (
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-x-0 px-4 text-2xl font-semibold text-center text-blue-800 top-6"
        >
          Now, Pick up to 5 cards!
        </motion.h2>
      )}
      {isReview && selected.length > 5 && (
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-x-0 px-4 text-2xl font-semibold text-center text-blue-800 top-6"
        >
          You have {selected.length} selected cards, Discard{" "}
          {selected.length - 5} to continue.
        </motion.h2>
      )}
      {isReview && selected.length === 5 && !isFinal && (
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-x-0 px-4 text-2xl font-semibold text-center text-blue-800 top-6"
        >
          Now, Confirm your selection to continue.
        </motion.h2>
      )}
      {isFinal && round === 0 && (
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-x-0 px-4 text-2xl font-semibold text-center text-blue-800 top-6"
        >
          How can this presupposition help you solve your problem?
        </motion.h2>
      )}
      {isFinal && round === 1 && (
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-x-0 px-4 text-2xl font-semibold text-center text-blue-800 top-6"
        >
          Knowing this presupposition, what can you do now?
        </motion.h2>
      )}

      <CardsDeck
        setSelected={setSelected}
        cards={cards}
        selected={selected}
        onPick={onPick}
        onDiscard={onDiscard}
        isReview={isReview}
        isFinal={isFinal}
        onReview={onReview}
        onClear={onClear}
        onRound={() => {
          setRound(round + 1);
        }}
      />
    </main>
  );
}
