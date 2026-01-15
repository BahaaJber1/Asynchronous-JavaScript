# Asynchronous JavaScript 🔄

A practical demonstration of handling asynchronous operations in Node.js, showing the evolution from callback hell to modern async/await patterns.

## 📋 Project Overview

This project demonstrates three different approaches to handling asynchronous operations in JavaScript:

1. **Callbacks** (callback hell - not recommended)
2. **Promises with .then()** (modern approach)
3. **Async/Await** (cleanest modern approach)

The example fetches random dog images from the Dog CEO API based on a breed read from a file.

## 🎯 What It Does

1. Reads a dog breed from [dog.txt](dog.txt)
2. Fetches a random image URL for that breed from the Dog CEO API
3. Saves the image URL to [dog-image.txt](dog-image.txt)

## 📁 Project Structure

```
3-asynchronous-JS/
├── index.js          # Main application demonstrating async patterns
├── dog.txt           # Input file containing dog breed
├── dog-image.txt     # Output file with fetched image URL
├── package.json      # Dependencies (superagent)
└── README.md         # This file
```

## 🛠️ Installation

Install dependencies using yarn:

```bash
yarn install
```

Or with npm:

```bash
npm install
```

## 🚀 Running the Application

```bash
node index.js
```

## 📚 Code Evolution

### 1. Callback Hell ❌ (Commented Out)

The old way - deeply nested callbacks that are hard to read and maintain:

```javascript
fs.readFile("dog.txt", (err, data) => {
  superagent.get(url).end((err, res) => {
    fs.writeFile("dog-image.txt", data, (err) => {
      // Nested callbacks - callback hell!
    });
  });
});
```

**Problems:**

- Hard to read and maintain
- Error handling is complex
- Difficult to manage multiple async operations

### 2. Promises with .then() ✅ (Commented Out)

Better approach using promise chaining:

```javascript
readFilePro("dog.txt")
  .then((breed) => superagent.get(url))
  .then((res) => writeFilePro("dog-image.txt", res.body.message))
  .then(() => console.log("Success"))
  .catch((err) => console.error(err));
```

**Benefits:**

- Flatter structure
- Easier error handling with `.catch()`
- More readable than callbacks

### 3. Async/Await ⭐ (Current Implementation)

Modern, cleanest approach:

```javascript
const getDogPic = async () => {
  try {
    const breed = await readFilePro("dog.txt");
    const response = await superagent.get(url);
    await writeFilePro("dog-image.txt", response.body.message);
  } catch (err) {
    throw new Error(err.message);
  }
};
```

**Benefits:**

- Looks like synchronous code
- Easy to read and understand
- Simple error handling with try/catch
- Can use standard control flow (loops, conditionals)

## 🔥 Advanced Pattern: Promise.all()

The code includes a commented example of running multiple async operations in parallel:

```javascript
const res1Pro = superagent.get(url);
const res2Pro = superagent.get(url);
const res3Pro = superagent.get(url);

const allResults = await Promise.all([res1Pro, res2Pro, res3Pro]);
const imgUrls = allResults.map((res) => res.body.message);
```

**Benefits:**

- Runs operations in parallel instead of sequentially
- Faster execution time
- All promises must resolve, or all fail together

## 💡 Key Concepts Demonstrated

### Promisifying Callbacks

Converting callback-based functions to promise-based:

```javascript
const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf8", (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};
```

### IIFE (Immediately Invoked Function Expression)

Using async IIFE for top-level await:

```javascript
(async () => {
  try {
    const msg = await getDogPic();
    console.log(msg);
  } catch (err) {
    console.error(err);
  }
})();
```

### Error Handling

- **Callbacks:** Error-first callback pattern `(err, data) => {}`
- **Promises:** `.catch()` method
- **Async/Await:** `try/catch` blocks

### Returning Values from Async Functions

Async functions always return a promise:

```javascript
const getDogPic = async () => {
  // ...
  return "Step 2: ready!"; // Automatically wrapped in Promise.resolve()
};
```

## 📦 Dependencies

- **superagent** (^10.3.0): HTTP request library with promise support
  - Alternative to native `fetch` or `axios`
  - Simple, elegant API
  - Built-in promise support

## 🌐 API Used

**Dog CEO API**: https://dog.ceo/api/breed/{breed}/images/random

Free public API that returns random dog images by breed.

## 🎓 Learning Outcomes

After studying this project, you'll understand:

- ✅ The problems with callback hell
- ✅ How promises solve callback hell
- ✅ The syntax and benefits of async/await
- ✅ How to promisify callback-based APIs
- ✅ Running multiple async operations in parallel
- ✅ Proper error handling in asynchronous code
- ✅ Top-level async patterns (IIFE)

## 📝 Package Manager

This project uses **Yarn v4.12.0** as specified in package.json. The `.yarnrc.yml` file contains Yarn configuration.

---

_This project is part of Jonas Schmedtmann's Node.js course on Udemy_
