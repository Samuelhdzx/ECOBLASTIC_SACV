const validateSchema = (schema) => ( req , res , next ) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.errors.map((error) => error.message),
        });
    }
};

export { validateSchema };