import { StaticImageData } from "next/image";

export interface Mood {
  id: number;
  title: string;
  smile: StaticImageData;
  description: string;
}
