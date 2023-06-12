import Boss from '../lib/boss';

const boss = new Boss(self);

boss.emit('connection', { message: 'Hello, boss!' });

boss.on('ask', function (payload) {
  if (payload.data.question === 'How are you?') {
    boss.emit('answer', { answer: 'I am fine!' });
  } else {
    boss.emit('answer', { answer: 'I don\'t like it.' });
  }
});

(function () {
  let ticker = 0;

  setInterval(function () {
    boss.emit('tick', { ticker: ++ticker });
  }, 1000);
})();
