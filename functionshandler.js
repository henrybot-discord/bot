const fs = require("fs");
const { join } = require("path");

module.exports = client => {
  fs.readdirSync(join(process.cwd(), "functions")).forEach(file => {
    try {
      const path = join(process.cwd(), "functions", file);
      if (typeof client.require == "function") {
        client.require(path)(client);
      } else {
        require(path)(client);
      }
      console.log(
        `Function: Loaded a function called: ${file.replace(".js", "")}`
      );
    } catch (err) {
      console.log(
        `ERROR: An error was generated while loading a function called: ${file}`
      );
      console.log("Error Message:" + err.message.error);
    }
  });
};
