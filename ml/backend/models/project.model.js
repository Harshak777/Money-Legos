const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  _id: {type: String, required: true},
  projectname: { type: String, required: true },
  description: { type: String, required: true },
  deadline: { type: Number, required: true },
  fund: { type: Number, required: true },
}, {
  timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;