import { useState } from "react";
import { draw } from "./utils/helpers";

function App() {
  const [inputString, setInputString] = useState("");
  const [inputSize, setInputSize] = useState(3);
  const [inputDirection, setInputDirection] = useState("horizontal");

  const [size, setSize] = useState();
  const [direction, setDirection] = useState();
  const [translatedString, setTranslatedString] = useState([]);

  // Define grid size according to submitted size
  const parts = Array.from({ length: size * size }, (v, i) => i);

  // Determine center, necessary corners, and edges of a square grid
  const center =
    inputSize * ((inputSize - 1) / 2 + 1) - ((inputSize - 1) / 2 + 1);

  const topLeft = 0;
  const topRight = inputSize - 1;
  const bottomLeft = (inputSize - 1) * inputSize;
  const bottomRight = inputSize * inputSize - 1;

  const bottomCenter = bottomRight - (bottomRight - bottomLeft) / 2;

  // Combine drawn parts to form the letter
  const drawX = () => [
    ...draw.slash(topRight, center, inputSize),
    ...draw.slash(center, bottomLeft, inputSize),
    ...draw.backSlash(topLeft, center, inputSize),
    ...draw.backSlash(center, bottomRight, inputSize),
  ];

  const drawY = () => [
    ...draw.slash(topRight, center, inputSize),
    ...draw.backSlash(topLeft, center, inputSize),
    ...draw.verticalSlash(center, bottomCenter, inputSize),
  ];

  const drawZ = () => [
    ...draw.slash(topRight, center, inputSize),
    ...draw.slash(center, bottomLeft, inputSize),
    ...draw.horizontalSlash(topLeft, topRight, inputSize),
    ...draw.horizontalSlash(bottomLeft, bottomRight, inputSize),
  ];

  // Loop through each character of the input string & translate to the appropriate representation
  const handleTranslate = (e) => {
    e.preventDefault();

    const translatedString = [];
    const text = inputString.replace(/\s+/g, "").toLocaleLowerCase();

    [...text].forEach((character) => {
      if (character === "x") {
        translatedString.push(drawX());
      } else if (character === "y") {
        translatedString.push(drawY());
      } else {
        translatedString.push(drawZ());
      }
    });

    setTranslatedString(translatedString);
    setSize(inputSize);
    setDirection(inputDirection);
  };

  const getDirection = () =>
    `${
      direction === "horizontal"
        ? "flex-row space-x-16 pb-8"
        : "flex-col space-y-16"
    }`;

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
          <div className="overflow-auto flex items-center justify-center">
            <div className="max-h-[50vh] max-w-full">
              <div className={`flex ${getDirection()}`}>
                {translatedString?.map((letterArr, i) => (
                  <div
                    key={i}
                    className="grid gap-x-4"
                    style={{
                      gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
                    }}
                  >
                    {parts?.map((part, i) => (
                      <h1
                        key={i}
                        className={`${
                          !letterArr.includes(part) && "opacity-0"
                        }`}
                      >
                        o
                      </h1>
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
