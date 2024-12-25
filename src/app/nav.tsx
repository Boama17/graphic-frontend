import { Select } from '@headlessui/react'
import bowl from "../app/assets/img/bowl.svg";

export default function Nav(){
    return(
        <div className="nav flex font-[Lato]">
            <div className="left flex ml-6">
            <div className="book flex mt-2 ml-3">
                <img src={bowl.src} height={100} width={100} alt="" />
                <span className="text-xs -ml-5 mt-6 ">
                    /book@pro-designer.io
                </span>
            </div>
            <div className="location mt-5 ml-6">
            <Select
  name="status"
  className="border-spacing-1 rounded-2xl text-sm py-[0.5rem] bg-[#c1d1b5] text-black font-light border-solid border-2 border-gray-500 pl-3"
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
                <div className="right flex ml-[39rem] mt-8 gap-12 text-xs">
                    <span>Our Pricing</span>
                    <span>Services</span>
                    <span>Signup</span>
                    <button className='rounded-2xl -mt-1 px-4 bg-black max-h-8 text-[#afbea4] '>Hire designer</button>
                </div>           
        </div>
    );
}