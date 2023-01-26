import AdminModel from '../models/Admin.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

const getAll = async (req, res) => {
  try {
    const admins = await AdminModel.find();
    res.json(admins);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось получить информацию об админах',
    })
  }
}

const create = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new AdminModel({
      login: req.body.login,
      passwordHash: hash,
    });

    const admin = await doc.save();

    const token = jwt.sign({
      _id: admin._id
    }, 'bloom');

    const { passwordHash, ...adminData } = admin._doc;

    res.json({
      ...adminData,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось создать админа',
    })
  }
}

const remove = async (req, res) => {
  try {
    const adminId = req.params.id;
    AdminModel.findOneAndDelete(
      {
        _id: adminId,
      },
      (error, doc) => {
        if (error) {
          console.log(error);
          return res.status(500).json({
            message: 'Не удалось удалить админа',
          })
        }

        if (!doc) {
          return res.status(404).json({
            message: 'Админ не найден'
          });
        }

        res.json({
          success: true
        });
      }
    )
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось удалить админа',
    })
  }
}

const login = async (req, res) => {
  try {
    const admin = await AdminModel.findOne({ login: req.body.login });

    if (!admin) {
      return req.json({
        message: 'Не удалось авторизоватсья'
      });
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, admin._doc.passwordHash)

    if (!isPasswordValid) {
      return req.json({
        message: 'Не удалось авторизоватсья'
      });
    }

    const token = jwt.sign(
      {
        _id: admin._id,
      },
      'bloom'
    );

    const { passwordHash, ...adminData } = admin._doc;

    res.json({
      ...adminData,
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось авторизоватсья'
    })
  }
}

export { getAll, create, remove, login }