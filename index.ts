// import * as express from "express"; // 1
import express from "express";
import cors from "cors";
import child_process from "child_process";
import path = require("path");
import { testFunction } from "./src/testPython";
import { makeFirstStep } from "./src/makeData";

const app = express();
app.use(cors());

// TODO json data를 import 하는 과정을 시작해야 한다.
// app.use(express.static(path.join(__dirname, "data")));
// app.set("data", path.join(__dirname, "data"));
// const mainData = require("/mainData.json");

app.post("/", (req: express.Request, res: express.Response) => {
  // testFunction();

  // 처음 전처리를 진행한다.
  // const data = makeFirstStep(mainData);

  // python k-mode 클러스터링을 진행하고 데이터를 전달받는다.
  const spawn = child_process.spawn;
  const pythonProcess = spawn("python", ["./src/hi.py"]);
  pythonProcess.stdout.on("data", data => {
    // Do something with the data returned from python script
    console.log("response", data.toString());

    const responseData = JSON.parse(data.toString());
    console.log("responseData", responseData);

    // 나머지 로직을 진행한 다음, res.send()를 진행한다.
    res.send("Hello World!");
  });
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
