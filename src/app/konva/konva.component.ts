import {AfterViewInit, Component} from '@angular/core';
import Konva from "konva";
import {Tree} from "../_shapes/tree";
import {FemaleNPC} from "../_shapes/femaleNPC";
import {KonvaMode} from "@models/konva";

@Component({
  selector: 'app-konva',
  templateUrl: './konva.component.html',
  styleUrls: ['./konva.component.less']
})
export class KonvaComponent implements AfterViewInit {
  leftClickedShape?: Konva.Shape | Konva.Group;
  stage?: Konva.Stage;
  selectedLayer?: Konva.Layer;
  selectedMode: KonvaMode = KonvaMode.SELECT;
  transformer?: Konva.Transformer;

  ngAfterViewInit() {
    this.loadState();
  }

  addStageEventListeners() {
    if (this.stage) {
      this.stage.on('click', (event) => {
        if (this.stage && this.selectedLayer) {
          this.leftClickedShape = this.getClickTarget(event.target);

          if (this.leftClickedShape instanceof Konva.Shape || this.leftClickedShape instanceof  Konva.Group) {
            if (this.selectedMode === KonvaMode.SELECT) {
              this.transformer?.nodes([this.leftClickedShape]);
            }
          } else {
            switch (this.selectedMode) {
              case KonvaMode.FEMALE_NPC:
                const femaleNPC = new FemaleNPC(
                  event.evt.offsetX,
                  event.evt.offsetY,
                  50,
                  50,
                  false
                )
                femaleNPC.draw(this.selectedLayer);
                break;
              case KonvaMode.SELECT:
                this.transformer?.nodes([]);
                break;
              case KonvaMode.TREE:
                const tree = new Tree(
                  event.evt.offsetX,
                  event.evt.offsetY,
                  50,
                  75,
                  true
                )
                tree.draw(this.selectedLayer);
                break;
            }
          }
        }
      })
    }
  }

  getClickTarget(target: Konva.Shape | Konva.Stage): Konva.Shape | Konva.Group | undefined {
    if (target instanceof Konva.Stage) {
      return undefined;
    } else if (target.parent instanceof Konva.Group) {
      return target.parent;
    } else {
      return target;
    }
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

    this.transformer = new Konva.Transformer();
    this.selectedLayer.add(this.transformer);

    this.addStageEventListeners();

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

    // const tree = new Tree(
    //   200,
    //   300,
    //   50,
    //   75,
    //   true
    // )
    //
    // const femaleNPC = new FemaleNPC(
    //   300,
    //   400,
    //   50,
    //   50,
    //   false
    // )
    //
    // tree.draw(this.selectedLayer)
    // femaleNPC.draw(this.selectedLayer);
    // layer.add(rect);
  }

  protected readonly KonvaMode = KonvaMode;
}
