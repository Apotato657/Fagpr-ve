module.exports = {
    setupFiles: ['./jest.setup.js'],
    testEnvironment: "jsdom", // Trenger dette for å simulere DOM i React
    transform: {
        "^.+\\.(jsx|ts|tsx)$": "ts-jest",
    },
    moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
    snapshotResolver: "<rootDir>/snapshotResolver.js",
    collectCoverage: true, // Samle testdekning
    collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}"], // Hvor Jest skal sjekke dekning
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/tools/jest/file.mock.js',
        '\\.(css|scss|sass|less)$': 'identity-obj-proxy',
    },
};
