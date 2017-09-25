var express    = require('express'),
    router     = express.Router(),
    middleware = require('../middleware'); 
    
var Campground = require('../models/campground');

// INDEX ROUTE
router.get('/', function (req, res) {
    Campground.find({}, function (err, campgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render('campgrounds/index', {campgrounds: campgrounds});
        }
    });
});

// CREATE ROUTE
router.post('/', middleware.isLoggedIn, function (req, res) {
    req.body.campground.author = {
        id: req.user._id,
        username: req.user.username
    };
    
    Campground.create(req.body.campground, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/campgrounds');
        }
    });
});

// NEW ROUTE
router.get('/new', middleware.isLoggedIn, function(req, res) {
    res.render('campgrounds/new');
});

// SHOW ROUTE
router.get('/:id', function(req, res) {
    Campground.findById(req.params.id).populate('comments').exec(function (err, foundCampground) {
        if (err || !foundCampground) {
            req.flash('error', 'Campground not found!');
            res.redirect('/campgrounds');
        } else {
            res.render('campgrounds/show', {campground: foundCampground});
        }
    });
});

// EDIT CAMPGROUND ROUTE
router.get('/:id/edit', middleware.isCampgroundOwnership,function(req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        res.render('campgrounds/edit', {campground: foundCampground}); 
    });
});

// UPDATE CAMPGROUND DATA
router.put('/:id', middleware.isCampgroundOwnership, function (req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updatedCampground) {
        if (err) {
            return res.redirect('/campgrounds');
        }
        
        req.flash('success', 'Successfuly updated!');
        res.redirect('/campgrounds/' + req.params.id);
    });
});

// DESTROY ROUTE
router.delete('/:id', middleware.isCampgroundOwnership, function (req, res) {
    Campground.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            return res.redirect('/campgrounds');
        }
        
        req.flash('success', 'Successfuly deleted!');
        res.redirect('/campgrounds');
    });
});


module.exports = router;