import React from "react";
import LoginComponent from "./login/page";


export default function Form() {

  return (
    <div className="h-screen">
      <div className="grid xs:grid-rows-[1fr_2fr] md:grid-cols-[1fr_1fr] lg:grid-cols-[2fr_1fr] h-screen">
        <div
          style={{ backgroundImage: "url(/carnaval.jpg" }}
          className="flex justify-center items-center bg-center bg-cover"
        />
        <div className="relative flex flex-col gap-3 items-center h-full justify-center shadow-xl">
          <LoginComponent />
          <footer className="absolute bottom-1 w-full flex justify-center">
            AldoDev @2025 copyrigth
          </footer>
        </div>
      </div>
    </div>
  );
}
