const express = require("express");
const cors = require("cors");

const app = express();


var fs = require('fs');
var path = require('path');

app.use(express.static(path.resolve(__dirname, './dist')));


const db = require("./app/models");
db.sequelize.sync();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
require("./app/routes/tutorial.routes")(app)
// simple route

app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
});


app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, './dist/index.html'));
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});