# Web Boss

Web Boss is a lightweight library that provides a simple and intuitive socket-like API for sending and receiving messages between the main thread and the worker.

## Installation

You can install Web Boss using npm or yarn:

```bash
npm install web-boss
```

or

```bash
yarn add web-boss
```

## Usage

To use Web Boss for bi-directional communication, follow these steps:

1. Import the Boss class from the web-boss package:

```javascript
import Boss from 'web-boss';
```

2. In the main thread, create an instance of Boss, passing in the web worker object as a parameter:

```javascript
const boss = new Boss(worker);
```

3. Register event listeners in the main thread using the on method:

```javascript
boss.on('eventName', (payload) => {
  // Handle the received event and payload from the web worker
});
```

4. Emit events to the web worker using the emit method:

```javascript
boss.emit('eventName', payload);
```

5. In the web worker script, import the Boss class from the web-boss package. Make sure you are using webpack or Rollup to bundle the web worker script.

```javascript
import Boss from 'web-boss';
```

6. Create an instance of Boss in the web worker, passing in the self object as a parameter:

```javascript
const boss = new Boss(self);
```

7. Register event listeners in the web worker using the on method:

```javascript
boss.on('eventName', (payload) => {
  // Handle the received event and payload from the main thread
});
```

8. Emit events back to the main thread using the emit method:

```javascript
boss.emit('eventName', payload);
```

## Example

Here's an example demonstrating the usage of Web Boss for bi-directional communication:

### Main script:

```javascript
import Boss from 'web-boss';

const worker = new Worker('worker.js');
const boss = new Boss(worker);

boss.on('answer', (payload) => {
  console.log('Received answer from web worker:', payload.data.answer);
});

boss.emit('ask', { question: 'How are you?' });
```

### Web worker script (worker.js):

```javascript
import Boss from 'web-boss';

const boss = new Boss(self);

boss.emit('connection', { message: 'Hello, boss!' });

boss.on('ask', (payload) => {
  if (payload.data.question === 'How are you?') {
    boss.emit('answer', { answer: 'I am fine!' });
  } else {
    boss.emit('answer', { answer: 'I don\'t understand' });
  }
});
```

In this example, the main script creates a web worker using the Worker constructor and creates an instance of Boss with the worker. It registers an event listener for the 'answer' event and emits an 'ask' event with a question payload.

The web worker script creates an instance of Boss with self, which represents the web worker itself. It emits a 'connection' event to indicate the worker's connection, and it registers an event listener for the 'ask' event. Based on the received question, it emits an 'answer' event with an appropriate answer payload.

Both the main script and the web worker script can communicate with each other using the emit and on methods of the Boss instance.

## API

### `new Boss(worker: Worker)`

Creates a new instance of `Boss` with the specified web worker object.

- `worker`: The web worker object to communicate with.

### `boss.on(event: string, callback: (payload: any) => void)`

Registers an event listener for the specified event.

- `event`: The name of the event to listen for.
- `callback`: The callback function to execute when the event is received. It will receive the payload as a parameter.

### `boss.emit(event: string, payload: MessageEvent)`

Emits an event to the web worker.

`event`: The name of the event to emit.
`payload`: The payload to send along with the event.

---

That's it! You now have a better understanding of how to use the Web Boss library for bi-directional communication between the main thread and a web worker in your web applications. Feel free to explore more features and advanced usage in the library's documentation or by examining the source code.

If you encounter any issues or have further questions, please don't hesitate to ask.
