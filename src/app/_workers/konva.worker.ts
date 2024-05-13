import {GenerateWorkerEvent, ShapesChangedWorkerEvent, WorkerEvent, WorkerEventType} from "@models/worker.model";
import 'node_modules/konva/konva.min.js';
import {interval} from "rxjs";

const blinkingElements: any[] = [];
const colors = ['black', 'white', 'blue', 'yellow', 'orange', 'green'];

let Konva = (globalThis as any).Konva;

self.onmessage = (event: MessageEvent<WorkerEvent>) => {
  console.log(event);

  switch(event.data.type) {
    case WorkerEventType.GENERATE:
      const generateWorkerEvent = event.data as GenerateWorkerEvent;
      addRandomObjects(generateWorkerEvent.amount);
      break;
  }

  // postMessage('Hello from the worker');
}

function addRandomObjects(amount: number) {
  const addedShapes: string[] = [];
  for (let i = 0; i < amount; i++) {
    addedShapes.push(randomArrow());
    addedShapes.push(randomRect());
  }
  postMessage(new ShapesChangedWorkerEvent(addedShapes, []));
}

function randomArrow(): string {
  const points: number[] =
    [...Array(randomNumber(3, 5))]
      .flatMap(num => [Math.floor((Math.random() * 1000)), Math.floor((Math.random() * 1000))]);

  const arrow = new Konva.Arrow({
    points, // [x1, y1, x2, y2, ...]
    stroke: 'black',
    strokeWidth: 5,
    tension: Math.random(),
    elementId: `Arrow_${randomId()}`
  });

  return arrow.toJSON();
}

function randomRect(): string {
  const originalFillColor = randomColor();
  const otherColors = colors.filter((c) => c !== originalFillColor);
  const blinkFillColor = otherColors[randomNumber(0, otherColors.length)];
  const isBlinking = Math.random() < 0.33;

  const rect = new Konva.Rect({
    x: randomNumber(0, 1000),
    y: randomNumber(0, 1000),
    width: randomNumber(200, 500),
    height: randomNumber(200, 500),
    stroke: 'black',
    strokeWidth: 3,
    elementId: `Rect_${randomId()}`,
    fill: originalFillColor,
    isBlinking,
    originalFillColor,
    blinkFillColor
  });

  if (isBlinking) {
    blinkingElements.push(rect);
  }

  return rect.toJSON();
}

function randomColor(): string {
  return colors[randomNumber(0, colors.length)];
}

function randomId(): string {
  return (Math.random() + 1).toString(36).substring(7);
}

function randomNumber(from: number, to: number): number {
  return Math.round(Math.random() * to) + from;
}

function startBlinking() {
  interval(500).subscribe(() => {
    if (blinkingElements.length > 0) {
      const modifiedShapes: string[] = blinkingElements.flatMap((shape) => {
        if (shape.attrs.blinkFillColor && shape.attrs.originalFillColor) {
          if (shape.fill() === shape.attrs.originalFillColor) {
            shape.fill(shape.attrs.blinkFillColor);
          } else {
            shape.fill(shape.attrs.originalFillColor);
          }
          return [shape.toJSON()];
        } else {
          return [];
        }
      });

      postMessage(new ShapesChangedWorkerEvent([], modifiedShapes));
    }
  })
}

startBlinking();
