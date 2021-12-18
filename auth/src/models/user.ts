import mongoose from "mongoose";

//An interface that describes properties that are required to create a user

interface UserAttrs {
  email: string;
  password: string;
}

//An interface that describes properties that User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

//An interface that describes properties that User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

let userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.statics.build = function (attrs: UserAttrs) {
  return new User(attrs);
};

let User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
