import React, { useState, useEffect, useRef } from "react";

const DiggerB = () => {
  const canvasRef = useRef(null);
  const [playerX, setPlayerX] = useState(0);
  const [playerY, setPlayerY] = useState(0);
  // Create a deep copy for the initial dirt array to avoid reference issues
  const [dirt, setDirt] = useState(() =>
    Array(10)
      .fill()
      .map(() => Array(15).fill(1))
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const gameLoop = () => {
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the dirt
      for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 15; col++) {
          if (dirt[row][col]) {
            ctx.fillStyle = "brown";
            ctx.fillRect(col * 40, row * 40, 40, 40);
          }
        }
      }

      // Draw the player
      ctx.fillStyle = "red";
      ctx.fillRect(playerX, playerY, 40, 40);

      requestAnimationFrame(gameLoop);
    };

    gameLoop();

    const handleKeyDown = (e) => {
      let newX = playerX;
      let newY = playerY;

      switch (e.key) {
        case "ArrowLeft":
          newX -= 40;
          break;
        case "ArrowUp":
          newY -= 40;
          break;
        case "ArrowRight":
          newX += 40;
          break;
        case "ArrowDown":
          newY += 40;
          break;
        default:
          break;
      }

      // Boundary check
      if (newX >= 0 && newX <= 560 && newY >= 0 && newY <= 360) {
        // Calculate grid position
        const gridRow = Math.floor(newY / 40);
        const gridCol = Math.floor(newX / 40);

        // Clear the dirt at the new position and allow movement
        setDirt((prevDirt) => {
          const newDirt = prevDirt.map((row) => [...row]);
          newDirt[gridRow][gridCol] = 0;
          return newDirt;
        });

        setPlayerX(newX);
        setPlayerY(newY);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [playerX, playerY, dirt]);

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl font-bold">Digger Game</h2>
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        className="border-2 border-gray-800"
      />
      <p className="text-sm">Use arrow keys to move and dig</p>
    </div>
  );
};

export default DiggerB;
