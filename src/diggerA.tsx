import React, { useState, useEffect, useRef } from "react";
const DiggerA = () => {
  const canvasRef = useRef(null);
  const [playerX, setPlayerX] = useState(100);
  const [playerY, setPlayerY] = useState(100);
  const [dirt, setDirt] = useState(
    Array(10)
      .fill(null)
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
          if (dirt[row][col] === 1) {
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
      let newDirt = [...dirt];

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

      // Calculate grid coordinates
      const gridX = Math.floor(newX / 40);
      const gridY = Math.floor(newY / 40);

      // Boundary check and collision detection with dirt
      if (newX >= 0 && newX <= 560 && newY >= 0 && newY <= 360) {
        if (dirt[gridY]?.[gridX] === 1) {
          // "Dig" the dirt
          newDirt[gridY][gridX] = 0;
          setDirt(newDirt);
        }
        setPlayerX(newX);
        setPlayerY(newY);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [playerX, playerY, dirt]);

  return <canvas ref={canvasRef} width={600} height={400} />;
};

export default DiggerA;
