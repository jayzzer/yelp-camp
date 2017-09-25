var express         = require('express'),
    app             = express(),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose'),
    methodOverride  = require('method-override'),
    flash           = require('connect-flash'),
    passport        = require('passport'),
    LocalStrategy   = require('passport-local'),
    seedDB          = require('./seeds'),
    User            = require('./models/user'),
    Campground      = require('./models/campground'),
    Comment         = require('./models/comment');

// Routes
var indexRoutes      = require('./routes/index'),
    campgroundRoutes = require('./routes/campgrounds'),
    commentRoutes    = require('./routes/comments');

// Database configuration
mongoose.connect('mongodb://localhost/yelp_camp');

// App configuration
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(require('express-session')({
    secret: 'Fuck this authentication. I\'m done!',
    resave: false,
    saveUninitialized: false
}));
app.use(methodOverride('_method'));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

// Auth configuration
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//seedDB();

// Routes
app.use('/', indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);


app.listen(process.env.PORT, process.env.IP, function () {
    console.log('Server has started!');
});