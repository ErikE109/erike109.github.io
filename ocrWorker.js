importScripts(
  "https://cdnjs.cloudflare.com/ajax/libs/tesseract.js/4.0.2/tesseract.min.js"
);

self.onmessage = async function (e) {
  console.log("Worker received data:", e.data);
  const { imageUrl } = e.data;

  try {
    const result = await Tesseract.recognize(imageUrl, "eng", {
      logger: (m) => console.log(m), // Optional: log progress
    });
    console.log("OCR result:", result); // Log OCR result before posting back
    self.postMessage({ text: result.data.text }); // Send result back to the main thread
  } catch (error) {
    console.error("Error in OCR worker:", error);
    self.postMessage({ error: error.message });
  }
};
