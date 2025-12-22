import React from 'react'
import { useEffect, useState } from 'react'

export default function DinoGame() {
    const gameAreaWidth=600;
    const obstacleWidth=25;
    const dinoWidth=35;



    const dinoX=40;
    const gravity=3;
    const jumpHeight=80;

    const [obstacles, setObstacles] = useState([{x: gameAreaWidth}]);
    const [score , setScore]= useState (0);
    const [speed , setSpeed]= useState (5);
    const [dinoY, setDinoY] = useState(0);
    const [isJumping, setIsJumping] = useState(false);
    const [hasScored, setHasScored] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);

    const[showTapHint, setShowTapHint]= useState (true);



useEffect(() => {
    if (!isPlaying) return;

    const gameInterval = setInterval(() => {
        setObstacles(prevObs =>
            prevObs.map((obs, idx)=>{
                let nextX= obs.x - speed;

                //scoring
                if (!hasScored && idx===0 && nextX + obstacleWidth < dinoX){
                    setScore (s=>{
                        const newScore = s + 1;
                        //increase speed every 16 points
                        if (newScore % 16 === 0) {
                            setSpeed(sp => sp + 0.5);
                        }
                        return newScore;
                    })
                    setHasScored (true);
                }
                //reset obstacle
                if (nextX < -obstacleWidth) {
                    
                    nextX= gameAreaWidth + Math.random() * 300;
                    setHasScored (false);
                }

                //collision
                if (
                    nextX < dinoX + dinoWidth &&
                    nextX + obstacleWidth > dinoX &&
                    dinoY < 25 // obstacle height
                ) {
                    setIsGameOver(true);
                    setIsPlaying(false);
                }
                return {...obs, x: nextX};
            })
        );
        
        //jump+gravity
        setDinoY (prevY => {
            if (isJumping) {
                const nextY = prevY + 10
                if (nextY >= jumpHeight) {
                    setIsJumping(false);
                    return jumpHeight;
                }
                return nextY;
            } else{
                const nextY = prevY - gravity;
                return nextY < 0 ? 0 : nextY;
            }
        })
    }, 20);
    return () => clearInterval (gameInterval);
}, [isPlaying, isJumping, speed, dinoY, hasScored]);

//add obs
useEffect(() => {
    setObstacles(prevObs =>{
        const newObs= [...prevObs];
        if (score >=10 && prevObs.length ===1) {
            newObs.push({x: gameAreaWidth + 300});
        }
        if (score >=20 && prevObs.length ===2) {
            newObs.push({x: gameAreaWidth + 600});
        }
        if (score >=30 && prevObs.length ===3) {
            newObs.push({x: gameAreaWidth + 900});
        }
        return newObs;

    })
}, [score]);

useEffect(() => {
    const handleKeyDown = e=>{
        if ((e.key === ' ' || e.key === 'Space') && !isGameOver) {
            e.preventDefault()
            handleJump();
        }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
    },[isPlaying, isJumping]);

    const handleJump = () => {
        if (!isPlaying) {
            startGame();
            setIsJumping(true);
            setShowTapHint(false);
            return
        }
        if (!isJumping) setIsJumping(true);
    }



const startGame = () => {
    setIsPlaying(true);
    setIsGameOver(false);
    setScore(0);
    setSpeed(5);
    setObstacles([{x: gameAreaWidth}]);
    setDinoY(0);
    setIsJumping(false);
    setHasScored(false);
    setShowTapHint(false);
}
const resetGame = () => {
    startGame(); 
    setShowTapHint(true);
}

if (isGameOver) {
    return (
      <div
        
        style={{ outline: 'none' }}>
        <h1 className='gameOver'>Game Over</h1>
        <div id="score">Final Score: {score}</div>
        <button onClick={resetGame} className='restart'>Restart Game</button>
      </div>
    );
  }

  return (
    <div
      
      
      onClick={handleJump}
      style={{ outline: 'none' }}>
      <h1>Dino Game</h1>

      <div id="gameArea">
        {showTapHint && !isPlaying && !isGameOver && (
            <div className='tapHint'>TAP TO JUMP</div>
        )}
        <div id="dino"
        style={{
            position: 'absolute',
            bottom: dinoY,
            left: dinoX,
        }}>
            🦖
        </div>
        {obstacles.map((obs, idx) => (
            <div 
            key={idx}
            id="obstacle" 
            style={{
                left: obs.x,
                position: 'absolute',
                bottom: 0,
                }}
            >
                🌵
            </div>
        ))}
        </div>
    
      <div id="score">Score: {score}</div>
        {!isPlaying && !isGameOver && (
            <button onClick={startGame} className='start'>Start Game</button>
        )}
        {isGameOver && (
            <button onClick={resetGame} className='restart'>Restart Game</button>
        )}
    </div>
  )
}