var helmet = require('helmet');

function security(app){
    app.use(helmet());
    app.use(function(req,res,next){
        res.header("Cache-Control", "no-cache, no-store, must-revalidate");
        res.header("Pragma", "no-cache");
        res.header("Expires", 0);
        res.header("X-Frame-Options", "deny");

        next();
    });
}

module.exports = security;