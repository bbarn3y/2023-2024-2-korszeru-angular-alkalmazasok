import {AfterViewInit, Component} from '@angular/core';
import Konva from "konva";

@Component({
  selector: 'app-konva',
  templateUrl: './konva.component.html',
  styleUrls: ['./konva.component.less']
})
export class KonvaComponent implements AfterViewInit {
  stage?: Konva.Stage;
  selectedLayer?: Konva.Layer;
  ngAfterViewInit() {
    this.loadState();
  }

  loadState() {
    this.stage = new Konva.Stage({
      container: 'konva-container',   // id of container <div>
      width: window.innerWidth,
      height: window.innerHeight
    });

    const layer = new Konva.Layer();
    this.stage.add(layer);

    this.selectedLayer = this.stage.getLayers()[0];

    const rect = new Konva.Rect({
      x: 50,
      y: 100,
      width: 100,
      height: 30,
      fill: '#00D2FF',
      stroke: 'green',
      strokeWidth: 3,
      draggable: true,
    });

    layer.add(rect);
  }

}
