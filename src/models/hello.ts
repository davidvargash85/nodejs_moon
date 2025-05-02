import mongoose from 'mongoose';

const helloSchema = new mongoose.Schema({
  message: { type: String, required: true },
});

const Hello = mongoose.model('Hello', helloSchema);
export default Hello;
