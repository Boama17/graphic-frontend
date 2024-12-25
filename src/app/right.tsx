import girl from "./assets/img/right.jpeg";
import white from "./assets/img/white.jpeg";
export default function Right(){
    return (
        <div className="case font-[Lato]">
              <div className="card h-40 w-[12rem] mt-[21.5rem] relative z-auto ml-[20rem] backdrop-blur-md bg-white/30 rounded-3xl">
                <div className="top h-12 w-auto bg-white rounded-xl">
                    <div className="profile pt-2 flex">
                        <img src={white.src} alt="" className="h-8 rounded-full ml-3 "/>
                        <span className="text-sm flex ml-2 mt-[0.3rem]">
                            Eve Robert 
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-3 mt-[0.33rem] ml-[0.4rem]">
                                <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                            </svg>
                        </span>
                    </div>
                    <div className="info text-xl ml-4 font-[] mt-5">
                <span className="">Best <span className="font-[TT]">*</span>Freelancer Website <span className="font-[TT] font-extrabold">^</span></span>
                <p className="pt-2 ml-[4.5rem] text-base tracking-tight cursor-pointer flex">Sign Up
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ml-2 mt-0.5 animate-pulse">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                    </svg>
                </p>
                    </div>
                </div>
              </div>
            <img src={girl.src} alt="" className="-mt-[31rem] h-[38.99rem] ml-[26rem] w-[36rem]"/>
        </div>
    )
}