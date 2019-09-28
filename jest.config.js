module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.test.{js,jsx}'],
    coverageDirectory: './coverage/',
    setupFilesAfterEnv: ['./setupJest.js'],
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest'
    },
    transformIgnorePatterns: ['/node_modules/(?!antd)'],
    verbose: true
};
