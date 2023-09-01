import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-shape',
  templateUrl: './shape.component.html',
  styleUrls: ['./shape.component.css']
})
export class ShapeComponent {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;

  ngOnInit() {
    this.ctx = this.canvasRef.nativeElement.getContext('2d') as CanvasRenderingContext2D;
    this.canvasRef.nativeElement.width = 800;
    this.canvasRef.nativeElement.height = 600;
    this.drawMode = 'freeform'; // Initialize to freeform mode
   
    this.rectangles = [];
  }

  drawMode: 'freeform' | 'rectangle' = 'freeform';
  rectangles: { x: number; y: number; width: number; height: number }[] = [];
  startX = 0;
  startY = 0;
 drawing = false;
  onMouseDown(event: MouseEvent) {
   
    if (this.drawMode === 'rectangle') {
      this.drawing = true;
      this.startX = event.offsetX;
      this.startY = event.offsetY;
    } else {
      // Handle freeform drawing mode or other modes here
      this.drawing = true;
      this.MyDraw(event);
    }
  }

  onMouseMove(event: MouseEvent) {
    if (this.drawMode === 'rectangle' && this.drawing) {
      const x = event.offsetX;
      const y = event.offsetY;

      this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
      this.ctx.strokeRect(this.startX, this.startY, x - this.startX, y - this.startY);
    } else {
      // Handle freeform drawing mode or other modes here
      
    }
  }

  onMouseUp() {
    this.drawing = false;
    if (this.drawMode === 'rectangle' && this.drawing) {
      const rect = {
        x: this.startX,
        y: this.startY,
        width: this.canvasRef.nativeElement.width - this.startX,
        height: this.canvasRef.nativeElement.height - this.startY,
      };
      this.rectangles.push(rect);
      this.drawing = false;
      this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
      this.draw();
    } else {
      // Handle freeform drawing mode or other modes here
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);

    for (const rect of this.rectangles) {
      this.ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
    }
  }
  MyDraw(event: MouseEvent) {
    const x = event.offsetX;
    const y = event.offsetY;

    if (!this.drawing) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
    } else {
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
    }
  }


  switchToFreeform() {
    this.drawMode = 'freeform';
  }

  switchToRectangle() {
    this.drawMode = 'rectangle';
  }
}
