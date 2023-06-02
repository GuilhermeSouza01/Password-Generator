const passwordLengthEl = document.querySelector("#password-length");
const passInput = document.getElementById("password-input");
const copyPassButton = document.querySelector("#copy-button");
const simpleCopyButton = document.querySelector("#simple-copy-pass");
const upperCaseCheckEl = document.querySelector("#uppercase-check");
const numberCheckEl = document.querySelector("#number-check");
const symbolCheckEl = document.querySelector("#symbol-check");

let rangeValue = 16;

function generatePass() {
  let chars = "abcdefghjkmnpqrstuvwxyz";

  const upperCaseChars = "ABCDEFGHJKMNPQRSTUVWXYZ";
  const numbersChars = "123456789";
  const symbolChars = "?!@&*()[]#";

  if (upperCaseCheckEl.checked) {
    chars += upperCaseChars;
  }
  if (numberCheckEl.checked) {
    chars += numbersChars;
  }

  if (symbolCheckEl.checked) {
    chars += symbolChars;
  }

  let password = "";

  for (let i = 0; i < rangeValue; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }
  passInput.value = password;
}

const copyPass = () => {
  navigator.clipboard.writeText(passInput.value);
};

copyPassButton.addEventListener("click", copyPass);
simpleCopyButton.addEventListener("click", copyPass);

// add event listener to checks

upperCaseCheckEl.addEventListener("click", generatePass);
numberCheckEl.addEventListener("click", generatePass);
symbolCheckEl.addEventListener("click", generatePass);

passwordLengthEl.addEventListener("input", () => {
  rangeValue = passwordLengthEl.value;
  generatePass();
});

generatePass();
