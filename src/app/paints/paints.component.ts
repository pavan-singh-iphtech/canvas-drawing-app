import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-paints',
  templateUrl: './paints.component.html',
  styleUrls: ['./paints.component.css']
})
export class PaintsComponent implements AfterViewInit {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('fillColor') fillColorInput!: ElementRef<HTMLInputElement>;
  @ViewChild('sizeSlider') sizeSlider!: ElementRef<HTMLInputElement>;

  private ctx!: CanvasRenderingContext2D;
  private isDrawing = false;
  private brushWidth = 5;
  private selectedTool = 'brush';
  private prevMouseX!: number;
  private prevMouseY!: number;
  private snapshot!: ImageData;
  constructor() {} // Add an empty constructor

  ngAfterViewInit(): void {
    // Move the initialization of ctx to this method
    this.ctx = this.canvasRef.nativeElement.getContext('2d') as CanvasRenderingContext2D;

    window.addEventListener('load', () => {
      this.canvasRef.nativeElement.width = this.canvasRef.nativeElement.offsetWidth;
      this.canvasRef.nativeElement.height = this.canvasRef.nativeElement.offsetHeight;
    });

    const toolBtns = document.querySelectorAll('.tool');
    toolBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelector('.options .active')?.classList.remove('active');
        btn.classList.add('active');
        this.selectedTool = btn.id;
        console.log(btn.id)
      });
    });

    this.canvasRef.nativeElement.addEventListener('mousedown', this.startDraw);
    this.canvasRef.nativeElement.addEventListener('mousemove', this.drawing);
    this.canvasRef.nativeElement.addEventListener('mouseup', () => this.isDrawing = false);
  }

  private drawRect(e: MouseEvent): void {
    console.log("I am rectangle")
    if (!this.ctx || !this.canvasRef || !this.fillColorInput) return; // Ensure ctx and elements are defined

  if (!this.fillColorInput.nativeElement.checked) {
    this.ctx.strokeRect(
      this.prevMouseX,
      this.prevMouseY,
      e.offsetX - this.prevMouseX,
      e.offsetY - this.prevMouseY
    );
  } else {
    this.ctx.fillRect(
      this.prevMouseX,
      this.prevMouseY,
      e.offsetX - this.prevMouseX,
      e.offsetY - this.prevMouseY
    );
  }

  }

  private drawCircle(e: MouseEvent): void {
    console.log("I am draw circle")
    this.ctx.beginPath();
    const radius = Math.sqrt(Math.pow((this.prevMouseX - e.offsetX), 2) + Math.pow((this.prevMouseY - e.offsetY), 2));
    this.ctx.arc(this.prevMouseX, this.prevMouseY, radius, 0, 2 * Math.PI);
    this.fillColorInput.nativeElement.checked ? this.ctx.fill() : this.ctx.stroke();
  }

  private startDraw = (e: MouseEvent): void => {
    this.isDrawing = true;
    this.prevMouseX = e.offsetX;
    this.prevMouseY = e.offsetY;
    this.ctx.beginPath();
    this.ctx.lineWidth = this.brushWidth;
    this.snapshot = this.ctx.getImageData(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
  }
  private drawing = (e: MouseEvent): void => {
    if (!this.isDrawing) return;
    this.ctx.putImageData(this.snapshot, 0, 0);
  
    if (this.selectedTool === 'brush') {
      this.ctx.lineTo(e.offsetX, e.offsetY);
      this.ctx.stroke();
    } else if (this.selectedTool === 'rectangle') {
      this.drawRect(e);
    } else if (this.selectedTool === 'circle') {
      this.drawCircle(e);
    } else if (this.selectedTool === 'triangle') {
      this.drawTriangle(e);
    } else if (this.selectedTool === 'eraser') {
      this.erase(e);
    }
  }
  
  private drawTriangle(e: MouseEvent): void {
    if (!this.ctx) return; // Ensure ctx is defined
    
  }
  
  
  private erase(e: MouseEvent): void {
    if (!this.ctx) return; // Ensure ctx is defined
    this.ctx.globalCompositeOperation = 'destination-out'; // Set eraser mode
    this.ctx.strokeStyle = 'white'; // Set the color to white
    this.ctx.lineWidth = this.brushWidth;
    this.ctx.lineTo(e.offsetX, e.offsetY);
    this.ctx.stroke();
    this.ctx.globalCompositeOperation = 'source-over'; // Restore default blending mode
  }
  
  clearCanvas(): void {
    this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
  }

  saveAsImage(): void {
    const canvas = this.canvasRef.nativeElement;
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = 'canvas_image.png';
    link.click();
  }
}
