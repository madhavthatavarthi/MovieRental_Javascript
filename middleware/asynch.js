module.exports = function asyncMiddleware(handler) {
    return async (req, res, next) => {
    try {
        console.log('handler',handler);
        await handler(req, res);
    }
    catch(ex){
        console.log('Enter catch')
        next(ex)
    }
  }
}