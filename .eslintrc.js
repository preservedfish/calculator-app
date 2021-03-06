module.exports = {
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier', 'jest'],
  rules: {
    'prettier/prettier': ['error'],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
  },
  env: {
    browser: true,
    'jest/globals': true,
  },
};
