import React from 'react';


class BattleWorld extends React.Component {
  componentDidMount() {
    // const { canvasRef } = this.props;
    // const canvas = canvasRef.current;
    // const context = canvas.getContext('2d');
    // context.fillStyle = '#3a3acf';
    // context.fillRect(0, 0, canvas.width, canvas.height);
  }

  render() {
    return (
      <>
        <h1>Battle World</h1>
        <button type="button" onClick={() => this.props.toggleToWorld()}>im a button</button>
      </>

    );
  }
}

export default BattleWorld;
