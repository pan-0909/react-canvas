/*
 * @Author: panrunjun
 * @Date: 2024-06-17 17:25:21
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-06-17 17:54:56
 * @Description: 
 * @FilePath: \react-canvas\src\App.tsx
 */
import React from 'react'
import './App.css'

const draw = (ctx: any) => {
  console.log('draw')
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.moveTo(150, 20);
  ctx.arcTo(150, 100, 50, 20, 30);
  ctx.stroke();

  ctx.fillStyle = "blue";
  // base point
  ctx.fillRect(150, 20, 10, 10);

  ctx.fillStyle = "red";
  // control point one
  ctx.fillRect(150, 100, 10, 10);
  // control point two
  ctx.fillRect(50, 20, 10, 10);
  //
  ctx.setLineDash([5, 5]);
  ctx.moveTo(150, 20);
  ctx.lineTo(150, 100);
  ctx.lineTo(50, 20);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(120, 38, 30, 0, 2 * Math.PI);
  ctx.stroke();
}
function App() {
  const canvasRef = React.useRef(null)
  const [locations, setLocations] = React.useState([])

  return (
    <>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onClick={e => {
          const canvas = canvasRef.current
          const ctx = canvas.getContext('2d')
          // implement draw on ctx here
          draw(ctx)
        }}

      />
    </>
  )
}

export default App
