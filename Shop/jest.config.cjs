module.exports = {
    preset: 'ts-jest',
    verbose: true,
    moduleDirectories: ["node_modules", "Shop"],
    detectOpenHandles:false,
    transform: {
      '^.+\\.(ts|tsx)?$': 'ts-jest',
      "^.+\\.(js|jsx)$": "babel-jest",
    }
  };
  // module.exports = {};