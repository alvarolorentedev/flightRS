var express = require('express');

function publicPaths(app){
    app.use('/www', express.static('www'));
    app.use('/partials', express.static('client/views/partials', {etag: false, lastModified: false}));
    app.use('/scripts', express.static('node_modules'));
}

module.exports = publicPaths;