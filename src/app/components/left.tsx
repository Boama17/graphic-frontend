import black from '../assets/img/black.jpeg';

export default function Left() {
    return (
        <div className="left px-4 lg:px-16 pt-8 lg:pt-0 lg:-mt-6 w-full lg:w-1/2">
            <div className="hero font-[TT] text-4xl sm:text-5xl lg:text-[5.5em] mt-8 lg:mt-[3rem] max-w-full lg:max-w-[30rem]">
                <span className="block">Graphic`</span>
                <span className="block">Designers</span>
            </div>
            <div className="sect -mt-2 lg:-mt-4">
                <div className="line w-full lg:w-[30rem] bg-[#8b8b8b] h-[0.05rem] mt-8 lg:mt-12"></div>

                <div className="stars flex gap-1 mt-4">
                    {/* Stars SVGs remain unchanged */}
                </div>

                <div className="info max-w-full lg:max-w-[25rem] mt-3 font-[Lato]">
                    <span className="block text-base lg:text-lg text-gray-800 tracking-wide mt-5">
                        The Best Platform To Find Premium Designers
                        For Your Upcoming Projects ⸺ Live
                    </span>
                    <div className="person mt-6 flex flex-col sm:flex-row items-start sm:items-center">
                        <img src={black.src} alt="" className="rounded-full h-9"/>
                        <div className="name flex flex-col mt-2 sm:mt-0 sm:ml-5 sm:-mt-1">
                            <span className="font-bold">Julia Martin</span>
                            <span className="font-light text-[#5c5b5b] text-xs tracking-wide">Designer ⸺ Salt Lake City</span>
                        </div>

                        <div className="service mt-4 sm:mt-0 sm:ml-24">
                            <span className="text-xs text-black">4.8 / Service</span>
                            <div className="bar mt-2 bg-gray-500 w-20 h-[0.1rem]">
                                <div className="bg-black w-16 h-[0.1rem]"></div>
                            </div>
                        </div>
                    </div>

                    <div className="line w-full lg:w-[30rem] bg-[#8b8b8b] h-[0.05rem] mt-4"></div>

                    <div className="buttons mt-8 flex flex-col sm:flex-row gap-4 sm:gap-0">
                        <button className="rounded-3xl px-12 bg-black hover:bg-white hover:text-black text-xs h-12 text-[#afbea4] transition-colors duration-200">Schedule a Call</button>
                        <button className="rounded-3xl px-6 bg-[#afbea4] text-xs h-12 border border-black text-black sm:ml-4 hover:border-white hover:text-white transition-colors duration-200">Check Pricing</button>
                    </div>
                </div>

                <div className="foot mt-8 lg:mt-4 font-[Lato] flex flex-col sm:flex-row gap-6 sm:gap-0">
                    <div className="rate flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="#313030" className="size-9">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                        </svg>
                        <div className="flex flex-col ml-2">
                            <span className="text-base font-bold">5.0</span>
                            <span className="text-xs">Service Rating</span>
                        </div>
                    </div>

                    <div className="clients flex items-center sm:ml-36">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="size-9">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                        </svg>
                        <div className="flex flex-col ml-2">
                            <span className="text-base font-bold">3.4M+</span>
                            <span className="text-xs">Clients Globally</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
