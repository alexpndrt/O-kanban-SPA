/**
 * @example: validate(listCreateSchema, 'body')
 */
export default (schema, source) => {
    return async (req, res, next) => {
        try {

            // ? on devrait faire la validation avec sanitize ici

            await schema.validateAsync(req[source]);

            next();
        } catch (err) {
            res.status(400).json(err.message);
        }
    }
}