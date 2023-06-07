const passwordLengthEl = document.querySelector("#password-length");
const passInput = document.getElementById("password-input");
const copyPassButton = document.querySelector("#copy-button");
const simpleCopyButton = document.querySelector("#simple-copy-pass");
const upperCaseCheckEl = document.querySelector("#uppercase-check");
const numberCheckEl = document.querySelector("#number-check");
const symbolCheckEl = document.querySelector("#symbol-check");
const securityBarEl = document.querySelector("#indicator-bar");

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
  qualityOfPassword();
}

function qualityOfPassword() {
  //criando pesos para seleções de checkbox
  //T * 0.25 + M * 0.15 + N * 0.25 + S * 0.25 = 100%
  const percent = Math.round(
    (rangeValue / 64) * 25 +
      (upperCaseCheckEl.checked ? 20 : 0) +
      (numberCheckEl.checked ? 20 : 0) +
      (symbolCheckEl.checked ? 25 : 0)
  );
  console.log(percent);
  securityBarEl.style.width = `${percent}%`;
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
  document.querySelector("#pass-length-text").innerText = rangeValue;
  generatePass();
});

generatePass();
