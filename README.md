# XYZ Input Translator

This web app accepts an input string of either x, y, or z and produce a low-resolution ascii art-like representation of the letter

- https://xyz-input-translator.vercel.app
- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Thought Process:

1. Letter representation is an array that forms a grid
2. By having the size input, a square grid can be formed (size squared) and necessary parts (center block, corners, edges) of the grid can be determined.
3. The necessary parts will act as a start and end point when drawing the lines(slash, backslash, vertical & horizontal slash) in the grid.
4. Combining these lines will output an array(word) of arrays(letter) and will produce the letter representation. This will enable the translation to be dynamic and flexible for all valid size values.

Examples:

- X contains a full slash and a full back slash from corner to corner
- Y contains a half backslash, a half slash, and a half vertical slash
- Z contains two horizontal slashes and a full slash to connect
- An X in a 3x3 grid size will have an array value of [0, 2, 4, 6, 8]
- A Y in a 3x3 grid size will have an array value of [0, 2, 4, 7]
- A Z in a 3x3 grid size will have an array value of [0, 1, 2, 4, 6, 7, 8]

Features:

- Dynamic letter representation size
- Form Validation
- Responsive design

## Views

- Horizontal sample

  - ![](https://github.com/Randell-janus/xyz-input-translator/blob/main/public/snapshots/horizontal.png)

- Vertical sample

  - ![](https://github.com/Randell-janus/xyz-input-translator/blob/main/public/snapshots/vertical.png)

- Horizontal sample
  - ![](https://github.com/Randell-janus/xyz-input-translator/blob/main/public/snapshots/error.png)
