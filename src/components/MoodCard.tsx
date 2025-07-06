import React from "react";
import Delete from "@/assets/images/delete.png";
import Image from "next/image";
import { Mood } from "@/types";
import { observer } from "mobx-react-lite";
import { mainStore } from "../stores/mainStore";
import { useSwipeable } from "react-swipeable";

interface MoodCardProps {
  mood: Mood;
}

const MoodCard = observer(({ mood }: MoodCardProps) => {
  const deleteCard = () => {
    const oldData = localStorage.getItem("myMoods");
    const agree = mainStore.isMobile ? true : confirm("Do you want to delete");
    if (oldData && agree) {
      mainStore.deleteMood(mood.id);
      const newArr = JSON.parse(oldData);
      const newData = newArr.filter((el: Mood) => el.id !== mood.id);
      localStorage.setItem("myMoods", JSON.stringify(newData));
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (mainStore.isMobile) {
        deleteCard();
      }
    },
    trackTouch: true,
    preventScrollOnSwipe: true,
  });

  return (
    <div
      {...(mainStore.isMobile ? handlers : {})}
      className="relative bg-white w-full max-w-[320px] h-96 rounded-xl border border-gray-300 shadow-md p-5 flex flex-col justify-between items-center hover:shadow-lg transition-shadow cursor-pointer"
    >
      {!mainStore.isMobile && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteCard();
          }}
          onPointerDown={(e) => e.stopPropagation()}
          className="absolute top-2.5 right-2.5 w-6 h-6 cursor-pointer"
          aria-label="Delete mood"
        >
          <Image
            src={Delete}
            alt="delete"
            width={24}
            height={24}
            className="object-contain"
          />
        </button>
      )}

      <div className="text-xl font-semibold text-gray-800">{mood.title}</div>

      <div className="relative w-60 h-60">
        <Image
          src={mood.smile}
          alt="smile"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 300px"
          priority
        />
      </div>

      <div className="w-full mt-2 px-3 py-2 text-sm text-gray-700 bg-gray-100 rounded-md border border-gray-200 line-clamp-3 overflow-hidden text-center">
        {mood.description || (
          <span className="italic text-gray-400">No description</span>
        )}
      </div>
    </div>
  );
});

export default MoodCard;
