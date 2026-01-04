import React from "react";
import Socials from "../Socials";

const Footer = ({}) => {
  return (
    <div className="mt-10 laptop:mt-40 p-2 laptop:p-0">
      <div className="flex flex-col items-center">
        <Socials />
        <p className="text-sm opacity-50 mt-4">
          {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default Footer;
