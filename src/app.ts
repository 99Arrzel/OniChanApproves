import express from "express";
import bodyParser from "body-parser";
import { Octokit } from "@octokit/rest";
type WebHookPayload = {
  serverUrl: string;
  taskId: string;
  status: "SUCCESS";
  analysedAt: string;
  revision: string;
  changedAt: string;
  project: {
    key: string;
    name: string;
    url: string;
  };
  branch: {
    name: string;
    type: "BRANCH";
    isMain: boolean;
    url: string;
  };
  qualityGate: {
    name: string;
    status: "ERROR";
    conditions: {
      metric: string;
      operator: "LESS_THAN";
      value: string;
      status: "OK";
      errorThreshold: string;
    }[];
  };
  properties: {
    "sonar.analysis.detectedscm": string;
    "sonar.analysis.detectedci": string;
  };
};
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});
const app = express();
app.use(bodyParser.json());
const port = 3000;
const POSITIVE_REACTIONS = ["airkiss", "celebrate", "cheers", "yes"];
const NEGATIVE_REACTIONS = ["angrystare", "no", "mad", "stop"];

app.get("/", async (req, res) => {
  const randomPositive =
    POSITIVE_REACTIONS[Math.floor(Math.random() * POSITIVE_REACTIONS.length)];
  const gifEndpoint = `https://api.otakugifs.xyz/gif?reaction=${randomPositive}&format=gif`;
  const gifValue = await fetch(gifEndpoint).then((res) => res.json());
  console.log(gifValue);
  return res.send({
    gif: gifValue.url,
  });
});
app.post("/", async (req, res) => {
  const payload = req.body as WebHookPayload;
  if(payload.qualityGate.status === "ERROR") {
    //Enviar mensaje por github...
    // const response = await octokit.rest.issues.createComment({
    //   owner: "",
    //   repo: "",
    //   issue_number: 1,
    //   body: `Sonar Quality Gate: ${payload.qualityGate.name} - ${payload.qualityGate.status}`
    // })
  }
  return res.send("OK");
});
app.listen(port, "0.0.0.0", () => {
  console.log(`App listening on port ${port}`);
});
