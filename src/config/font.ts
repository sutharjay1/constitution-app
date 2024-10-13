import { Lexend } from "next/font/google";
import localFont from "next/font/local";

export const DINRoundProBlack = localFont({
  src: "../assets/font/DINRoundPro-Black.woff2",
});

export const DINRoundProBold = localFont({
  src: "../assets/font/DINRoundPro-Bold.woff2",
});

export const DINRoundProLight = localFont({
  src: "../assets/font/DINRoundPro-Light.woff2",
});

export const DINRoundProMedi = localFont({
  src: "../assets/font/DINRoundPro-Medi.woff2",
});

export const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  weight: ["300", "400", "500", "600", "700"],
});
