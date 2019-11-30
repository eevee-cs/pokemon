import React from 'react';
import eeveeImg from '../assets/images/eevee-sprite.png';
import pikachuImg from '../assets/images/pikachu-front.png';

class BattleWorld extends React.Component {
  componentDidMount() {
    const { canvasRef } = this.props;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.fillStyle = '#3a3acf';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#ffa500';
    // HP Bar Enemy
    context.fillRect(50, 10, 200, 20);
    context.font = '20px Arial';
    context.fillText('HP', 5, 25);
    context.fillStyle = '#ffa500';
    // HP Bar Player
    context.fillRect(450, 450, 200, 20);
    // eevee
    const eevee = this.refs.image;
    eevee.onload = () => {
      context.drawImage(eevee, 50, 500, 100, 100);
    };
    // pikachu
    const {pikachu} = this.refs;
    pikachu.onload = () => {
      context.drawImage(pikachu, 500, 50, 100, 100);
    };
  }

  render() {
    return (
      <>
        <img ref="image" src={eeveeImg} alt="" style={{ display: 'none' }} />
        <img ref="pikachu" src={pikachuImg} alt="" style={{ display: 'none' }} />
        <button type="button" onClick={() => this.props.toggleToWorld()}>im a button</button>
      </>

    );
  }
}

export default BattleWorld;
