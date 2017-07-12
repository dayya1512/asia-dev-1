var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-node');

var UserSchema = new Schema({
	username: {
	    type: String,
	    required: true,
	    unique: true
	},	
	password: {
	    type: String,
	    required: true
	},
createdAt : {type: Date, default: Date.now}
});

UserSchema.pre('save', function(callback) {  
	var user = this;
  	// Break out if the password hasn't changed  
	if (!user.isModified('password')) {
		return callback();
	}
	
    // Password changed so we need to hash it  
    bcrypt.genSalt(5, function(err, salt) {    
	  	if (err) {
	  		return callback(err);
	  	}
	    bcrypt.hash(user.password, salt, null, function(err, hash) {      
	    	if (err) {
	    		return callback(err);      
	    	}
	    	user.password = hash;      
	    	callback();    
	    });  
	}); 
});

module.exports = mongoose.model('User', UserSchema);