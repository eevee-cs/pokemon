import React, { useRef, useEffect } from 'react';

const Background = ({ grassArr }) => {
  // canvasRef to be passed as a prop to provide access to the canvas to children components
  // the useRef hook has an HTML element on it's current property, so when a variable is set to
  // canvasRef.current, methods on it are LITERALLY html element methods (i.e. canvas html
  // element methods)
  // console.log(props.grassArr);
  const canvasRef = useRef(null);

  // useEffect to draw to canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.fillStyle = '#766fbd'; // pavement color (night time in crystal)
    context.fillRect(0, 0, canvas.width, canvas.height);

    grassArr.forEach((oneGrassCoord) => {
      const [startLeft, startTop] = oneGrassCoord.split(',').map((e) => Number(e) * 25);
      context.fillStyle = '#419018'; // grass color
      context.fillRect(
        startLeft, // starting X coordinate from top left
        startTop, // starting Y coordinate from top left
        25, // length of rectangle
        25, // length of rectangle
      );
    });
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={600}
    />
  );
};

export default Background;
