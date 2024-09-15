import { Playfair_Display, Noto_Serif } from "next/font/google";

export const Playfair_Display_init = Playfair_Display({
  display: "swap",
  subsets: ["latin", "latin-ext"],
  variable: "--font-playfair-display",
  weight: "700",
});

export const Noto_Serif_init = Noto_Serif({
  display: "swap",
  subsets: ["latin", "latin-ext"],
  variable: "--font-noto-serif",
  weight: "400",
});

export const fonts = [Playfair_Display_init, Noto_Serif_init];
export default fonts;
