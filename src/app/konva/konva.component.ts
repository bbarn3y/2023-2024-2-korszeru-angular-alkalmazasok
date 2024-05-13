import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import Konva from "konva";
import {Tree} from "../_shapes/tree";
import {FemaleNPC} from "../_shapes/femaleNPC";
import {KonvaMode} from "@models/konva";
import {NzContextMenuService, NzDropdownMenuComponent} from "ng-zorro-antd/dropdown";
import {GenerateWorkerEvent, ShapesChangedWorkerEvent, WorkerEventType} from "@models/worker.model";

@Component({
  selector: 'app-konva',
  templateUrl: './konva.component.html',
  styleUrls: ['./konva.component.less']
})
export class KonvaComponent implements AfterViewInit {
  konvaScale: number = 1;
  leftClickedShape?: Konva.Shape | Konva.Group;
  rightClickedShape?: Konva.Shape | Konva.Group;
  stage?: Konva.Stage;
  selectedLayer?: Konva.Layer;
  selectedLayerIndex: number = 0;
  selectedMode: KonvaMode = KonvaMode.SELECT;
  transformer?: Konva.Transformer;
  worker?: Worker;

  @ViewChild('menu') contextMenuEl!: NzDropdownMenuComponent;

  constructor(private elRef: ElementRef,
              private nzContextMenuService: NzContextMenuService) {}

  ngAfterViewInit() {
    this.worker = new Worker(new URL('src/app/_workers/konva.worker.ts', import.meta.url));

    this.worker.onmessage = ( ({data}) => {
      console.log('main thread received a message', data);

      if (data.type === WorkerEventType.SHAPES_CHANGED) {
        const shapesChangedWorkEvent = (data as ShapesChangedWorkerEvent);
        shapesChangedWorkEvent.addedShapes.forEach((shape) => {
          this.addNewShapeFromJSON(shape);
        });
        shapesChangedWorkEvent.modifiedShapes.forEach((shape) => {
          this.modifyShapeFromJSON(shape);
        })
      }
    });

    this.worker.onerror = ( (error) => {
      console.log('Error on worker', error);
    })

    this.worker.postMessage('test message');

    this.loadState();

    document.addEventListener('keydown', (e) => {
      switch (e.code) {
        case 'ArrowUp':
          this.leftClickedShape?.y(this.leftClickedShape.y() - 5);
          break;
        case 'ArrowDown':
          this.leftClickedShape?.y(this.leftClickedShape.y() + 5);
          break;
        case 'ArrowLeft':
          this.leftClickedShape?.x(this.leftClickedShape.x() - 5);
          break;
        case 'ArrowRight':
          this.leftClickedShape?.x(this.leftClickedShape.x() + 5);
          break;
      }
    });
  }

  addNewShapeFromJSON(shapeJSON: string) {
    const shape = Konva.Node.create(JSON.parse(shapeJSON));
    if (shape instanceof Konva.Shape || shape instanceof Konva.Group) {
      this.selectedLayer?.add(shape);
    }
  }

  modifyShapeFromJSON(shapeJSON: string) {
    const parsedShape = JSON.parse(shapeJSON);
    let existingShape = this.selectedLayer?.children
      ?.find((child) => child.attrs.elementId === parsedShape.attrs.elementId);
    if (existingShape) {
      const keys = Object.keys(parsedShape.attrs);
      keys.forEach(key => {
        existingShape?.setAttr(key, parsedShape.attrs[key]);
      })
    }
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

      this.stage.on('contextmenu', (event) => {
        event.evt.preventDefault();
        this.rightClickedShape = this.getClickTarget(event.target);

        if (this.rightClickedShape) {
          this.nzContextMenuService.create({
            x: event.target.getClientRect().x,
            y: this.elRef.nativeElement.getBoundingClientRect().y + event.target.getClientRect().y
          }, this.contextMenuEl)
        }
      });

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

  deleteShape() {
    this.rightClickedShape?.destroy();
  }

  generateRandomShapes() {
    this.worker?.postMessage(new GenerateWorkerEvent(10));
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

  goHome() {
    this.rightClickedShape?.to({
      x: this.rightClickedShape?.getClientRect().x * -1,
      y: this.rightClickedShape?.getClientRect().y * -1,
      duration: 5
    })
  }

  loadState() {
    this.stage = new Konva.Stage({
      container: 'konva-container',   // id of container <div>
      width: window.innerWidth,
      height: window.innerHeight
    });

    const layer1 = new Konva.Layer();
    const layer2 = new Konva.Layer();
    this.stage.add(layer1);
    this.stage.add(layer2);

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

  selectedLayerChanged(index: number) {
    this.selectedLayer = this.stage?.getLayers()[index];
    this.stage?.getLayers().forEach((layer, i) => {
      layer.listening(index === i);
    });
    this.transformer?.nodes([]);
  }

  protected readonly KonvaMode = KonvaMode;
}
