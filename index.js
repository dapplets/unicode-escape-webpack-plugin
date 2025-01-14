class UnicodeEscapePlugin {
  constructor(options = {}) {
    this.test = options.test || /\.js$/; // Files to process
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync(
      "UnicodeEscapePlugin",
      (compilation, callback) => {
        // Iterate over all compiled assets
        Object.keys(compilation.assets).forEach((filename) => {
          if (this.test.test(filename)) {
            const asset = compilation.assets[filename];
            let source = asset.source();

            // Ensure the source is a string
            if (typeof source !== "string") {
              source = source.toString("utf8");
            }

            // Escape Unicode characters
            const escapedSource = source.replace(/[\u007f-\uffff]/g, (char) => {
              return (
                "\\u" + ("0000" + char.charCodeAt(0).toString(16)).slice(-4)
              );
            });

            // Update the asset
            compilation.assets[filename] = {
              source: () => escapedSource,
              size: () => escapedSource.length,
            };
          }
        });

        callback();
      }
    );
  }
}

module.exports = UnicodeEscapePlugin;
