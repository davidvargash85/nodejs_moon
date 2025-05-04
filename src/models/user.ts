import { Document, model, Schema } from "mongoose";

export interface UserAttrs {
  name: string;
  email: string;
}

export interface UserDoc extends Document, UserAttrs { }

const userSchema = new Schema<UserDoc>({
  name: { type: String, required: true },
  email: { type: String, required: true },
}, {
  timestamps: true,
});

export const User = model<UserDoc>('User', userSchema);
