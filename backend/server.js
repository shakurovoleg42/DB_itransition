const path = require('path')
const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express()



if (process.env.NODE_ENV === "production") {
 app.use(express.static(path.join(__dirname, "../frontend/build")))
 app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')))
} else { 
 app.get('/', (req, res) => res.send("Please set to production"))
}

app.listen(port, () => {
 console.log(`Server started on port ${port}`);
});
