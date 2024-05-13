import {WorkerEvent} from "@models/worker.model";
import 'node_modules/konva/konva.min.js';

let Konva = (globalThis as any).Konva;

self.onmessage = (event: MessageEvent<WorkerEvent>) => {
  console.log(event);

  postMessage('Hello from the worker');
}

function randomId(): string {
  return (Math.random() + 1).toString(36).substring(7);
}

function randomNumber(from: number, to: number): number {
  return Math.round(Math.random() * to) + from;
}
