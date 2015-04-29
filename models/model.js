var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// See http://mongoosejs.com/docs/schematypes.html

//Patterns
var patternSchema = new Schema({
  	name: String,
  	photo: String,
  	type: String,
  	needles: { 
		type: {type: String}, 
		size: String // '5 millimeter' 
	},
  	yarnweight: String,
	instructions: String,
	sourcename: String,
	sourceurl: String
	//projects: [{type:Schema.ObjectId, ref:'Project'}]
});

var Pattern = mongoose.model('patterns', patternSchema);

//Projects
var projectSchema = new Schema({
	user: String, // name
	photo: String, // url to the photo
	color: String,
	dateAdded : { type: Date, default: Date.now },
	//pattern: {type:Schema.ObjectId, ref:'Pattern'}
})

var Project = mongoose.model('Project',projectSchema);

// export models for use in other files
module.exports = {
	Pattern: Pattern,
	Project: Project
}