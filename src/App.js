import { useState } from "react";

import { draw, ALLOWED_LETTERS, inputIsValid } from "./utils/helpers";
import {
  GridContainer,
  InputContainer,
  OutputContainer,
} from "./components/containers";

function App() {
  // Declare states for inputs and form submitted values
  const [inputString, setInputString] = useState("");
  const [inputSize, setInputSize] = useState(3);
  const [inputDirection, setInputDirection] = useState("horizontal");

  const [errorMessage, setErrorMessage] = useState("");

  const [size, setSize] = useState();
  const [direction, setDirection] = useState();
  const [translatedString, setTranslatedString] = useState([]);

  // Define grid size according to submitted size
  const grid = Array.from({ length: size * size }, (v, i) => i);

  // Determine center, necessary corners, and edges of a square grid
  // const center =
  //   inputSize * ((inputSize - 1) / 2 + 1) - ((inputSize - 1) / 2 + 1);
  const center =
    inputSize * ((parseInt(inputSize) + 1) / 2) - (parseInt(inputSize) + 1) / 2;
  const topLeft = 0;
  const topRight = inputSize - 1;
  const bottomLeft = (inputSize - 1) * inputSize;
  const bottomRight = inputSize * inputSize - 1;
  const bottomCenter = bottomRight - (bottomRight - bottomLeft) / 2;

  // Combine drawn grid to form the letter
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

  // Main function to handle translation
  const handleTranslate = (e) => {
    e.preventDefault();
    setErrorMessage("");

    const translatedString = [];
    const text = inputString.replace(/\s+/g, "").toLocaleLowerCase();

    // return from function if input string contains invalid character
    if (!inputIsValid(text, inputSize)) {
      setErrorMessage("Input string/size contains an invalid value");
      return;
    }

    // translate to the appropriate representation
    [...text].forEach((character) => {
      if (character === ALLOWED_LETTERS[0]) {
        translatedString.push(drawX());
      } else if (character === ALLOWED_LETTERS[1]) {
        translatedString.push(drawY());
      } else {
        translatedString.push(drawZ());
      }
    });

    setTranslatedString(translatedString);
    setSize(inputSize);
    setDirection(inputDirection);
  };

  const handleReset = () => {
    setInputString("");
    setErrorMessage("");
    setTranslatedString([]);
  };

  return (
    <div className="min-h-screen max-w-6xl mx-auto py-24 px-8 space-y-8">
      <h1 className="font-bold border-b pb-8">XYZ Input Translator</h1>

      <main className="space-y-8">
        <form onSubmit={handleTranslate} className="space-y-4 border-b pb-8">
          <div className="flex flex-col md:flex-row space-x-0 md:space-x-8 space-y-8 md:space-y-0">
            <InputContainer label="String:">
              <input
                type="text"
                value={inputString}
                required
                className="input-primary w-full"
                placeholder="e.g. xxyyzz"
                onChange={(e) => setInputString(e.target.value)}
              />
            </InputContainer>

            <div className="flex flex-1 space-x-8 items-end">
              <InputContainer label="Size:">
                <input
                  type="number"
                  value={inputSize}
                  required
                  min="3"
                  step="2"
                  className="input-primary"
                  onChange={(e) => setInputSize(e.target.value)}
                />
              </InputContainer>

              <InputContainer label="Direction:">
                <select
                  className="input-primary"
                  onChange={(e) => setInputDirection(e.target.value)}
                >
                  <option value="horizontal">Horizontal</option>
                  <option value="vertical">Vertical</option>
                </select>
              </InputContainer>
            </div>
          </div>

          <div className="flex flex-col items-end space-y-2">
            <p className="text-red-500 font-normal">{errorMessage}</p>
            <div className="flex space-x-4">
              <button
                className="btn-outline"
                type="button"
                onClick={handleReset}
              >
                CLEAR ALL
              </button>
              <button className="btn-primary" type="submit">
                DRAW
              </button>
            </div>
          </div>
        </form>

        <section className="space-y-8">
          <h3 className="font-bold">Output</h3>

          <OutputContainer direction={direction}>
            {translatedString?.map((letterArr, i) => (
              <GridContainer size={size} key={i}>
                {grid?.map((block, i) => (
                  <h1
                    key={i}
                    className={`${!letterArr.includes(block) && "opacity-0"}`}
                  >
                    o
                  </h1>
                ))}
              </GridContainer>
            ))}
          </OutputContainer>
        </section>
      </main>
    </div>
  );
}

export default App;
