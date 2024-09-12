import express from "express";

const app = express();
const port = 3000;
const POSITIVE_REACTIONS = ["airkiss", "celebrate", "cheers", "yes"];
const NEGATIVE_REACTIONS = ["angrystare", "no", "mad", "stop"];

app.get("/", async (req, res) => {
  const randomPositive =
    POSITIVE_REACTIONS[Math.floor(Math.random() * POSITIVE_REACTIONS.length)];

  const gifEndpoint = `https://api.otakugifs.xyz/gif?reaction=${randomPositive}&format=gif`;
  const gifValue = await fetch(gifEndpoint).then((res) => res.json());
  console.log(gifValue)

  return res.send({
    gif: gifValue.url
  });
});
app.post("/", async (req, res) => {
  console.log(req)
  return res.send("OK");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
