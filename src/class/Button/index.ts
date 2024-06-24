/*
 * @Author: panrunjun
 * @Date: 2024-06-24 15:31:15
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-06-24 17:11:17
 * @Description: 
 * @FilePath: \react-canvas\src\class\Button\index.ts
 */

export default class Button {
    ctx: CanvasRenderingContext2D;
    x: number;
    y: number;
    width: number;
    height: number;
    text: string;
    onClick: () => void;
    constructor(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, text: string, onClick: () => void) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
        this.onClick = onClick;
    }

    draw() {
        this.ctx.fillStyle = 'blue';
        this.ctx.fillRect(this.x, this.y, this.width, this.height);

        // 绘制按钮文本
        this.ctx.fillStyle = '#fff';
        this.ctx.font = '20px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2);

    }

    handleClick(event: MouseEvent) {
        // 获取画布的边界矩形
        const rect = this.ctx.canvas.getBoundingClientRect();

        // 计算鼠标的点击位置
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        // 检查鼠标是否在按钮区域内
        if (
            mouseX >= this.x &&
            mouseX <= this.x + this.width &&
            mouseY >= this.y &&
            mouseY <= this.y + this.height
        ) {
            this.onClick();
        }
    }

    // 点击是否在button内
    isInside(x: number, y: number) {
        return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height;
      }
}