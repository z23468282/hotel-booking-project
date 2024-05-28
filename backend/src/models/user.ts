import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export type UserType = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

//保存文檔之前執行的中間件，這邊不能使用箭頭函數否則無法使用this
userSchema.pre('save', async function (next) {
  //如果密碼有修改
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

const User = mongoose.model<UserType>('User', userSchema);

export default User;
