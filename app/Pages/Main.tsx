import React from 'react'

function Main() {
    return (
        <div className="relative flex flex-col items-center w-screen h-screen overflow-hidden bg-white text-black">

            {/* Author Avatar */}
            <div className="mt-6 flex flex-col items-center">
                <img
                    src="/author.jpg"
                    alt="Author"
                    className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border-2 border-black shadow-lg object-cover"
                />
                <div className="mt-2 font-semibold text-lg sm:text-xl md:text-2xl tracking-wide text-center">Author Name</div>
            </div>

            {/* Title + Description Block */}
            <div className="absolute bottom-40 sm:bottom-40 left-1/2 -translate-x-1/2 w-[95%] sm:w-[85%] md:w-[70%] lg:w-[50%] bg-black/10 backdrop-blur-md text-black p-4 sm:p-5 md:p-6 rounded-2xl shadow-lg flex flex-col items-start">
                <div className="flex items-center justify-between w-full">
                    <div className="font-bold text-xl sm:text-2xl md:text-3xl">Title</div>
                    <div className="text-xs sm:text-sm md:text-base opacity-60 mt-1">Date</div>
                </div>
                <div className="text-sm sm:text-base md:text-lg opacity-80 mt-1">Description goes here and wraps nicely.</div>
            </div>

            {/* Bottom Interaction Bar */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[95%] sm:w-[85%] md:w-[80%] lg:w-[60%] h-16 sm:h-18 md:h-20 bg-black/10 backdrop-blur-xl rounded-3xl flex items-center justify-around px-4 sm:px-6 md:px-8 shadow-lg">
                <div className="flex justify-end w-full gap-3 sm:gap-5 md:gap-6">
                    <button className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-black/10 backdrop-blur-md flex items-center justify-center text-xs sm:text-sm md:text-base">Like</button>
                    <button className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-black/10 backdrop-blur-md flex items-center justify-center text-xs sm:text-sm md:text-base">Comment</button>
                    <button className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-black/10 backdrop-blur-md flex items-center justify-center text-xs sm:text-sm md:text-base">View</button>
                    <button className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-black/10 backdrop-blur-md flex items-center justify-center text-xs sm:text-sm md:text-base">Next</button>
                </div>
            </div>

            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-[95%] sm:w-[85%] md:w-[80%] lg:w-[60%] h-12 sm:h-18 md:h-20 bg-black/10 backdrop-blur-xl rounded-3xl flex items-center justify-around px-4 sm:px-6 md:px-8 shadow-lg">
                {/* Search Icon Left */}
                <button className="absolute left-[12%] sm:left-[16%] md:left-[18%] lg:left-[22%] w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center shadow-md text-[10px] sm:text-xs md:text-sm">
                    S - L
                </button>

                {/* Search Icon Right */}
                <button className="absolute right-[12%] sm:right-[16%] md:right-[18%] lg:right-[22%] w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center shadow-md text-[10px] sm:text-xs md:text-sm">
                    S - R
                </button>

                {/* User Profile Icon */}
                <button className="absolute left-1/2 -translate-x-1/2 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-gray-400 flex items-center justify-center shadow-md text-xs sm:text-sm md:text-base">
                    U
                </button>

            </div>
        </div>
    )
}

export default Main