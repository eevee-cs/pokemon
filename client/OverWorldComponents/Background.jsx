import React, { useRef, useEffect } from 'react';
import grassSprite from '../assets/images/grass.png';
import fieldSprite from '../assets/images/field.png';

// class Background extends React.Component {

//   render({grassArr}) {

const Background = ({ grassArr }) => {
  // canvasRef to be passed as a prop to provide access to the canvas to children components
  // the useRef hook has an HTML element on it's current property, so when a variable is set to
  // canvasRef.current, methods on it are LITERALLY html element methods (i.e. canvas html
  // element methods)
  // console.log(props.grassArr);
  const canvasRef = useRef(null);
  let grass;
  let field;
  // useEffect to draw to canvas, grass is passed through hidden div.
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.fillStyle = '#766fbd'; // pavement color (night time in crystal)
    // context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(
      field,
      0,
      0,
      canvas.width,
      canvas.height,
    );

    grassArr.forEach((oneGrassCoord) => {
      const [startLeft, startTop] = oneGrassCoord.split(',').map((e) => Number(e) * 25);
      context.fillStyle = '#419018'; // grass color
      context.drawImage(
        grass,
        startLeft,
        startTop,
        25,
        25,
      );
      // context.fillRect(
      //   startLeft, // starting X coordinate from top left
      //   startTop, // starting Y coordinate from top left
      //   25, // length of rectangle
      //   25, // length of rectangle
      // );
    });
  }, []);

  return (
    <div>
    <canvas
      ref={canvasRef}
      width={600}
      height={600}
    />
    <img ref={(img) => {grass = img}} src={grassSprite} alt="" style={{display: 'none'}} />
    <img ref={(img2) => {field = img2}} src={fieldSprite} alt="" style={{display: 'none'}} />
    </div>
  );
};

export default Background;
