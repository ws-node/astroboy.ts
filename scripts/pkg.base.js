module.exports = {
  debug: false,
  rc: false,
  add: 0,
  whiteSpace: "  ",
  rootPath: ".",
  outDist: "dist",
  useYarn: true,
  outTransform: json => ({
    ...json,
    main: "./index.js",
    types: "./index.d.ts",
    scripts: undefined,
    nyc: undefined,
    devDependencies: {
      ...json.devDependencies,
      chai: undefined,
      mocha: undefined,
      nyc: undefined,
      coveralls: undefined,
      tslint: undefined,
      typedoc: undefined,
      "@bigmogician/publisher": undefined,
      "@types/chai": undefined,
      "@types/mocha": undefined,
      "source-map-support": undefined,
      "tslint-config-prettier": undefined,
      "typedoc-plugin-external-module-name": undefined
    }
  })
};
