"use client"
import Image from 'next/image';
import one from '../../assets/img/near.png';
import two from '../../assets/img/second.png';
import three from '../../assets/img/three.jpg';
import Flora from '@/components/ui/flora';

export default function Hero() {
    const scrollToProperties = () => {
        const featuredSection = document.getElementById('featured-properties');
        if (featuredSection) {
            featuredSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return (
        <div className="content mx-4 md:ml-16 pt-8 md:pt-0">
            <div className="max-w-[37rem] mt-8 md:mt-[2rem]">
                <h1 className="font-light text-[2.5rem] sm:text-4xl md:text-5xl lg:text-6xl text-green-800 font-[Poppins] leading-tight md:leading-[4.5rem]">
                    <span>Discover the</span>  
                    <span className="elegant font-[Elegant] -ml-1"> Perfect Place </span>to live 
                    <div className="flex items-center">
                        and Thrive
                       <Flora />
                    </div>
                </h1>
            </div>
            <div className="sect w-full md:w-[33rem]">
            <div className="caption mt-8 md:mt-4">
                <span className="text-base sm:text-base md:text-[1.1em] font-[Poppins-regular]">
                    Explore a curated selection of homes that fit your lifestyle and<br /> preferences. 
                </span>
            </div>
            <div className="buttons mt-16 md:mt-4 flex max-w-min group">
                <div 
                    onClick={scrollToProperties}
                    className="list w-max px-14 sm:px-8 py-4 md:-my-[-1.75rem] md:px-12 bg-black text-sm sm:text-sm text-white hover:bg-white hover:text-black rounded-full cursor-pointer transition-colors duration-300"
                >
                    View Listings
                </div>
                <div className="circle p-3 sm:p-4 md:p-5 rounded-full bg-black group-hover:bg-white transition-all duration-500 delay-700 size-10 sm:size-10 md:size-12 mt-2 md:mt-8 ml-2 md:ml-3 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="size-6 group-hover:rotate-90 sm:size-5 md:size-6 -ml-1 sm:-ml-1.5 md:-ml-2 -mt-1 sm:-mt-1.5 md:-mt-2 group-hover:fill-black transition-all duration-700 delay-700">
                        <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>

            <div className="small flex mt-[8rem] md:mt-20 space-y-4 sm:space-y-0">
                <div className="first flex">
                    <div className="pics flex -ml-2">
                        <Image 
                            src={one} 
                            alt="Property image 1" 
                            className='rounded-full h-8 w-8 sm:h-10 sm:w-10'
                            width={40}
                            height={40}
                        />
                        <Image 
                            src={two} 
                            alt="Property image 2" 
                            className='rounded-full h-8 w-8 sm:h-10 sm:w-10 -ml-2'
                            width={40}
                            height={40}
                        />
                        <Image 
                            src={three} 
                            alt="Property image 3" 
                            className='rounded-full h-8 w-8 sm:h-10 sm:w-10 -ml-2'
                            width={40}
                            height={40}
                        />
                    </div>
                    <div className="txt text-xs sm:text-sm ml-8 sm:ml-12 w-[10rem]">
                        More than<br /><span className='-ml-0.5'>1000+</span> properties
                    </div>
                </div>
                <div className="second relative sm:ms-auto md:ms-[20rem] text-xs sm:text-sm">
                    <div className="rating flex">
                        <span className='mr-2 -mt-[0.1rem]'>5/5</span>
                        <div className="stars flex">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-3 sm:size-4">
                                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                </svg>
                            ))}
                        </div>
                    </div>
                    <div className="review w-max font-light mt-1">
                        <span>20 Reviews on Google</span>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}