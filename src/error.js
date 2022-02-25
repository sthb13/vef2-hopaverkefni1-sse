export function notFoundHandler(req, res) {
  // eslint-disable-line
  console.warn('Not found', req.originalUrl);
  res.status(404).json({ error: 'Not found' });
}

export function errorHandler(err, req, res) {
  // eslint-disable-line
  console.error(err);

  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid json' });
  }

  return res.status(500).json({ error: 'Internal server error' });
}

export function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}
