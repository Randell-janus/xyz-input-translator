function App() {
  return (
    <div className="min-h-screen max-w-6xl mx-auto py-24 px-8 space-y-8">
      <h1 className="font-bold border-b pb-8">XYZ Input Translator</h1>

      <main className="space-y-8">
        <form action="" className="space-y-4 border-b pb-8">
          <h3 className="font-bold">Input</h3>

          <div className="flex flex-col md:flex-row space-x-0 md:space-x-8 space-y-8 md:space-y-0">
            <div className="space-y-2 w-full md:w-1/2">
              <p className="font-bold">String:</p>
              <input
                type="text"
                className="input-primary w-full"
                placeholder="e.g. xxyyzz"
              />
            </div>

            <div className="flex flex-1 space-x-8 items-end">
              <div className="space-y-2 w-1/5">
                <p className="font-bold">Size:</p>
                <input
                  type="number"
                  min="3"
                  step="2"
                  className="input-primary"
                />
              </div>

              <div className="space-y-2 flex-1">
                <p className="font-bold">Direction:</p>
                <select name="" id="" className="input-primary">
                  <option value="">Horizontal</option>
                  <option value="">Vertical</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="btn-primary">DRAW</button>
          </div>
        </form>

        <section>
          <h3 className="font-bold">Output</h3>
        </section>
      </main>
    </div>
  );
}

export default App;
