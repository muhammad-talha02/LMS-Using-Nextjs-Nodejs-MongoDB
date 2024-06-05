"use client"
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { SessionProvider } from "next-auth/react";
import { Josefin_Sans, Poppins } from "next/font/google";
import { FC, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Providers } from "./Provider";
import Loader from "./components/Loader/Loader";
import "./globals.css";
import { socketId } from "./utils/socket";
import { ThemeProvider } from "./utils/theme-provider";
// import socketIO from "socket.io-client"


// const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || ''
// const socketId = socketIO(ENDPOINT, { transports: ['websocket'] })
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    socketId.on("connection", () => { })
  }, [])
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${josefin.variable} text-black dark:text-white !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300`}
      >
        <Providers>
          <SessionProvider>

            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
              {/* <Custom> */}
                {children}
              {/* </Custom> */}
              <Toaster position="top-center" reverseOrder={false} />
            </ThemeProvider>
          </SessionProvider>
        </Providers>
        <div id="portal-root"></div>
      </body>
    </html>
  );
}


const Custom: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoading } = useLoadUserQuery({})
  if (isLoading) return <Loader />
  return <>
    {children}
  </>
}