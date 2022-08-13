import { useState, useEffect } from "react";

function App() {
  const [inputString, setInputString] = useState("");
  const [inputSize, setInputSize] = useState(3);
  const [inputDirection, setInputDirection] = useState("horizontal");

  const [size, setSize] = useState();
  const [translatedString, setTranslatedString] = useState([]);

  const parts = Array.from({ length: size * size }, (v, i) => i);

  const topRight = inputSize - 1;
  const bottomLeft = (inputSize - 1) * inputSize;
  const bottomRight = inputSize * inputSize - 1;
  const bottomCenter = bottomRight - (bottomRight - bottomLeft) / 2;
  const center =
    inputSize * ((inputSize - 1) / 2 + 1) - ((inputSize - 1) / 2 + 1);

  const getParts = (start, end, condition) => {
    let counter = 0;
    const arr = [start];

    while (!arr.includes(end)) {
      arr.push(arr[0 + counter] + condition);
      counter++;
    }

    return arr;
  };

  const drawX = () => [
    ...getParts(0, center, parseInt(inputSize) + 1),
    ...getParts(topRight, center, parseInt(inputSize) - 1),
    ...getParts(center, bottomLeft, parseInt(inputSize) - 1),
    ...getParts(center, bottomRight, parseInt(inputSize) + 1),
  ];

  const drawY = () => [
    ...getParts(0, center, parseInt(inputSize) + 1),
    ...getParts(topRight, center, parseInt(inputSize) - 1),
    ...getParts(center, bottomCenter, parseInt(inputSize)),
  ];

  const drawZ = () => [
    ...getParts(0, topRight, 1),
    ...getParts(bottomLeft, bottomRight, 1),
    ...getParts(topRight, center, parseInt(inputSize) - 1),
    ...getParts(center, bottomLeft, parseInt(inputSize) - 1),
  ];

  const handleTranslate = (e) => {
    e.preventDefault();

    const translatedText = [];
    const inputText = inputString.replace(/\s+/g, "").toLocaleLowerCase();

    [...inputText].forEach((letter) => {
      if (letter === "x") {
        translatedText.push(drawX());
      } else if (letter === "y") {
        translatedText.push(drawY());
      } else {
        translatedText.push(drawZ());
      }
    });

    setTranslatedString(translatedText);
    setSize(inputSize);
  };

  return (
    <div className="min-h-screen max-w-6xl mx-auto py-24 px-8 space-y-8">
      <h1 className="font-bold border-b pb-8">XYZ Input Translator</h1>

      <main className="space-y-8">
        <form onSubmit={handleTranslate} className="space-y-4 border-b pb-8">
          <div className="flex flex-col md:flex-row space-x-0 md:space-x-8 space-y-8 md:space-y-0">
            <div className="space-y-2 w-full md:w-1/2">
              <p className="font-bold">String:</p>
              <input
                type="text"
                required
                className="input-primary w-full"
                placeholder="e.g. xxyyzz"
                onChange={(e) => setInputString(e.target.value)}
              />
            </div>

            <div className="flex flex-1 space-x-8 items-end">
              <div className="space-y-2 w-1/2">
                <p className="font-bold">Size:</p>
                <input
                  type="number"
                  value={inputSize}
                  required
                  min="3"
                  step="2"
                  className="input-primary"
                  onChange={(e) => setInputSize(e.target.value)}
                />
              </div>

              <div className="space-y-2 flex-1">
                <p className="font-bold">Direction:</p>
                <select
                  className="input-primary"
                  onChange={(e) => setInputDirection(e.target.value)}
                >
                  <option value="horizontal">Horizontal</option>
                  <option value="vertical">Vertical</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="btn-primary">DRAW</button>
          </div>
        </form>

        <section className="space-y-8">
          <h3 className="font-bold">Output</h3>
          <div className="flex items-center justify-center">
            <div className="overflow-auto max-h-[50vh]">
              <div className="flex space-x-16 pb-8">
                {translatedString?.map((letterArr, i) => (
                  <div
                    key={i}
                    className="grid gap-x-4"
                    style={{
                      gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
                    }}
                  >
                    {parts?.map((part, i) => (
                      <div
                        key={i}
                        className={`${
                          !letterArr.includes(part) && "opacity-0"
                        }`}
                      >
                        o
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
