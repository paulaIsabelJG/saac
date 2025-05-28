function notFoundHandler(req, res) {
  res.status(404).json({ mensaje: 'Página no encontrada' });
}

module.exports = notFoundHandler;
