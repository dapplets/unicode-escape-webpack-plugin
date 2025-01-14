# Unicode Escape Plugin for Webpack

`@dapplets/unicode-escape-webpack-plugin` is a simple Webpack plugin that escapes all Unicode characters in your JavaScript files. This is useful for ensuring compatibility with environments that do not support certain Unicode characters natively.

## Features

- Escapes all Unicode characters (`\u007f` and above) in `.js` files.
- Configurable to target specific file types or extensions.
- Lightweight and easy to use.

## Installation

Install the package via npm:

```bash
npm install -D @dapplets/unicode-escape-webpack-plugin
```

## Usage

Add the plugin to your Webpack configuration file:

### Example: Basic Configuration

javascript

Copy code

```jsx
const UnicodeEscapePlugin = require("@dapplets/unicode-escape-webpack-plugin");

module.exports = {
  mode: "production", // or 'development'
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist",
  },
  plugins: [
    new UnicodeEscapePlugin({
      test: /\.js$/, // Process only `.js` files (default)
    }),
  ],
};
```

### Example: Custom File Types

You can customize the `test` option to target other file types:

javascript

Copy code

```jsx
new UnicodeEscapePlugin({
  test: /\.(js|jsx|ts|tsx)$/, // Escape Unicode in JavaScript and TypeScript files
});
```

## How It Works

The plugin hooks into Webpack's build process and processes the specified files during the `emit` phase. It escapes Unicode characters using the `\uXXXX` format for all characters with a Unicode code point of `\u007f` or higher.

### Input Example

javascript

Copy code

`const example = "Unicode: é, ☃, 🐱";`

### Output Example

javascript

Copy code

`const example = "Unicode: \\u00e9, \\u2603, \\ud83d\\udc31";`

## Options

| Option | Type     | Default   | Description                                         |
| ------ | -------- | --------- | --------------------------------------------------- |
| `test` | `RegExp` | `/\.js$/` | A regular expression to match files for processing. |

## Contributing

Contributions are welcome! If you encounter any issues or have feature requests, feel free to open an issue or submit a pull request on [GitHub](https://github.com/dapplets/unicode-escape-webpack-plugin).

## License

This project is licensed under the MIT License.
