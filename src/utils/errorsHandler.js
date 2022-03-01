export function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

export function LoginError(message) {
  this.message = message;
  this.stack = Error().stack;
}
LoginError.prototype = Object.create(Error.prototype);
LoginError.prototype.name = 'LoginError';
