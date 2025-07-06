"use client";

import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { mainStore } from "../stores/mainStore";
import { motion, AnimatePresence } from "framer-motion";
import SortableItem from "@/components/SortableItem";
import Button from "@/components/Button";
import Modal from "@/components/Modal";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -30 },
  show: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

const Home = observer(() => {
  const [myMoods, setMyMoods] = useState<string | null>(null);
  const [isModal, setModal] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      const screenWidth = window.innerWidth;
      mainStore.setIsMobile(screenWidth < 768);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("myMoods");
    setMyMoods(stored);
  }, []);

  useEffect(() => {
    if (!mainStore.moods.length && myMoods) {
      const storeData = JSON.parse(myMoods);
      mainStore.addAllMoods([...storeData]);
    }
  }, [myMoods]);

  const closeModal = () => {
    setModal(false);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    if (!mainStore.isMobile) return;

    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = mainStore.moods.findIndex(
        (m) => m.id.toString() === active.id
      );
      const newIndex = mainStore.moods.findIndex(
        (m) => m.id.toString() === over?.id
      );
      const newOrder = arrayMove(mainStore.moods, oldIndex, newIndex);
      mainStore.setMoods(newOrder);
      localStorage.setItem("myMoods", JSON.stringify(newOrder));
    }
  };

  const deleteMoods = () => {
    const agree = confirm("Do you want to delete all moods");
    if (agree) {
      mainStore.deleteAllMoods();
      localStorage.removeItem("myMoods");
    }
  };

  return (
    <div className="p-6 min-h-screen flex flex-col gap-5 max-w-[1440px] m-auto">
      <header className="flex flex-col gap-5 md:flex-row justify-between items-center border-b border-amber-200 pb-6">
        <div className="hidden sm:block w-40"></div>
        <div className="text-amber-200 text-4xl font-bold">Board of Moods</div>
        <div className="flex gap-5">
          {mainStore.moods.length > 0 && (
            <div className="w-30 md:w-40">
              <Button name="Delete Moods" color="error" onClick={deleteMoods} />
            </div>
          )}
          <div className="w-30 md:w-40">
            <Button name="Add Mood" onClick={() => setModal(true)} />
          </div>
        </div>
      </header>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={mainStore.moods.map((m) => m.id)}
          strategy={verticalListSortingStrategy}
        >
          <motion.main
            className="flex flex-col sm:grid sm:grid-cols-[repeat(auto-fit,_minmax(320px,_1fr))] gap-4 w-full mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <AnimatePresence>
              {mainStore.moods.length ? (
                mainStore.moods.map((mood) => (
                  <motion.div
                    key={mood.id}
                    variants={itemVariants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                  >
                    <SortableItem id={mood.id.toString()} mood={mood} />
                  </motion.div>
                ))
              ) : (
                <div className="text-blue-600 h-full text-center text-3xl">
                  No Cards
                </div>
              )}
            </AnimatePresence>
          </motion.main>
        </SortableContext>
      </DndContext>

      {isModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
          <Modal close={closeModal} />
        </div>
      )}
    </div>
  );
});

export default Home;
