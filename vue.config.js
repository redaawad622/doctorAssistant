module.exports = {
  transpileDependencies: ["vuetify"],

  pwa: {
    name: "Doctor Assistant",
    themeColor: "#2759FA",
    msTileColor: "#2759FA",
    manifestOptions: {
      background_color: "#FFFFFF",
    },
  },
  devServer: {
    proxy: "http://192.168.1.10/",
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        publish: ["github"],
        copyright: "Copyright © 2020 by reda awad, All rights reserved",
      },
        nodeIntegration: true
    },
  },
};
