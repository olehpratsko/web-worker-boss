class Boss {
  constructor(worker) {
    this.worker = worker;
  }

  on(event, callback) {
    this.worker.addEventListener('message', function (payload) {
      if (event === payload.data.event) {
        callback(payload);
      }
    });
  }

  emit(event, payload) {
    this.worker.postMessage({
      event,
      ...payload
    });
  }
}

export default Boss;
