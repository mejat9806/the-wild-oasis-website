import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/Navigation";
import "@/app/_styles/globals.css";

import { Josefin_Sans } from "next/font/google";
import Header from "./_components/Header";
export const metadata = {
  // title: "wild oasis",
  title: {
    template: "%s | the wild Oasis",
    default: "Welcome | The wild Oasis",
  }, //this is to create a template from the title export so it look like this  "the export title | %s will be the exported title "
  description: "Luxurious cabin hotel with great view of the italian nature ", //this is greate for SEO
};
const josefin = Josefin_Sans({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  // weight for variable font weight like Boldness
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`bg-primary-950 text-primary-100 ${josefin.className} min-h-screen flex flex-col antialiased `}
      >
        <Header />
        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">{children}</main>
        </div>
      </body>
    </html>
  );
}

//root layout will wrap all of our application
//children prop is used to show the inside of the wrap it is simillar to outlet for react router
// metadata is used to update the tittle page the thing in the tab and description this is like the head html tag .useful for SEO
//metadata can be use in each page it will overite the rootlayout
