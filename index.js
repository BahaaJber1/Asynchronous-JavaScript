const fs = require("fs");
const superagent = require("superagent");

fs.readFile(`${__dirname}/dog.txt`, "utf8", (err, data) => {
  if (err) return console.error("Error reading file:", err);
  console.log("Dog breed:", data);
  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .end((err, res) => {
      if (err) return console.error("Error fetching dog image:", err.message);
      console.log("Dog image URL:", res.body.message);
      fs.writeFile(`${__dirname}/dog-image.txt`, res.body.message, (err) => {
        if (err) return console.error("Error writing file:", err);
        console.log("Dog image URL saved to dog-image.txt");
      });
    });
});
