function notFound(_req, _res, next) {
    const error = new Error('Not found');

    error.statusCode = 404;

    next(error);
}

// ? le middleware de gestion d'erreur est appelé en dernier si besoin
// ? il prend 4 paramètres
function errorHandler(err, _req, res, _next) {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({ message: err.message });
}


export { notFound, errorHandler }