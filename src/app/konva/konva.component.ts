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
  konvaScale: number = 1;
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
          let pointer = this.stage.getPointerPosition();
          this.leftClickedShape = this.getClickTarget(event.target);

          if (this.leftClickedShape instanceof Konva.Shape || this.leftClickedShape instanceof  Konva.Group) {
            if (this.selectedMode === KonvaMode.SELECT) {
              this.transformer?.nodes([this.leftClickedShape]);
            }
          } else {
            switch (this.selectedMode) {
              case KonvaMode.FEMALE_NPC:
                if (pointer) {
                  const femaleNPC = new FemaleNPC(
                    (pointer.x - this.stage.x()) / this.konvaScale,
                    (pointer.y - this.stage.y()) / this.konvaScale,
                    50,
                    50,
                    false
                  )
                  femaleNPC.draw(this.selectedLayer);
                }
                break;
              case KonvaMode.SELECT:
                this.transformer?.nodes([]);
                break;
              case KonvaMode.TREE:
                if (pointer) {
                  const tree = new Tree(
                    (pointer.x - this.stage.x()) / this.konvaScale,
                    (pointer.y - this.stage.y()) / this.konvaScale,
                    50,
                    75,
                    true
                  )
                  tree.draw(this.selectedLayer);
                }
                break;
            }
          }
        }
      })

      this.stage.on('wheel', (event) => {
        event.evt.preventDefault();

        if (this.stage) {
          let pendingScaleBy = 1.03;
          let oldScale = this.stage.scaleX();
          let direction = event.evt.deltaY;
          let pointer = this.stage.getPointerPosition();

          if (pointer) {
            let mousePointsTo = {
              x: (pointer.x - this.stage.x()) / oldScale,
              y: (pointer.y - this.stage.y()) / oldScale
            }

            this.konvaScale = direction < 0 ? oldScale * pendingScaleBy : oldScale / pendingScaleBy;

            this.stage.position({
              x: pointer.x - mousePointsTo.x * this.konvaScale,
              y: pointer.y - mousePointsTo.y * this.konvaScale
            });
            this.stage.scale({
              x: this.konvaScale,
              y: this.konvaScale
            });
          }
        }
      });
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
