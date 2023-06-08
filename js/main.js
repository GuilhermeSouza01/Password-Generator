const passwordLengthEl = document.querySelector("#password-length");
const passInput = document.getElementById("password-input");
const copyPassButton = document.querySelector("#copy-button");
const simpleCopyButton = document.querySelector("#simple-copy-pass");
const renewButton = document.querySelector("#renew");
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
  changeFontSize();
}

function qualityOfPassword() {
  //criando pesos para seleções de checkbox
  //T * 0.25 + M * 0.15 + N * 0.25 + S * 0.25 = 100%
  const percent = Math.round(
    (rangeValue / 64) * 25 +
      (upperCaseCheckEl.checked ? 20 : 0) +
      (numberCheckEl.checked ? 25 : 0) +
      (symbolCheckEl.checked ? 30 : 0)
  );

  securityBarEl.style.width = `${percent}%`;

  if (percent > 69) {
    //safe
    securityBarEl.classList.remove("critical");
    securityBarEl.classList.remove("warning");
    securityBarEl.classList.add("safe");
  } else if (percent > 50) {
    //warning
    securityBarEl.classList.remove("critical");
    securityBarEl.classList.add("warning");
    securityBarEl.classList.remove("safe");
  } else if (percent < 50) {
    //crtitical
    securityBarEl.classList.add("critical");
    securityBarEl.classList.remove("warning");
    securityBarEl.classList.remove("safe");
  }

  if (percent >= 100) {
    securityBarEl.classList.add("completed");
  }
}

const changeFontSize = () => {
  if (rangeValue > 45) {
    passInput.classList.remove("font-sm");
    passInput.classList.remove("font-xs");
    passInput.classList.add("font-xxs");
  } else if (rangeValue > 35) {
    passInput.classList.remove("font-sm");
    passInput.classList.add("font-xs");
    passInput.classList.remove("font-xxs");
  } else if (rangeValue > 23) {
    passInput.classList.add("font-sm");
    passInput.classList.remove("font-xs");
    passInput.classList.remove("font-xxs");
  } else {
    passInput.classList.remove("font-sm");
    passInput.classList.remove("font-xs");
    passInput.classList.remove("font-xxs");
  }
};

const copyPass = () => {
  navigator.clipboard.writeText(passInput.value);
};

copyPassButton.addEventListener("click", copyPass);
simpleCopyButton.addEventListener("click", () => {
  copyPass();
  simpleCopyButton.classList.add("pulse-copy");
});
renewButton.addEventListener("click", function () {
  generatePass();
  renewButton.classList.add("rotate-button");

  setTimeout(() => {
    renewButton.classList.remove("rotate-button");
  }, 600);
});
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
