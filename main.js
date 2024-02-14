// Restricts input for the given textbox to the given inputFilter function.
function setInputFilter(textbox, inputFilter, errMsg) {
  [ "input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop", "focusout" ].forEach(function(event) {
    textbox.addEventListener(event, function(e) {
      if (inputFilter(this.value)) {
        // Accepted value.
        if ([ "keydown", "mousedown", "focusout" ].indexOf(e.type) >= 0){
          this.classList.remove("input-error");
          this.setCustomValidity("");
        }

        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      }
      else if (this.hasOwnProperty("oldValue")) {
        // Rejected value: restore the previous one.
        this.classList.add("input-error");
        this.setCustomValidity(errMsg);
        this.reportValidity();
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      }
      else {
        // Rejected value: nothing to restore.
        this.value = "";
      }
    });
  });
}

setInputFilter(
  document.getElementById("bill"),
  function (value) {
    return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp.
  },
  "Only digits and '.' are allowed"
);
setInputFilter(
  document.getElementById("people"),
  function (value) {
    return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp.
  },
  "Only digits and '.' are allowed"
);
setInputFilter(
  document.getElementById("custom"),
  function (value) {
    return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp.
  },
  "Only digits and '.' are allowed"
);

let billInput = document.querySelector("#bill");
let billErr = document.querySelector(".Err-bill");

let peopleInput = document.querySelector("#people");
let peopleErr = document.querySelector(".Err-people");

let totalSpan = document.querySelector(".total-span");
let tipSpan = document.querySelector(".tip-span");

let reset = document.querySelector(".reset");

billInput.addEventListener("input", () => {
  reset.classList.add("active");
  tipButtons.forEach((button) => button.classList.remove("active"));
  customInput.value = "";
  tipSpan.innerHTML = "$0.00";
  if (peopleInput.value == 0) {
    peopleErr.style.display = "block";
    peopleInput.style.borderColor = "red";
    totalSpan.innerHTML = `$0.00`;
  } else {
    totalSpan.innerHTML = `$${(billInput.value / peopleInput.value).toFixed(2)}`;
  }
  billErr.style.display = "none";
  billInput.style.borderColor = "rgb(38, 206, 155)";
  reset.addEventListener("click", () => {
    location.reload();
  });
})

billInput.addEventListener("blur", () => {
  if (billInput.value == 0) {
    billInput.style.borderColor = "red";
    billErr.style.display = "block";
  } else {
    billInput.style.borderColor = "white";
  }
});

billInput.addEventListener("focus", () => {
  billInput.style.borderColor = "rgb(38, 206, 155)";
});

peopleInput.addEventListener("input", () => {
  reset.classList.add("active");
  tipButtons.forEach(button => button.classList.remove("active"));
  customInput.value = "";
  totalSpan.innerHTML = "$0.00";
  tipSpan.innerHTML = "$0.00";
  if (peopleInput.value == 0) {
    peopleErr.style.display = "block";
    peopleInput.style.borderColor = "red";
  } else {
    peopleErr.style.display = "none";
    peopleInput.style.borderColor = "rgb(38, 206, 155)";
    if (billInput.value == 0) {
      billErr.style.display = "block";
      billInput.style.borderColor = "red";
    } else {
      totalSpan.innerHTML = `$${(billInput.value / peopleInput.value).toFixed(2)}`;
    }
  }
  reset.addEventListener("click", () => {
    location.reload();
  });
})

peopleInput.addEventListener("blur", () => {
  if (peopleInput.value == 0) {
    peopleInput.style.borderColor = "red";
    peopleErr.style.display = "block";
  } else {
    peopleInput.style.borderColor = "white";
  }
});

peopleInput.addEventListener("focus", () => {
  peopleInput.style.borderColor = "rgb(38, 206, 155)";
});

let tipButtons = document.querySelectorAll(".tip button");
let customInput = document.querySelector("#custom");

tipButtons.forEach(button => {
  button.addEventListener("click", () => {
    if (billInput.value.length == 0 || peopleInput.value.length == 0) {
      tipButtons.forEach((button) => button.classList.remove("active"));
      customInput.value = "";
    } else {
      tipButtons.forEach((button) => button.classList.remove("active"));
      button.classList.add("active");
      customInput.value = "";
      tipSpan.innerHTML = `$${((billInput.value * parseFloat(button.textContent) / 100) / peopleInput.value).toFixed(2)}`;
      totalSpan.innerHTML = `$${(billInput.value / peopleInput.value +(billInput.value * parseFloat(button.textContent)) /100 /peopleInput.value).toFixed(2)}`;
    }
  });
});

customInput.addEventListener("input", () => {
  tipButtons.forEach((button) => button.classList.remove("active"));
  if (billInput.value.length == 0 || peopleInput.value.length == 0) {
    customInput.value = "";
    totalSpan.innerHTML = "$0.00";
  } else {
    tipSpan.innerHTML = `$${(
      (billInput.value * parseFloat(customInput.value)) /
      100 /
      peopleInput.value
      ).toFixed(2)}`;
    totalSpan.innerHTML = `$${(
      billInput.value / peopleInput.value +
      (billInput.value * parseFloat(customInput.value)) /
      100 /
      peopleInput.value
      ).toFixed(2)}`;
      if (customInput.value.length == 0) {
        totalSpan.innerHTML = `$${(billInput.value / peopleInput.value).toFixed(2)}`;
        tipSpan.innerHTML = `$0.00`;
      }
    }
  })

