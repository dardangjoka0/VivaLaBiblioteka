function authenticate(req, res, next) {
    console.log('Athenticating...');
    next();
    
}
module.exports = authenticate;