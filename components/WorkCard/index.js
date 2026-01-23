import React from "react";

const WorkCard = ({ img, name, description, onClick, techStack }) => {
  return (
    <div
      className="overflow-hidden rounded-lg p-2 laptop:p-4 first:ml-0 link border border-navy-200 dark:border-navy-700 cursor-pointer"
      onClick={onClick}
    >
      <div
        className="relative rounded-lg overflow-hidden transition-all ease-out duration-300"
        style={{ height: "160px" }}
      >
        <img
          alt={name}
          className="h-full w-full object-cover hover:scale-[1.03] transition-all ease-out duration-300"
          src={img}
        ></img>
      </div>
      <h1 className="mt-4 text-lg font-semibold">
        {name ? name : "Project Name"}
      </h1>
      <h2 className="text-sm text-navy-600 dark:text-navy-300 mt-1 line-clamp-2">
        {description ? description : "Description"}
      </h2>

      {/* Tech Stack Pills */}
      {techStack && techStack.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {techStack.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-0.5 text-xs rounded-full bg-navy-100 dark:bg-navy-800 text-navy-800 dark:text-navy-100"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkCard;
