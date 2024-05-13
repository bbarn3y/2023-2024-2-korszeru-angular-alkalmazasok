export enum WorkerEventType {
  GENERATE = 'GENERATE',
  SHAPES_CHANGED = 'SHAPES_CHANGED'
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

export class ShapesChangedWorkerEvent extends WorkerEvent {
  addedShapes: string[];
  modifiedShapes: string[];

  constructor(addedShapes: string[], modifiedShapes: string[]) {
    super(WorkerEventType.SHAPES_CHANGED);
    this.addedShapes = addedShapes;
    this.modifiedShapes = modifiedShapes;
  }
}
