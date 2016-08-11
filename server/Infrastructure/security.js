var helmet = require('helmet');
var session = require('express-session');

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
    app.use(session({
        secret: 'not a secret',
        resave: false,
        saveUninitialized: true,
        cookie: { httpOnly:true, secure:true }
    }));
}

module.exports = security;