import { useState } from "react";

function App() {
  const [inputText, setInputText] = useState("");
  const [size, setSize] = useState(3);
  const [direction, setDirection] = useState("horizontal");

  // const [parts, setParts] = useState(
  //   Array.from({ length: size * size }, (v, i) => i)
  // );
  const parts = Array.from({ length: size * size }, (v, i) => i);

  const TOP_RIGHT = size - 1;
  const BOTTOM_LEFT = (size - 1) * size;
  const BOTTOM_RIGHT = size * size - 1;
  const BOTTOM_CENTER = BOTTOM_RIGHT - (BOTTOM_RIGHT - BOTTOM_LEFT) / 2;
  const CENTER = size * ((size - 1) / 2 + 1) - ((size - 1) / 2 + 1);

  const drawCenterToTopLeft = () => {
    let counter = 0;
    const arr = [CENTER];

    while (!arr.includes(0)) {
      arr.push(arr[0 + counter] - (parseInt(size) + 1));
      counter++;
    }
    return arr;
  };

  const drawCenterToTopRight = () => {
    let counter = 0;
    const arr = [CENTER];

    while (!arr.includes(TOP_RIGHT)) {
      arr.push(arr[0 + counter] - (parseInt(size) - 1));
      counter++;
    }
    return arr;
  };

  const drawCenterToBottomRight = () => {
    let counter = 0;
    const arr = [CENTER];

    while (!arr.includes(BOTTOM_RIGHT)) {
      arr.push(arr[0 + counter] + (parseInt(size) + 1));
      counter++;
    }
    return arr;
  };

  const drawCenterToBottomLeft = () => {
    let counter = 0;
    const arr = [CENTER];

    while (!arr.includes(BOTTOM_LEFT)) {
      arr.push(arr[0 + counter] + (parseInt(size) - 1));
      counter++;
    }
    return arr;
  };

  // const x = [
  //   ...drawCenterToTopLeft(),
  //   ...drawCenterToTopRight(),
  //   ...drawCenterToBottomLeft(),
  //   ...drawCenterToBottomRight(),
  // ];

  // const getGridCols = () => `grid-cols-${size}`;

  return (
    <div className="min-h-screen max-w-6xl mx-auto py-24 px-8 space-y-8">
      <h1 className="font-bold border-b pb-8">XYZ Input Translator</h1>

      <main className="space-y-8">
        <form action="" className="space-y-4 border-b pb-8">
          <div className="flex flex-col md:flex-row space-x-0 md:space-x-8 space-y-8 md:space-y-0">
            <div className="space-y-2 w-full md:w-1/2">
              <p className="font-bold">String:</p>
              <input
                type="text"
                required
                className="input-primary w-full"
                placeholder="e.g. xxyyzz"
                onChange={(e) => setInputText(e.target.value)}
              />
            </div>

            <div className="flex flex-1 space-x-8 items-end">
              <div className="space-y-2 w-1/2">
                <p className="font-bold">Size:</p>
                <input
                  type="number"
                  value={size}
                  required
                  min="3"
                  step="2"
                  className="input-primary"
                  onChange={(e) => setSize(e.target.value)}
                />
              </div>

              <div className="space-y-2 flex-1">
                <p className="font-bold">Direction:</p>
                <select
                  className="input-primary"
                  onChange={(e) => setDirection(e.target.value)}
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
          <div className="flex space-x-4 items-center justify-center">
            {/* {translatedText.map((letterArr, i) => (
              <div key={i} className="grid grid-cols-3">
                {parts?.map((part, i) => (
                  <div
                    key={i}
                    className={`${
                      letterArr.includes(part) ? "bg-red-500" : "bg-gray-100"
                    }`}
                  >
                    0
                  </div>
                ))}
              </div>
            ))} */}
            {/* <div
              className="grid gap-x-4"
              style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
            >
              {parts?.map((part, i) => (
                <div
                  key={i}
                  className={`${drawX().includes(part) ? "" : "opacity-0"}`}
                >
                  <h1 className="font-bold">o</h1>
                </div>
              ))}
            </div> */}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
