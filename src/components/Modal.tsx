import React, { useState } from "react";
import Button from "./Button";
import { observer } from "mobx-react-lite";
import { mainStore } from "../stores/mainStore";
import { Mood } from "@/types";
import { moods } from "@/data";

const Modal = observer(({ close }: { close: () => void }) => {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [description, setDescription] = useState("");

  const saveMood = () => {
    if (!selectedMood) return;

    const trimmedDescription = description.trim();
    if (trimmedDescription.length === 0) {
      alert("Write your description");
      return;
    }

    const moodToSave: Mood = {
      ...selectedMood,
      description: trimmedDescription,
      id: Math.random(),
    };

    const myMoods = localStorage.getItem("myMoods");

    if (myMoods) {
      try {
        const storeData = JSON.parse(myMoods);
        const updatedData = [moodToSave, ...storeData];
        localStorage.setItem("myMoods", JSON.stringify(updatedData));
      } catch (e) {
        console.error("Failed to parse localStorage data", e);
        localStorage.setItem("myMoods", JSON.stringify([moodToSave]));
      }
    } else {
      localStorage.setItem("myMoods", JSON.stringify([moodToSave]));
    }

    mainStore.addMood(moodToSave);

    setSelectedMood(null);
    setDescription("");
    close();
  };

  return (
    <div className="relative flex flex-col w-[90vw] sm:w-sm gap-5 border border-gray-300 rounded-xl p-6 bg-white shadow-xl">
      <div
        className="absolute right-5 top-2 text-2xl text-gray-400 hover:text-red-400 duration-200 rotate-45 cursor-pointer select-none"
        onClick={() => {
          setSelectedMood(null);
          close();
        }}
      >
        +
      </div>

      <h2 className="text-2xl text-center font-semibold text-gray-800">
        Choose your mood
      </h2>

      <div className="flex flex-wrap gap-4 justify-center">
        {moods.map((mood) => (
          <div key={mood.title} className="w-32">
            <Button name={mood.title} onClick={() => setSelectedMood(mood)} />
          </div>
        ))}
      </div>

      {selectedMood && (
        <div className="flex flex-col gap-3">
          <textarea
            maxLength={200}
            className="w-full h-24 border border-blue-600 rounded-md p-2 resize-none outline-none focus:ring-2 focus:ring-blue-400 text-black"
            placeholder="Write your description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            className="self-end bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            onClick={saveMood}
          >
            Save Mood
          </button>
        </div>
      )}
    </div>
  );
});

export default Modal;
