import Boss from '../lib/boss';

const worker = new Worker(new URL('./test.worker.js', import.meta.url));

const boss = new Boss(worker);

boss.on('connection', function (payload) {
  console.log(payload.data.message);
});

boss.on('answer', function (payload) {
  console.log(payload.data.answer);
});

boss.on('tick', function (payload) {
  console.log(payload.data.ticker);
});

boss.emit('ask', { question: 'How are you?' });
boss.emit('ask', { question: 'Your working day is started.' });
