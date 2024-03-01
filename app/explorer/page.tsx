import Image from "next/image";

export default function Explorer() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <div className="title mt-8">
          <p className="text-3xl font-bold">Address Explorer</p>
        </div>


        <div className="searchbar mt-8">
          <input
            type="text"
            placeholder="Search..."
            className="w-full text-slate-500 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="carousel mt-8 flex"> 
          <div className="bg-gray-200 m-4 w-64 h-32 flex items-center justify-center rounded-md">
            <p className="text-xl font-bold">1</p>
          </div>
          <div className="bg-gray-200 m-4 w-64 h-32 flex items-center justify-center rounded-md">
            <p className="text-xl font-bold">2</p>
          </div>
          <div className="bg-gray-200 m-4 w-64 h-32 flex items-center justify-center rounded-md">
            <p className="text-xl font-bold">3</p>
          </div>
          <div className="bg-gray-200 m-4 w-64 h-32 flex items-center justify-center rounded-md">
            <p className="text-xl font-bold">4</p>
          </div>
        </div>
    </div>
  );
}
