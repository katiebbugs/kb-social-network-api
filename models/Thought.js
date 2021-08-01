const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const { DateTime } = require("luxon");

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: DateTime.now(),
        get: (createdAtVal) => DateTime.now(createdAtVal).toLocaleString(DateTime.DATETIME_FULL)
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
});

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;