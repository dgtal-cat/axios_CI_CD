module.exports = {
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  testMatch: ['**/specs/*.spec.*'],
  testRunner: 'jest-jasmine2',
  setupFilesAfterEnv: ['jest-allure/dist/setup'],
  globals: {
    testTimeout: 50000
  },
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: './html-report',
        filename: 'report.html',
        openReport: false
      }
    ]
  ],
  verbose: true
}
