import mongoose from 'mongoose';

const WaiterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
},
  {
    timestamps: true,
  }
);

export default mongoose.model('Waiter', WaiterSchema);