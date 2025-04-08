module.exports = {
    testEnvironment: "node",
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    globals: {
        "ts-jest": {
        tsconfig: "tsconfig.json",
        },
    },
    testPathIgnorePatterns: [
        '/node_modules/',
        '/src/__tests__/setup.ts'
    ],
    testTimeout: 50000,
}