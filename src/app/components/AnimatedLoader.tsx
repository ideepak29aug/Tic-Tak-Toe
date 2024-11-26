import React from 'react'

function AnimatedLoader() {
    return (
        <div className="bg-[#ffe36d] h-screen w-screen flex justify-center items-center overflow-hidden">
            <div className='logo-animation text-[blueviolet] drop-shadow-xl flex justify-center items-center flex-col'>
                <div>
                    Welcome to Unbeatable
                </div>
                <div>
                    Tic Tac Toe Game
                </div>
            </div>
        </div>

    )
}

export default AnimatedLoader;