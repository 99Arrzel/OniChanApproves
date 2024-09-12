import express from "express";

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

const app = express();
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
  console.log("+++++++++++++++++++++++++GOT PAYLOAD+++++++++++++++++++++++++");

  console.log(req.body);

  console.log("+++++++++++++++++++++++++GOT PAYLOAD+++++++++++++++++++++++++");

  console.log("+++++++++++++++++++++++++GOT REQUEST+++++++++++++++++++++++++");
  console.log(req);
  console.log("+++++++++++++++++++++++++GOT REQUEST+++++++++++++++++++++++++");
  return res.send("OK");
});
app.listen(port, "0.0.0.0", () => {
  console.log(`App listening on port ${port}`);
});
