import MoodCard from "@/components/MoodCard";
import classNames from "classnames";
import { Mood } from "@/types";
import {
  useSortable,
  AnimateLayoutChanges,
  defaultAnimateLayoutChanges,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableItemProps {
  id: string;
  mood: Mood;
}

const animateLayoutChanges: AnimateLayoutChanges = (args) => {
  return defaultAnimateLayoutChanges({ ...args });
};

const SortableItem = ({ id, mood }: SortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    animateLayoutChanges,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition: transition ?? "transform 200ms ease",
    zIndex: isDragging ? 999 : "auto",
    opacity: isDragging ? 0.5 : 1,
    touchAction: "none",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={classNames("flex justify-center", {
        "shadow-lg": isDragging,
      })}
    >
      <MoodCard mood={mood} />
    </div>
  );
};

export default SortableItem;
