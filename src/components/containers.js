export const InputContainer = ({ children, label }) => {
  return (
    <div className="space-y-2 w-full md:w-1/2">
      <p className="font-bold">{label}</p>
      {children}
    </div>
  );
};

export const OutputContainer = ({ children, direction }) => {
  return (
    <div className="overflow-auto flex items-center justify-center">
      <div className="max-h-[50vh] max-w-full">
        <div
          className={`flex ${
            direction === "horizontal"
              ? "flex-row space-x-16 pb-8"
              : "flex-col space-y-16"
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export const GridContainer = ({ children, size }) => {
  return (
    <div
      className="grid gap-x-4"
      style={{
        gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
      }}
    >
      {children}
    </div>
  );
};
