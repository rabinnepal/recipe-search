import { FC } from "react";

const Loading: FC = () => {
  return (
    <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:p-6  w-full">
      <div className="h-96 bg-gray-300 rounded-[20px]" />
      <div className="h-96 bg-gray-300 rounded-[20px]" />
      <div className="h-96 bg-gray-300 rounded-[20px]" />
      <div className="h-96 bg-gray-300 rounded-[20px]" />
      <div className="h-96 bg-gray-300 rounded-[20px]" />
      <div className="h-96 bg-gray-300 rounded-[20px]" />
      <div className="h-96 bg-gray-300 rounded-[20px]" />
      <div className="h-96 bg-gray-300 rounded-[20px]" />
    </div>
  );
};

export default Loading;
