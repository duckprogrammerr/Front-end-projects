let passwordField = document.getElementById("password-input");
let copyBtn = document.getElementById("copy-btn");
let passwordStrength = document.getElementById("password-strength");
let lengthSlider = document.getElementById("length-slider");
let lengthLabel = document.getElementById("length-label");
let checkboxes = document.querySelectorAll(".password-settings-wrapper input");
let generatePassBtn = document.getElementById("generate-password");
const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!&()+-./<=>@[]^_{|}~",
};
const settings = {
  length: 15,
  lowerCase: true,
  upperCase: false,
  numbers: false,
  symbols: false,
  excludeDuplicate: false,
  includeSpaces: false,
  // this function generate a string that can generates new passwords
  returnString() {
    let string = "";
    if (this.lowerCase) string += characters.lowercase;
    if (this.upperCase) string += characters.uppercase;
    if (this.numbers) string += characters.numbers;
    if (this.symbols) string += characters.symbols;
    if (this.includeSpaces) string += " ";
    return string;
  },
};
let generateAbleString = settings.returnString();
function generatePassword() {
  let password = "";
  for (let i = 0; i < settings.length; i++) {
    let letter =
      generateAbleString[Math.floor(Math.random() * generateAbleString.length)];
    settings.excludeDuplicate && password.includes(letter)
      ? i--
      : (password += letter);
  }
  return password;
}
// this function to show the password to the ui
const emitPassword = (e) => {
  let password = generatePassword();
  passwordField.value = password;
  checkPasswordStrength();
};

const checkPasswordStrength = (_) =>
  (passwordStrength.className =
    settings.length <= 10
      ? "weak"
      : settings.length <= 20
      ? "medium"
      : "strong");

// Events listeners
const updateSlider = (e) => {
  settings.length = lengthSlider.value;
  lengthLabel.innerText = lengthSlider.value;
  emitPassword();
};
const copyPassowrd = () => {
  navigator.clipboard.writeText(passwordField.value);
  copyBtn.innerText = "done";
  copyBtn.style.color = "#40a2e3";
  setTimeout(() => {
    copyBtn.innerText = "copy_all";
    copyBtn.style.color = "#707070";
  }, 1500);
};

lengthSlider.addEventListener("input", updateSlider);
generatePassBtn.addEventListener("click", () => emitPassword());
copyBtn.addEventListener("click", copyPassowrd);
checkboxes.forEach((e) => {
  e.addEventListener("click", () => {
    settings[e.name] = e.checked;
    generateAbleString = settings.returnString();
  });
});

window.onload = () => {
  //  Range
  lengthSlider.value = settings.length;
  lengthLabel.innerText = settings.length;
  //  checkboxes
  Array.prototype.forEach.call(
    checkboxes,
    (e) => (e.checked = settings[e.name])
  );
};
