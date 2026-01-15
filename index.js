const fs = require("fs");
const superagent = require("superagent");

/**
 * Using Callbacks hell (old way not recommended)
 */

// fs.readFile(`${__dirname}/dog.txt`, "utf8", (err, data) => {
//   if (err) return console.error("Error reading file:", err);
//   console.log("Dog breed:", data);
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .end((err, res) => {
//       if (err) return console.error("Error fetching dog image:", err.message);
//       console.log("Dog image URL:", res.body.message);
//       fs.writeFile(`${__dirname}/dog-image.txt`, res.body.message, (err) => {
//         if (err) return console.error("Error writing file:", err);
//         console.log("Dog image URL saved to dog-image.txt");
//       });
//     });
// });

/**
 * Using Promises and .then() (Modern way recommended)
 */

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf8", (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject(err);
      else resolve("success");
    });
  });
};

const getDogPic = async () => {
  try {
    const breed = await readFilePro(`${__dirname}/dog.txt`);
    console.log("Dog breed:", breed);

    /*
      -- Using Promise.all to run multiple async operations in parallel
      instead of waiting for each one to finish sequentially
      const res1Pro = superagent.get(
      `https://dog.ceo/api/breed/${breed}/images/random`
      );
      const res2Pro = superagent.get(
      `https://dog.ceo/api/breed/${breed}/images/random`
      );
      const res3Pro = superagent.get(
      `https://dog.ceo/api/breed/${breed}/images/random`
      );

      const allResults = await Promise.all([res1Pro, res2Pro, res3Pro]);
      const imgUrls = allResults.map((res) => res.body.message);
      console.log(imgUrls);

      await writeFilePro(`${__dirname}/dog-image.txt`, imgUrls.join("\n"));
     */

    const response = await superagent.get(
      `https://dog.ceo/api/breed/${breed}/images/random`
    );
    console.log("Dog image URL:", response.body.message);

    await writeFilePro(`${__dirname}/dog-image.txt`, response.body.message);
    console.log("Dog image URL saved to dog-image.txt");

    return "Step: 2: ready!";
  } catch (err) {
    throw new Error(err.message);
  }
};

(async () => {
  try {
    console.log("Step 1: will get dog pics!");
    const msg = await getDogPic();
    console.log(msg);
    console.log("Step 3: done getting dog pics!");
  } catch (err) {
    console.error({ asyncError: err.message });
  }
})();
// console.log("Step 1: will get dog pics!");
// getDogPic()
//   .then((msg) => {
//     console.log(msg);
//     console.log("Step 3: done getting dog pics!");
//   })
//   .catch((err) => {
//     console.error({ asyncError: err.message });
//   });

// readFilePro(`${__dirname}/dog.txt`)
//   .then((breed) => {
//     return superagent.get(`https://dog.ceo/api/breed/${breed}/images/random`);
//   })
//   .then((res) => {
//     return writeFilePro(`${__dirname}/dog-image.txt`, res.body.message);
//   })
//   .then(() => {
//     console.log("Dog image URL saved to dog-image.txt");
//   })
//   .catch((err) => {
//     console.error({ apiError: err.message });
//   });
