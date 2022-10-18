const tf = require("@tensorflow/tfjs");
require("@tensorflow/tfjs");
const use = require("@tensorflow-models/universal-sentence-encoder");
let tensorModel;

//this function takes our web worker message
//it runs the TF function and awaits it. Posts output when done
onmessage = async (e) => {
  const { userInput, tensorWords } = e.data;
  const TFOutput = await TFWorker(userInput, tensorWords);
  postMessage({
    TFOutput,
  });
};

//our TF function
async function TFWorker(userInput, wordsArray) {
  const tf = require("@tensorflow/tfjs");
  require("@tensorflow/tfjs");
  const use = require("@tensorflow-models/universal-sentence-encoder");
  tf.setBackend("cpu");
  //load the USE model
  async function setModel() {
    await tf.ready();
    await use.load();
    return await use.load();
  }
  //this holds our created model
  // const modelObj = await setModel();
  //send the data to rf model

  if (!tensorModel) {
    console.log("load model");
    tensorModel = await setModel();
  }

  const embedData = async (input) => {
    tf.engine().startScope();
    console.log(tensorModel);
    // if (typeof window !== "undefined") {
    //   window = globalThis;
    // }

    window = globalThis;
    const embeddings = await tensorModel.embed([input]);
    console.log("hereh8irewaouirhaewirhnaeonrea");
    // const tfScores = tf;
    // .matMul(
    //   embeddings["queryEmbedding"],
    //   embeddings["responseEmbedding"],
    //   false,
    //   true
    // )
    // .dataSync();
    //set scores with result
    // return tfScores;

    tf.engine().endScope();
  };

  //we send the model and embed the data
  //our scores are returned
  const outputScores = await embedData(userInput);

  //tidies up the memory
  // const cleanUp = () => {
  //   tf.tidy(embedData);
  // };
  // cleanUp();

  //returns the scores to the web worker on message
  //which then posts it back to our component
  return "testing the capability";
  // return outputScores;
}
