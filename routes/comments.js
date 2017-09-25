var express    = require('express'),
    router     = express.Router({mergeParams: true}),
    middleware = require('../middleware'); 
    
var Campground = require('../models/campground'),
    Comment    = require('../models/comment');


// // COMMENT NEW
// router.get('/new', middleware.isLoggedIn, function(req, res) {
//     Campground.findById(req.params.id, function (err, foundCampground) {
//         if (err) {
//             console.log(err);
//         } else {
//             res.render('comments/new', {campground: foundCampground});
//         }
//     });
// });

// COMMENT CREATE
router.post('/', middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    
                    foundCampground.comments.push(comment);
                    foundCampground.save();
                    res.redirect('/campgrounds/' + req.params.id);
                }
            });
        }
    });
});

// COMMENT EDIT
router.get('/:comment_id/edit', middleware.isCommentOwnership, function (req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if (err) {
            res.redirect('back');
        } else {
            res.render('comments/edit', {campground_id: req.params.id, comment: foundComment}); 
        }
    });
});

// COMMENT UPDATE
router.put('/:comment_id', middleware.isCommentOwnership, function (req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err) {
        if (err) {
            res.redirect('back');
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

// COMMENT DELETE ROUTE
router.delete('/:comment_id', middleware.isCommentOwnership, function (req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function (err) {
        if (err) {
            res.redirect('back');
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

module.exports = router;