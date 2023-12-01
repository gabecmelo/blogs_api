const { expect } = require('chai');

describe('Hello', function () {
  it('should return hello world', function () {
    expect('Hello world!').to.equal('Hello world!');
  });
});