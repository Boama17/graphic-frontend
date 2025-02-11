import { Select } from '@headlessui/react';
import bowl from "../assets/img/bowl.svg";

export default function Nav() {
  return (
    <div className="nav -mt-8 flex flex-col md:flex-row font-[Lato] w-full px-4 md:px-6 py-4 md:py-0">
      <div className="left flex flex-col md:flex-row w-full md:w-auto">
        <div className="book flex items-center justify-center md:justify-start mt-2 md:ml-3">
          <img src={bowl.src} className="h-[60px] w-[60px] md:h-[100px] md:w-[100px]" alt="" />
          <span className="text-xs -ml-5 mt-6">
            /book@pro-designer.io
          </span>
        </div>
        <div className="location w-full md:w-auto mt-12 md:ms-6 px-8">
          <Select
            name="status"
            className="w-full md:w-auto border-spacing-1 rounded-2xl text-sm py-[0.5rem] bg-[#c1d1b5] text-black font-light border-solid border-2 border-gray-500 pl-3"
            aria-label="Location"
          >
            <option
              value="active"
              className="bg-[#c1d1b5] text-black font-light hover:bg-[#b0c4a6]"
            >
              W 630 S2 #130, Beautiful Gate
            </option>
            <option
              value="paused"
              className="bg-[#c1d1b5] text-black font-light hover:bg-[#b0c4a6]"
            >
              Salt Lake City, US
            </option>
            <option
              value="delayed"
              className="bg-[#c1d1b5] text-black font-light hover:bg-[#b0c4a6]"
            >
              Kasoa, Ghana WA
            </option>
            <option
              value="canceled"
              className="bg-[#c1d1b5] text-black font-light hover:bg-[#b0c4a6]"
            >
              Calabar, Cross River State, NG, WA
            </option>
          </Select>
        </div>
      </div>
      <div className="right flex flex-col md:flex-row items-center mt-8 md:mt-8 md:ml-auto gap-6 md:gap-12 text-xs">
        <span className="py-2 md:py-0">Our Pricing</span>
        <span className="py-2 md:py-0">Services</span>
        <span className="py-2 md:py-0">Signup</span>
        <button className="rounded-2xl px-6 py-2 bg-black text-[#afbea4] hover:bg-white hover:text-black transition-colors duration-200 ease-in-out font-medium tracking-wide w-full md:w-auto md:h-8 md:flex md:items-center md:justify-center shadow-sm hover:shadow-md active:scale-95 transform">
          Hire designer
        </button>
      </div>
    </div>
  );
}