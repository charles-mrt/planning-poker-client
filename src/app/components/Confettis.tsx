import React, { useState, useEffect } from "react"
import Confetti from 'react-confetti'

export const Confettis = () => {
  const [showConfetti, setShowConfetti] = useState(false);

  const confettiSource = {
    x: window.innerWidth / 2,
    y: window.innerHeight,
    w: 0,
    h: -window.innerHeight,
  };
  
  const customColors = ['##4299E1', '#9932CC', '#8A2BE2'];

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowConfetti(true);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div>
      {showConfetti && (
        <Confetti
          width={window.innerWidth || 300}
          height={window.innerWidth || 200}
          numberOfPieces={50}
          recycle={false}
          confettiSource={confettiSource}
          colors={customColors}
        />
      )}
    </div>
  );
};
