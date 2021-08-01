const { Schema, model, Types } = require('mongoose');
const { DateTime } = require("luxon");

const reactionSchema = new Schema({
    reactionId: {
        type: Types.ObjectId,
        default: new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: DateTime.now(),
        get: (createdAtVal) => DateTime.now(createdAtVal).toLocaleString(DateTime.DATETIME_FULL)
    }
},
{
    toJSON: {
        getters: true
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
});

module.exports = reactionSchema;