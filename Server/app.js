const express = require("express");

const app = express();
const port = 5500;
// database connection
const dbConnection = require("./db/dbConfig")


// user routes file
const userRoute = require("./routes/userRoute");

// question route file
const questionRoute = require("./routes/questionRoute");

// answer route file
const answerRoute = require("./routes/answerRoute")

// json middleware file
app.use(express.json())

// user route middleware
app.use("/api/user", userRoute);

// question route middleware
app.use("/api/question", questionRoute)

// answer route middleware
app.use("/api/question/:question_id/answer", answerRoute)

async function start() {
  try {
    const result = await dbConnection.execute("select 'test' ")
    await app.listen(port)
    console.log("Database connection establish");
    console.log("listen on " + port);
  } catch (error) {
    console.log(error.message);
  }
}
start()

