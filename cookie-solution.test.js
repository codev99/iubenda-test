const cookieSolution = require('./cookie-solution');
  
test('render button', () => {
  document.body.innerHTML = "<div></div>";
  cookieSolution.renderEditButton();
  expect(document.getElementById("btn-edit")).toBeTruthy();
});

test('render panel', () => {
  document.body.innerHTML = "<div></div>";
  cookieSolution.renderPanel();
  expect(document.getElementById("cookie-solution-panel")).toBeTruthy();
});