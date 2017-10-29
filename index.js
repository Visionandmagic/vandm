var express = require('express'),
    app = express(),
    engines = require('consolidate'),
    sassMiddleware = require('node-sass-middleware');

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

var port = process.env.PORT || 3000;

app.use(sassMiddleware({
    /* Options */
    src: __dirname + '/public/sass',
    dest: __dirname + '/public/css',
    debug: true,
    //outputStyle: 'compressed',
    prefix:  '/css'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
}));


app.use(express.static('public'));

// Handler for internal server errors
function errorHandler(err, req, res, next) {
    console.error(err.message);
    console.error(err.stack);
    res.status(500).render('error_template', { error: err });
}

app.get('/', function(req, res, next) {
    res.render('index.html', { });
});

app.get('/home', function(req, res, next) {
    res.render('styles.html', { });
});

app.use(errorHandler);

var server = app.listen(port, function() {
    var port = server.address().port;
    console.log('Express server listening on port %s.', port);
});
