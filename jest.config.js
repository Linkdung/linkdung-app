module.exports = {
  verbose: true, // Menampilkan output yang detail
  moduleFileExtensions: ["js", "jsx"], // Ekstensi file yang diuji
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest", // Menggunakan Babel untuk mengubah kode JavaScript/JSX
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Untuk menguji CSS
  },
  testEnvironment: "jsdom",
  testMatch: ["**/__tests__/**/*.js?(x)", "**/?(*.)+(spec|test).js?(x)"], // Pola pencarian file pengujian
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"], // Mengimpor ekstensi expect dari testing-library
};
