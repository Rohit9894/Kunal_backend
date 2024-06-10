const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const connect = async () => {
    return await mongoose.connect("mongodb+srv://k:g@cluster0.6sxhyxh.mongodb.net/Kunal",);
};

module.exports = connect;
