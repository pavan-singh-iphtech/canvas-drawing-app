import { Component, ElementRef, ViewChild } from '@angular/core';
@Component({
  selector: 'app-drawing-canvas',
  templateUrl: './drawing-canvas.component.html',
  styleUrls: ['./drawing-canvas.component.css']
})
export class DrawingCanvasComponent {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  ngOnInit() {
    this.ctx = this.canvasRef.nativeElement.getContext('2d') as CanvasRenderingContext2D;
  }
  ngAfterViewInit() {
    this.canvasRef.nativeElement.width = 800;
    this.canvasRef.nativeElement.height = 600;
  }
  drawing = false;
  onMouseDown(event: MouseEvent) {
    this.drawing = true;
    this.draw(event);
  }
  onMouseMove(event: MouseEvent) {
    if (!this.drawing) return;
    this.draw(event);
  }
  onMouseUp() {
    this.drawing = false;
    this.ctx.beginPath();
  }
  draw(event: MouseEvent) {
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

  toggleEraser() {
  
      this.ctx.globalCompositeOperation = 'destination-out';
    
  }
  drawEraser(){
    this.ctx.globalCompositeOperation = 'source-over';
  }
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
  }
  selectedColor: string = "#000000"; // Default color is black
  onColorChange(event: any) {
    console.log(event.target.value)
    this.selectedColor = event.target.value;
    this.ctx.strokeStyle = this.selectedColor;
  }
  pickFillColor: string = "#ff0000"
  fillColor() {
    console.log("I am fill color");
    this.ctx.fillStyle = this.pickFillColor;
    this.ctx.fillRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
  }

  // ... Rest of your existing methods ...
}
  // downloadFile(){
  //   const link = document.createElement("a");
  //        const content = document.querySelector("canvas").value;
  //        const file = new Blob([content], { type: 'png' });
  //        link.href = URL.createObjectURL(file);
  //        link.download = "sample.png";
  //        link.click();
  //        URL.revokeObjectURL(link.href);
  // }

  // ngAfterViewInit() {
  //   // this.canvas = document.querySelector('canvas');
  //   const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
  //   const ctx: CanvasRenderingContext2D = canvas.getContext("2d");

  //   canvas.height = window.innerHeight;
  //   canvas.width = window.innerWidth;

  //   let painting = false;

  //   function startPosition(event: MouseEvent) {
  //     painting = true;
  //     draw(event); // Start drawing immediately when the mouse is pressed
  //   }

  //   function finishedPosition() {
  //     painting = false;
  //     ctx.beginPath(); // Reset the drawing path
  //   }

  //   function draw(event: MouseEvent) {
  //     if (!painting) return;

  //     ctx.lineWidth = 10;
  //     ctx.lineCap = "round";

  //     ctx.lineTo(event.clientX, event.clientY);
  //     ctx.stroke();

  //     ctx.beginPath(); // Begin a new path for continuous drawing
  //     ctx.moveTo(event.clientX, event.clientY);
  //   }

  //   canvas.addEventListener("mousedown", startPosition);
  //   canvas.addEventListener("mouseup", finishedPosition);
  //   canvas.addEventListener("mousemove", draw);
  // }

    
    
  //   if (this.canvas) {
  //     this.canvas.width = window.innerWidth;
  //     this.canvas.height = window.innerHeight;
  //     var c = this.canvas.getContext('2d');
  //     // c?.fillRect(100, 100, 100, 100);
  //     // c?.fillRect(400, 100, 100, 100);
  //     // c?.fillRect(300, 300, 100, 100);
  //     // console.log(this.canvas);
  //     // line
  //     // c?.beginPath();
  //     // c?.moveTo(50, 300);
  //     // c?.lineTo(300, 100);
  //     // c?.lineTo(400, 300);
  //     // c?.stroke();
  //     // Arc/Circle
  //     // c?.beginPath();
  //     // c?.arc(300, 300, 30, 0, Math.PI * 2, false);
  //     // c?.stroke();
  //     // for(var i =0;i<3;i++){
  //     //   var x = Math.random()* window.innerWidth;
  //     //   var y = Math.random() *window.innerHeight;
  //     //   c?.beginPath();
  //     //   c?.arc(x,y, 30, 0, Math.PI *2,false);
  //     //   c?.stroke();
  //     // }
  //     class Circle {
  //       x: number;
  //       y: number;
  //       dx: number;
  //       dy: number;
  //       radius: number;

  //       constructor(x: number, y: number, dx: number, dy: number, radius: number) {
  //         this.x = x;
  //         this.y = y;
  //         this.dx = dx;
  //         this.dy = dy;
  //         this.radius = radius;
  //       }

  //       draw = () => { // Use arrow function to retain the correct 'this'
  //         c?.beginPath();
  //         c?.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  //         const rabdomColor = getRandomColor(); // Call a function to get a random color
  //         if(c){
  //           c.fillStyle = rabdomColor;
  //           c.fill();
  //         }
  //         c?.stroke();
  //       };

  //       update = () => { // Use arrow function to retain the correct 'this'
  //         if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
  //           this.dx = -this.dx;
  //         }
  //         if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
  //           this.dy = -this.dy;
  //         }
  //         this.x += this.dx;
  //         this.y += this.dy;
  //       };
  //     }
  //     const circleArray: Circle[] = [];
  //   // color function
  //   function getRandomColor (){
  //     const letters = '0123456789ABCDEF';
  // let color = '#';
  // for (let i = 0; i < 6; i++) {
  //   color += letters[Math.floor(Math.random() * 16)];
  // }
  // return color;
  //   }
  //     for(var i=0; i<100;i++){
  //       var x = Math.random() * innerWidth;
  //       var y = Math.random() * innerWidth;
  //       var dx = (Math.random() - 0.5) * 8;
  //       var dy = (Math.random() - 0.5) * 8;
  //       var radius = 30;
  //       circleArray.push(new Circle(x, y, dx, dy, radius))

  //     }
  //     // var circle = new Circle (200, 200, 3, 3, 30)

  //     // var x = Math.random() * innerWidth;
  //     // var y = Math.random() * innerWidth;
  //     // var dx = (Math.random() - 0.5) * 8;
  //     // var dy = (Math.random() - 0.5) * 8;
  //     // var radius = 30;
  //     function animate() {
  //       requestAnimationFrame(animate);
  //       c?.clearRect(0,0, innerWidth, innerHeight);
  //       for(var i = 0; i < circleArray.length; i++ ){
  //         circleArray[i].update();
  //         circleArray[i].draw();
  //       }
  //       // circle.update()
  //       // // circle.draw();
  //       // c?.beginPath();
  //       // c?.arc(x, y, radius, 0, Math.PI * 2, false);
  //       // c?.stroke();
        
  //     }
  //     animate();
  //   }

  
