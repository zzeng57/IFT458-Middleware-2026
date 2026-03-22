// loggerMiddleware.js
// This is a common Logger (ausbt@asu.edu - 03/22/26)
function loggerMiddleware(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
}

module.exports = loggerMiddleware;
