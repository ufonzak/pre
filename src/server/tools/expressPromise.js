module.exports = function inj() {
  return (callback) => { // eslint-disable-line arrow-body-style
    return (req, res, next) => {
      callback(req, res).then(() => res.end(), err => next(err));
    };
  };
};

