module.exports = function() {

  function delay(timeout = 1000) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, timeout);
    });
  }

  return {
    delay
  };
}
