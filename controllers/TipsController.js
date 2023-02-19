import TipsModel from "../models/Tips.js";

export const sendData = async (req, res) => {
    try {

        const doc = new TipsModel({
            tips: req.body.tips,
        });

        const tips = await doc.save();

        res.json({
            tips
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Не удалось отправить информацию о чаевых',
        })
    }
}
