const tf = require("@tensorflow/tfjs-node"); // Ensure tfjs-node is used
const path = require("path");
const fs = require("fs");

module.exports.post_corpus = async (req, res) => {
  const { corpus } = req.body;
  const modelpath = path.join(
    "D:",
    "stuff",
    "Academics",
    "Capstone",
    "ghotona-chitro",
    "backend",
    "prediction",
    "model.json"
  );
  const modelPath = `file://${modelpath}`;

  // Check if the model file exists
  if (!fs.existsSync(modelpath)) {
    console.error("Model file not found at:", modelpath);
    res.status(400).json({ error: "Model file not found!" });
    return;
  }

  try {
    // Load the model
    console.log("Loading model...");
    const model = await tf.loadLayersModel(modelPath);

    function preprocess(corpus) {
      // Preprocess the corpus to match the model's expected input format
      console.log("Preprocessing corpus...");
      return tf.tensor2d(corpus, [1, corpus.length]); // Example: reshaping as 2D tensor
    }

    // Process and predict
    const processedCorpus = preprocess(corpus);
    console.log("Making prediction...");
    const prediction = model.predict(processedCorpus);
    const predictionData = await prediction.data();

    res.status(200).json({ prediction: Array.from(predictionData) });
  } catch (err) {
    console.error("Error during prediction:", err);
    res.status(500).json({ error: err.message });
  }
};
