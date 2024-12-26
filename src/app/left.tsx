import black from './assets/img/black.jpeg';
export default function Left(){
    return (
        <div className="left -mt-6  ml-16">
               <div className="hero font-[TT] text-[6em] mt-[4rem] max-w-[30rem]">
                    <span className=""> Graphic`</span>
                    <br />
                    <span className="">Designers</span> 
                </div>
                <div className="sect -mt-4">
                    <div className="line w-[30rem] bg-[#8b8b8b] h-[0.05rem] mt-12"></div>

                        <div className="stars flex gap-1 mt-4">
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                    </svg>
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                    </svg>
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                    </svg>
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                    </svg>
                                    <svg 
                                    xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-half" viewBox="0 0 16 16">
                            <path d="M5.354 5.119 7.538.792A.52.52 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.54.54 0 0 1 16 6.32a.55.55 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.5.5 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.6.6 0 0 1 .085-.302.51.51 0 0 1 .37-.245zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.56.56 0 0 1 .162-.505l2.907-2.77-4.052-.576a.53.53 0 0 1-.393-.288L8.001 2.223 8 2.226z"/>
                                    </svg>
                        </div>

                        <div className="info max-w-[25rem] mt-3 font-[Lato]">
                            <span className="text-lg text-gray-800 tracking-wide mt-5">
                                The Best Platform To Find Premium Designers
                                For Your Upcoming Projects ⸺ Live
                            </span>
                                <div className="person mt-6 flex">
                                    <img src={black.src} alt="" className='rounded-full h-9' />
                                <div className="name flex flex-col ml-5 -mt-1">
                                    <span className='font-bold'>Julia Martin</span>
                                    <span className='font-light text-[#5c5b5b] text-xs tracking-wide'>Designer ⸺ Salt Lake City </span>
                                </div>

                                <div className="service ml-24">
                                    <span className='text-xs text-black'>
                                        4.8 / Service
                                    </span>
                                    <div className="bar mt-2 bg-gray-500 w-20 h-[0.1rem]">
                                        <div className="bg-black w-16 h-[0.1rem]"></div>
                                    </div>
                                </div>
                                </div>

                    <div className="line w-[30rem] bg-[#8b8b8b] h-[0.05rem] mt-4"></div>

                <div className="buttons mt-8 flex">
                    <button className='rounded-3xl px-12 bg-black hover:bg-[white] hover:text-black text-xs max-h-12 py-3 text-[#afbea4] '>Schedule a Call</button>
                    <button className='rounded-3xl px-6 bg-[#afbea4] text-xs max-h-12 py-3 border-[1px] border-black text-black ml-4 hover:border-white hover:text-white'>Check Pricing</button>
                </div>
                        </div> 

                    <div className="foot mt-4 font-[Lato] flex">
                        <div className="rate flex">
                        <svg 
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="#313030" className="size-9 mt-3">
  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                        </svg>
                    <span className=" text-base font-bold ml-2 mt-2">5.0</span>
                    <span className="text-xs mt-8 -ml-[1.4rem]">Service Rating</span>
                        </div>

                        <div className="clients flex mt-0.5 ml-36">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" className="size-9 mt-3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                        </svg>

                    <span className="text-base ml-2 font-bold mt-2">3.4M+</span>
                    <span className="text-xs mt-8 -ml-[2.9rem]">Clients Globally</span>
                        </div>
                    </div>
                </div>
                 
        </div>
    )
}