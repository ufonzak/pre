module.exports = function inj() {
  function delay(timeout = 1000) {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  }

  return {
    delay,
  };
};
