var data = [
    {
        name: 'Desert Mesa',
        image: 'https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sapien diam, convallis et velit vitae, fermentum sodales nulla. Mauris posuere pharetra vehicula. Nunc mi purus, vulputate eget imperdiet lacinia, accumsan quis metus. Donec vel sem feugiat, ultricies sem at, dictum massa. Praesent lobortis neque in elit tincidunt, vel porttitor arcu eleifend. Nam sed venenatis urna. Sed aliquet aliquet nibh, at vehicula justo fringilla eu. Morbi imperdiet ut risus quis luctus. Nulla vulputate pulvinar sapien ut lacinia.'
    },
    {
        name: 'Sky mountains',
        image: 'https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sapien diam, convallis et velit vitae, fermentum sodales nulla. Mauris posuere pharetra vehicula. Nunc mi purus, vulputate eget imperdiet lacinia, accumsan quis metus. Donec vel sem feugiat, ultricies sem at, dictum massa. Praesent lobortis neque in elit tincidunt, vel porttitor arcu eleifend. Nam sed venenatis urna. Sed aliquet aliquet nibh, at vehicula justo fringilla eu. Morbi imperdiet ut risus quis luctus. Nulla vulputate pulvinar sapien ut lacinia.'
    },
    {
        name: 'Mindblowing nature',
        image: 'https://farm5.staticflickr.com/4027/4368764673_c8345bd602.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sapien diam, convallis et velit vitae, fermentum sodales nulla. Mauris posuere pharetra vehicula. Nunc mi purus, vulputate eget imperdiet lacinia, accumsan quis metus. Donec vel sem feugiat, ultricies sem at, dictum massa. Praesent lobortis neque in elit tincidunt, vel porttitor arcu eleifend. Nam sed venenatis urna. Sed aliquet aliquet nibh, at vehicula justo fringilla eu. Morbi imperdiet ut risus quis luctus. Nulla vulputate pulvinar sapien ut lacinia.'
    }
];

var mongoose   = require('mongoose'),
    Campground = require('./models/campground'),
    Comment    = require('./models/comment');

function seedDB() {
    Campground.remove({}, function (err) {
        // if (err) {
        //     console.log(err);
        // } 
        
        // console.log('Campgrounds removed');
        
        // data.forEach(function (seed) {
        //     Campground.create(seed, function (err, campground) {
        //         if (err) {
        //             console.log(err);
        //         } else {
        //             console.log('Campground added');
                    
        //             Comment.create({
        //                 text: 'This is awesome! Nature is beautiful!',
        //                 author: 'Bob'
        //             }, function (err, comment) {
        //                 if (err) {
        //                     console.log(err);
        //                 } else {
        //                     campground.comments.push(comment);
        //                     campground.save(function(err) {
        //                         if (err) {
        //                             console.log(err);
        //                         } else {
        //                             console.log('Comment added');
        //                         }
        //                     });
        //                 }
        //             });
        //         }
        //     });
        // });
    });
}


module.exports = seedDB;