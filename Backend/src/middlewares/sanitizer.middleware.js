
export const sanitizeInput = (req, res, next) => {
    if (req.body) {
      Object.keys(req.body).forEach(key => {
        if (typeof req.body[key] === 'string') {
          // Validación para detectar etiquetas HTML
          if (/<[^>]*>/.test(req.body[key])) {
            return res.status(400).json({
              error: "No se permiten etiquetas HTML en los campos"
            });
          }
          // Elimina espacios en blanco innecesarios
          req.body[key] = req.body[key].trim();
        }
      });
    }
    next();
  };
  