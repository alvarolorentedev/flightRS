var helmet = require('helmet');

function security(app){
    app.set('trust proxy', 1);  
    app.use(helmet());
    app.use(function(req,res,next){
        res.header("Cache-Control", "no-cache, no-store, must-revalidate");
        res.header("Pragma", "no-cache");
        res.header("Expires", 0);
        res.header("X-Frame-Options", "deny");

        next();
    });
    //TODO: need to add csrf and session handling for private parts on the future if required
}

module.exports = security;