import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DrawingCanvasComponent } from './drawing-canvas/drawing-canvas.component';
import { PaintsComponent } from './paints/paints.component';
import { ShapeComponent } from './shape/shape.component';

@NgModule({
  declarations: [
    AppComponent,
    DrawingCanvasComponent,
    PaintsComponent,
    ShapeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
