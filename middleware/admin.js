
module.exports = function(req, res, next) {
    console.log('req::',req.user);
    
    if(req.user.isAdmin) next();
}