const mongoose = require('mongoose');

const essentialSchema = {
  type: String,
  trim: true,
};

const taskSchema = new mongoose.Schema({
  text: {
    ...essentialSchema,
    default: ''
  },
  done: {
    type: Boolean,
    default: false
  },
  trash: {
    type: Boolean,
    default: false
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastUpdate: {
    type: Date,
    default: Date.now,
  },

})

// taskSchema.pre('update', function (next) {
//   const task = this;
//   if (this.isModified('done') || this.isModified('trash') || this.isModified('text')) {
//     task.lastUpdate =  Date.now ;
//   } else {
//       return next();
//   };
// });

module.exports = mongoose.model('Task', taskSchema);