const getCookie = () => {
  return document.cookie.split(";").filter((item) => item.startsWith("cookie-solution="));
};

const getSelected = () => {
  let arrayValues = [];
  const cookie = getCookie();
  if (cookie[0]) {
    const cookieValue = cookie[0].split("=")[1];
    if (cookieValue) {
      arrayValues = cookieValue.split(",");
    }
  }
  return arrayValues;
};

const setBoxes = () => {
  const selected = getSelected();

  // each purposes
  const boxes = [...document.getElementsByClassName("info-box")];
  boxes.forEach((box) => {
    if ((selected.includes(box.id)) || (box.id.split(",").every(elem => selected.includes(elem)))) {
      box.classList.add("selected");
    }
  });

  // no purpose
  if (selected[0] !== "-1") {
    const box = document.getElementById("0");
    box.classList.add("selected");
  }
};

window.addEventListener('load', function (event) {
  setBoxes();
});