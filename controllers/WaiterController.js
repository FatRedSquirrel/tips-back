import WaiterModel from '../models/Waiter.js';

const getAll = async (req, res) => {
  try {
    const waiters = await WaiterModel.find();
    res.json(waiters);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось получить информацию о сотрудниках',
    })
  }
}

const add = async (req, res) => {
  try {
    const doc = new WaiterModel({
      name: req.body.name
    });
    const waiter = await doc.save();
    res.json(waiter);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось добавить сотрудника',
    })
  }
}

const remove = async (req, res) => {
  try {
    const waiterId = req.params.id;
    WaiterModel.findOneAndDelete(
      {
        _id: waiterId,
      },
      (error, doc) => {
        if (error) {
          console.log(error);
          return res.status(500).json({
            message: 'Не удалось удалить сотрудника',
          })
        }

        if (!doc) {
          return res.status(404).json({
            message: 'Сотрудник не найден'
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
      message: 'Не удалось удалить сотрудника',
    })
  }
}

export { getAll, add, remove }