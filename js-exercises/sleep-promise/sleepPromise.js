function sleep(ms) {
  const waitPromise = new Promise(res => setTimeout(res, ms));
  const innerFunction = (value) => waitPromise.then(() => value);
  innerFunction.then = waitPromise.then.bind(waitPromise);
  innerFunction.catch = waitPromise.catch.bind(waitPromise);
  return innerFunction;
}
export {
  sleep,
};
