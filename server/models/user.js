const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// const { string } = require('joi');

const Schema = mongoose.Schema;

// Define our model
const userSchema = new Schema({
  firstname: { type: String, lowercase: true },
  lastname: { type: String, lowercase: true },
  email: { type: String, unique: true, lowercase: true },
  password: String,
});

// On save. encrypt password
// before model is saved, run this function
userSchema.pre('save', async function (next) {
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);

    // Generate hashed password (sald + hash)
    const passwordHash = await bcrypt.hash(this.password, salt);

    // Re-assign hashed version over original plain text password
    this.password = passwordHash;
    next();
  } catch (error) {
    next(error);
  }
});

// create compare herlper
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};
// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;
