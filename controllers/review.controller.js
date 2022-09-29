//         app.get('/reviews', async (req, res) => {
//             const result = await (await reviewCollection.find().toArray()).reverse();
//             res.send(result);
//         });
//         app.post('/reviews', jwtVerify, async (req, res) => {
//             const doc = req.body;
//             const result = await reviewCollection.insertOne(doc);
//             res.send(result);
//         });

const Review = require("../models/Review")

exports.getReviews = async (req, res, next) => {
    await Review.find({}).exec((err, reviews) => {
        if (err) {
            res.send("Something went wrong")
        } else {
            reviews.reverse();
            res.send(reviews)
        }
    })
};
exports.postReview = async (req, res, next) => {

    try {
        const doc = req.body;
        const result = await Review.create(doc);
        res.send(result);
    } catch (error) {
        res.send(error.message)
    }
};

