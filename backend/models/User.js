const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: 'customer' }
});
UserSchema.pre('save', async function (next) {
  if (this.isModified('password'))
    this.password = await bcrypt.hash(this.password, 10);
  next();
});
UserSchema.methods.comparePassword = function (pw) {
  return bcrypt.compare(pw, this.password);
};
module.exports = mongoose.model('User', UserSchema);
