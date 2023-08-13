module.exports = {
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  // testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(t|j)s$',
  testMatch: [ "**/__tests__/**/*.[jt]s?(x)",],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
};
