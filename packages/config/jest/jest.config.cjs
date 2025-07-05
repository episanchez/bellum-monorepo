module.exports = {
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "tsx", "js"],
  transform: {
    "^.+\\.(t|j)sx?$": ["ts-jest", { tsconfig: "../../tsconfig.base.json" }]
  }
};
