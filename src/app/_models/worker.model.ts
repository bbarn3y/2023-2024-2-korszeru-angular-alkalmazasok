export enum WorkerEventType {
  GENERATE = 'GENERATE',
  SHAPES_CHANGED = 'SHAPED_CHANGED'
}

export class WorkerEvent {
  type: WorkerEventType;

  constructor(type: WorkerEventType) {
    this.type = type;
  }
}

export class GenerateWorkerEvent extends WorkerEvent {
  amount: number;

  constructor(amount: number) {
    super(WorkerEventType.GENERATE);
    this.amount = amount;
  }
}

export class ShapesChangedByLayerID {
  layerId: string;
  shapes: string[];

  constructor(layerId: string, shapes: string[]) {
    this.layerId = layerId;
    this.shapes = shapes;
  }
}

export class ShapesChangedWorkerEvent extends WorkerEvent {
  addShapes: ShapesChangedByLayerID[];
  modifiedShapes: ShapesChangedByLayerID[];

  constructor(addShapes: ShapesChangedByLayerID[], modifiedShapes: ShapesChangedByLayerID[]) {
    super(WorkerEventType.SHAPES_CHANGED);
    this.addShapes = addShapes;
    this.modifiedShapes = modifiedShapes;
  }
}
