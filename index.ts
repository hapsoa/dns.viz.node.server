// import * as express from "express"; // 1
import express from "express";
import cors from "cors";
import child_process from "child_process";
import { testFunction } from "./src/testPython";

const app = express();
app.use(cors());

app.post("/", (req: express.Request, res: express.Response) => {
  // testFunction();

  // 처음 전처리를 진행한다.

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
