const User = require('../models/authmodel');
const expressJwt = require('express-jwt')
const Lessons = require('../models/Lessonmodel')


exports.insertLessons = (req, res) => {
    lessons = new Lessons(req.body)

    lessons.save(function (err) {
        if (err) {
            console.log('LESSON UPDATE ERROR', err);
            return res.status(400).json({
                error: 'Lesson update failed'
            });
        }
        res.send("Lessons Updated");
    });
}
exports.getLessons = (req, res) => {
    Lessons.find().exec((err, data) => {
        res.json(data);
    });
}
exports.getOneLessons = (req, res) => {
    Lessons.findOne({ _id: req.params.id }).exec((err, data) => {
        res.json(data);
    });
}


exports.updateStats = (req, res) => {
    const { speed, accuracy, time, date, completed, user_id } = req.body
    var stats = { "Speed": speed, "Accuracy": accuracy, "Time": time, date, "user_id": user_id, "completed": completed }
    Lessons.findOne({ _id: req.params.id }).exec((err, data) => {
        data.stats.push(stats)
        data.save((err, updatedStats) => {
            if (err) {
                console.log('Stats UPDATE ERROR', err);
                return res.status(400).json({
                    error: 'User update failed'
                });
            }
            res.json(updatedStats);
        })
    })
}

exports.getStats = (req, res) => {
    const { id } = req.params;
    let items = { push: function push(element) { [].push.call(this, element) } };
    Lessons.find({}).exec((err, data) => {
        data.map((lessons => {
            lessons.stats.forEach(function (element) {
                if (String(element.user_id) === id) {
                    items.push({ stats: element, lessons: lessons.lessonname })
                }
                else {
                    console.log('Error')
                }
            })
        }))
        res.json(items)
    })

}
