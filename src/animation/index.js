import { Sketch } from "./app";
import * as tf from "@tensorflow/tfjs";
import * as use from "@tensorflow-models/universal-sentence-encoder";

import * as randomWords from "random-words";
let model, embeddings;

// (async () => {
//   model = await use.load(); //tensor

//   const embeddings = await model.embed(words);
//   console.log(embeddings);

//   for (let i = 0; i < words.length; i++) {
//     for (let j = i; j < words.length; j++) {
//       const wordI = tf.slice(embeddings, [i, 0], [1]);
//       const wordJ = tf.slice(embeddings, [j, 0], [1]);
//       const wordITranspose = false;
//       const wordJTranspose = true;

//       const score = tf
//         .matMul(wordI, wordJ, wordITranspose, wordJTranspose)
//         .dataSync();
//       //   console.log(`${words[i]} -- ${words[j]}`, score);
//       return score;
//     }
//   }
// })(["red", "blue"]);

// setTimeout(async () => {
//   const words = ["red", "blue"];
//   const embeddings = await model.embed(words);
//   console.log(embeddings);

//   for (let i = 0; i < words.length; i++) {
//     for (let j = i; j < words.length; j++) {
//       console.log(words);
//       const wordI = tf.slice(embeddings, [i, 0], [1]);
//       const wordJ = tf.slice(embeddings, [j, 0], [1]);
//       const wordITranspose = false;
//       const wordJTranspose = true;

//       const score = tf
//         .matMul(wordI, wordJ, wordITranspose, wordJTranspose)
//         .dataSync();
//       //   console.log(`${words[i]} -- ${words[j]}`, score);
//       return score;
//     }
//   }
// }, 3000);

// const init = async (words) => {
//   const model = await use.load(); //tensor

//   const embeddings = await model.embed(words);
//   console.log(embeddings);

//   for (let i = 0; i < words.length; i++) {
//     for (let j = i; j < words.length; j++) {
//       const wordI = tf.slice(embeddings, [i, 0], [1]);
//       const wordJ = tf.slice(embeddings, [j, 0], [1]);
//       const wordITranspose = false;
//       const wordJTranspose = true;

//       const score = tf
//         .matMul(wordI, wordJ, wordITranspose, wordJTranspose)
//         .dataSync();
//       //   console.log(`${words[i]} -- ${words[j]}`, score);
//       return score;
//     }
//   }
// };

// const test = init(["red", "blue"]);
// console.log(`wtf`, test);

new Sketch();
