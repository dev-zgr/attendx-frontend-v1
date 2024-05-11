import React, {useEffect, useState} from 'react';

const phrases = ["modern", "faster", "reliable", "easy", "sustainable", "cloud-native", "scalable", "resilient"];

const HomePageHeader = ({prefix}) => {
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [showPhrase, setShowPhrase] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setShowPhrase(false);
            setTimeout(() => {
                setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
                setShowPhrase(true); // Show new phrase after hiding
            }, 500);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="text-center mt-10">

            <h1 className="text-5xl font-bold text-cyan-950">
                {prefix} makes attendance
            </h1>
            <div className={`text-6xl font-bold  transition-opacity duration-500 ${showPhrase ? 'opacity-100' : 'opacity-0'}`}>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-blue-500">
    {               phrases[phraseIndex]}
                </span>
            </div>
        </div>
    );
};

export default HomePageHeader;


// <h2 className={`text-6xl font-bold text-sky-600 transition-opacity duration-500 ${showPhrase ? 'opacity-100' : 'opacity-0'}`}>
//     {phrases[phraseIndex]}
// </h2>