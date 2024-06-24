/*
 * @Author: panrunjun
 * @Date: 2024-06-17 17:25:21
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-06-24 17:11:59
 * @Description: 
 * @FilePath: \react-canvas\src\App.tsx
 */
import React, { useEffect } from 'react'
import './App.css'
// import {Button} from 'antd'
import Button from './class/Button'
import Draggable from './class/Draggable'

function App() {
  const canvasRef = React.useRef(null)
  const [locations, setLocations] = React.useState([])


  useEffect(() => {
    const canvas = canvasRef.current as any
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const button = new Button(ctx, 50, 50, 200, 50, 'Click Me', () => {
          // alert('Button clicked!');
          console.log("e")
        });
        new Draggable(button, canvas);

        const button2 = new Button(ctx, 300, 50, 200, 50, 'Click Me2', () => {
          // alert('Button clicked!');
          console.log("e")
        });
        button2.draw();
        button.draw();
        // 防止重复绑定，先移除之前可能已添加的事件监听器
        const handleClick = button.handleClick.bind(button);
        const handleClick2 = button.handleClick.bind(button2);
        canvas.addEventListener('click', handleClick);
        canvas.addEventListener('click', handleClick2);
        // 清理函数，在组件卸载或更新时移除事件监听器
        return () => {
          canvas.removeEventListener('click', handleClick);
          canvas.removeEventListener('click', handleClick2);
        };
      }
    }
  }, [])
  return (
    <>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      // onClick={e => {
      //   const canvas = canvasRef.current
      //   const ctx = canvas.getContext('2d')
      //   // implement draw on ctx here
      //   draw(ctx)
      // }}
      />
    </>
  )
}

export default App
