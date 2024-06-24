import Button from "../Button";

/*
 * @Author: panrunjun
 * @Date: 2024-06-24 16:26:51
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-06-24 17:53:40
 * @Description: 
 * @FilePath: \react-canvas\src\class\Draggable\index.ts
 */
export default class Draggable {
    private isDragging: boolean = false;
    private canvasData: ImageData | null;
    private ctx: CanvasRenderingContext2D;
    private target: Button;
    private canvas: HTMLCanvasElement;
    constructor(target: Button, canvas: HTMLCanvasElement) {
        this.canvasData = null;
        this.target = target;
        this.isDragging = false;
        this.ctx = canvas.getContext('2d')!;
        this.canvas = canvas;
        
        // 初始化事件监听器
        this.canvas.addEventListener('mousedown', (event) => {
            this.handleMouseDown(event)
        })
        this.canvas.addEventListener('mousemove', (event) => {
            this.handleMouseMove(event)
        })
        this.canvas.addEventListener('mouseup', () => {
            this.handleMouseUp()
        })
    }

    private handleMouseDown(event: MouseEvent) {
        if (this.target.isInside(event.offsetX, event.offsetY)) {
            this.isDragging = true;
            this.saveCanvasState(); 
        }
    }
    private handleMouseMove(event: MouseEvent) {
        if (this.isDragging) {
            const newX  = event.offsetX - this.target.width / 2;
            const newY  = event.offsetY - this.target.height / 2;

            this.clearTargetArea(this.target.x, this.target.y, this.target.width, this.target.height);
            this.target.x = newX;
            this.target.y = newY;
            this.target.draw();
        }
    }
    private handleMouseUp() {
        this.isDragging = false;
        this.restoreCanvasState();
    }

    private clearCanvas() {
        const ctx = this.target['ctx'];
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // 保存画布状态
    private saveCanvasState() {
        this.canvasData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    }

    // 清除目标区域
    private clearTargetArea(x: number, y: number, width: number, height: number) {
        this.ctx.clearRect(x, y, width, height);
        if (this.canvasData) {
            const imageData = this.ctx.getImageData(x, y, width, height);
            this.ctx.putImageData(imageData, x, y);
        }
    }

    // 绘制目标
    private drawTarget() {
        this.target.draw();
    }

     // 恢复画布状态
     private restoreCanvasState() {
        if (this.canvasData) {
            this.ctx.putImageData(this.canvasData, 0, 0);
        }
    }

}