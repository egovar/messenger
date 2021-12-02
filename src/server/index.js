const timeout = 500;
const errorCode = 500;
const okCode = 200;

function requestData(data, error = false) {
  return new Promise((resolve, reject) => {
    if (error) setTimeout(() => reject(errorCode), timeout);
    else setTimeout(() => resolve(data), timeout);
  });
}

function sendData(handler, error = false) {
  return new Promise((resolve, reject) => {
    if (error) setTimeout(() => reject(errorCode), timeout);
    else {
      setTimeout(() => {
        handler();
        resolve(okCode);
      }, timeout);
    }
  });
}

export { requestData, sendData };
