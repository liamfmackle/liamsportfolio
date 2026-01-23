import React from "react";

const ServiceCard = ({ name, description }) => {
  return (
    <div
      className="w-full p-4 rounded-lg transition-all ease-out duration-300 bg-navy-50 dark:bg-navy-800/50 border-l-2 border-accent"
    >
      <h1 className="text-base font-semibold">{name ? name : "Heading"}</h1>
      <p className="mt-2 text-sm text-navy-500 dark:text-navy-300">
        {description
          ? description
          : "Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
      </p>
    </div>
  );
};

export default ServiceCard;
