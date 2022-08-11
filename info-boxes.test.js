const infoBoxes = require('./info-boxes');

test('function exist', () => {
  expect(infoBoxes.setBoxes).toBeDefined();
});

test('get cookie values', () => {
  expect(typeof infoBoxes.getSelected()).toBe("object");
});