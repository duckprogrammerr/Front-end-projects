let gridBox = document.getElementById("container");
let gridWidth = document.getElementById("width-range");
let gridHeight = document.getElementById("height-range");
let widthValue = document.getElementById("width-value");
let heightValue = document.getElementById("height-value");
let gridButton = document.getElementById("submit-grid");
let removeGridButton = document.getElementById("remove-grid");
let clearGridButton = document.getElementById("clear-grid");
let earseButton = document.getElementById("earse-btn");
let paintButton = document.getElementById("paint-btn");
let colorPicker = document.getElementById("color-input");
let gridItemSize = "1.2em";

let events = {
  mouse: {
    down: "mousedown",
    move: "mousemove",
    up: "mouseup",
  },
  touch: {
    down: "touchstart",
    move: "touchmove",
    up: "touchend",
  },
};
let deviceType = "";

let draw = false;
let earse = false;

const isTouchDevice = () => {
  try {
    document.createEvent("TouchEvent");
    deviceType = "touch";
    return true;
  } catch (e) {
    deviceType = "mouse";
    return false;
  }
};

isTouchDevice();

gridButton.addEventListener("click", () => {
  gridBox.innerHTML = "";
  let count = gridWidth.value * gridHeight.value;
  gridBox.style.gridTemplateColumns = `repeat(${gridWidth.value},${gridItemSize})`;

  for (let i = 0; i < count; i++) {
    gridBox.appendChild(createItemBox());
  }
});
//  create Item
function createItemBox() {
  let item = document.createElement("div");
  item.addEventListener("dragstart", (e) => e.preventDefault());
  // Down
  item.addEventListener(events[deviceType].down, () => {
    draw = true;
    if (earse) {
      item.style.border = "1px solid #ddd";
      item.style.backgroundColor = "transparent";
    } else {
      item.style.border = "none";
      item.style.backgroundColor = colorPicker.value;
    }
  });
  // move
  item.addEventListener(events[deviceType].move, (e) => {
    let elementId = document.elementFromPoint(
      !isTouchDevice() ? e.clientX : e.touches[0].clientX,
      !isTouchDevice() ? e.clientY : e.touches[0].clientY
    );
    checker(elementId);
  });
  // Up
  item.addEventListener(events[deviceType].up, () => {
    draw = false;
  });
  return item;
}

function checker(el) {
  if (draw && !earse) {
    el.style.border = "none";
    el.style.backgroundColor = colorPicker.value;
  } else if (draw && earse) {
    el.style.border = "1px solid #ddd";
    el.style.backgroundColor = "transparent";
  }
}

earseButton.addEventListener("click", () => (earse = true));
paintButton.addEventListener("click", () => (earse = false));
clearGridButton.addEventListener("click", () => {
  gridBox.children;
  Array.prototype.forEach.call(gridBox.children, (e) => {
    e.style.backgroundColor = "transparent";
    e.style.border = "1px solid #ddd";
  });
});
removeGridButton.addEventListener("click", () => (gridBox.innerHTML = ""));

gridWidth.addEventListener(
  "input",
  () => (widthValue.innerHTML = gridWidth.value)
);
gridHeight.addEventListener(
  "input",
  () => (heightValue.innerHTML = gridHeight.value)
);
