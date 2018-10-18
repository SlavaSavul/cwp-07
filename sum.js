module.exports = function sum(req, res, payload, cb) {
    const result = { c: payload.a + payload.b };
    cb(null, result);
};