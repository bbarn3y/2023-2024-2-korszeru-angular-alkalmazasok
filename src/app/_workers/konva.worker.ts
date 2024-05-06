

self.onmessage = (event: MessageEvent<any>) => {
  console.log(event);

  postMessage('Hello from the worker');
}
