var {override, setWebpackPublicPath} = require("customize-cra");
module.exports = override(
  setWebpackPublicPath('http://152.136.155.216/react-pie/')
)
