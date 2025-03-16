import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Travel Memo",
  description: "Your everyday buddy for traveling!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${inter.variable} antialiased`}>
        {/* <div className="container">
          <div className="wrapper"> */}
        {children}
        {/* </div> */}
        {/* </div> */}
      </body>
    </html>
  );
}
