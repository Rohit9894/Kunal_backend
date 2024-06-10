
const express = require("express");
const connect = require("./config/db");

const cors = require("cors");
const app = express();
const userRoute = require("./features/Routes/userRoutes");


app.use(
    cors({
        origin: "*",
    })
);
app.use(express.json());
app.use("/bank", userRoute);


app.get("/", (req, res) => {
    res.send("Hello Kunal Backend");
});

app.listen(5000, async () => {
    await connect();
    console.log("http://localhost:5000");
});

