function requestData(data, error = false) {
  return new Promise((resolve, reject) => {
    if (error) setTimeout(() => reject(), 500);
    else setTimeout(() => resolve(data), 500);
  });
}

function sendData(handler, error = false) {
  return new Promise((resolve, reject) => {
    if (error) setTimeout(() => reject(500), 500);
    else {
      setTimeout(() => {
        handler();
        resolve(200);
      }, 500);
    }
  });
}

export { requestData, sendData };
