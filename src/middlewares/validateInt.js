// todo : Comment on fait si notre req.params ne s'appelle pas id
function isPositiveInt(req, _res, next) {
    const { id } = req.params;

    if (!/^\d+$/.test(id)) {
        // ? express 4 faisait un 404, est-ce qu'on devrait pas faire pareil
        const error = new Error('Not Found');

        error.statusCode = 404;

        return next(error);
    }

    next();
}

export { isPositiveInt }
