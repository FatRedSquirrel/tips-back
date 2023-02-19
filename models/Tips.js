import mongoose from 'mongoose';

const TipsSchema = new mongoose.Schema({
        tips: Number
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Tips', TipsSchema);

