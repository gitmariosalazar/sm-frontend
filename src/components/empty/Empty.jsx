import React from "react";
import { ImFileEmpty } from "react-icons/im";

const Empty = ({ title }) => {
  return (
    <div className="h-16 w-full flex justify-start items-start mr-4">
      <div className="flex justify-center items-center p-2">
        <ImFileEmpty className="text-4xl text-gray-400 m-auto my-2" />
        <h1 className="font-bold text-xl ml-3 text-sky-500">{title}</h1>
      </div>
    </div>
  );
};

export default Empty;
