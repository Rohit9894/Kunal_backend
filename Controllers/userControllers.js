
const User = require("../features/models/userModel");




const addBank = async (req, res) => {
  try {
    const user = new User({
      ...req.body,

    });
    await user.save();
    res.status(201).send({ user, msg: "Register sucessfully" });
  }
  catch (err) {
    res.send(err)
  }
};
const getBankDetails = async (req, res) => {

  try {
    const { accountNo, password } = req.body;
    if (!accountNo || !password) {
      res.send({ msg: "Please Enter all the fields" });
      return;
    }
    const user = await User.findOne({ _id: accountNo });

    if (user) {

      const auth = accountNo == user._id;

      if (auth) {
        res.send({
          msg: "login successfully",
          data: user,
        });
      } else {
        res.send({ msg: "invalid credentials" });
      }

    } else {
      res.send({ msg: "Email not registred" });
    }
  }
  catch (err) {
    res.status(500).send(err)
  }
};
const editAmount = async (req, res) => {
  const { accountNo, password, amount, type } = req.body;

  try {
    const user = await User.findOne({ _id: accountNo });
    const auth = accountNo == user._id;
    let data;
    if (user) {
      if (type == "credit") {
        let new_amount = Number(user.amount) + Number(amount);
        data = { amount: new_amount }
      }
      if (type == "debit") {
        let new_amount = Number(user.amount) - Number(amount);
        data = { amount: new_amount }
      }
      const userData = await User.findByIdAndUpdate(accountNo, data, { new: true });
      const newData = {
        ...userData?._doc,
        trasAmount: amount,
        oldAmount: user.amount

      }
      res.send(newData);
    }

  } catch (e) {
    res.send(e.message);
  }
};

const transfer = async (req, res) => {
  const { accountNo, targetAccountNo, amount } = req.body;

  try {
    const sender = await User.findOne({ _id: accountNo });
    const reciever = await User.findOne({ _id: targetAccountNo });



    let senderAmount = Number(sender.amount) - Number(amount);
    let senderData = { amount: senderAmount }

    let reciverAmount = Number(reciever.amount) + Number(amount);
    let recieverData = { amount: reciverAmount }

    await User.findByIdAndUpdate(accountNo, senderData, { new: true });
    await User.findByIdAndUpdate(targetAccountNo, recieverData, { new: true })
    res.status(200).send({
      sender: accountNo,
      reciever: targetAccountNo,
      amount
    });


  } catch (e) {
    res.send(e.message);
  }
};
const closeAccount = async (req, res) => {
  console.log(req.body)
  try {
    const { accountNo, password, userName } = req.body;
    if (!accountNo || !password) {
      res.send({ msg: "Please Enter all the fields" });
      return;
    }
    const user = await User.findOne({ accountNo });


    if (user) {

      const auth = accountNo == user.accountNo;

      if (auth) {
        res.send({
          msg: "login successfully",
          data: user,
        });
      } else {
        res.send({ msg: "Incorrect Password" });
      }

    } else {
      res.send({ msg: "Email not registred" });
    }
  }
  catch (err) {
    res.send(err)
  }
};


module.exports = { addBank, getBankDetails, editAmount, closeAccount, transfer };
