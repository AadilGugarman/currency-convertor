let mainURL =
  "https://raw.githubusercontent.com/WoXy-Sensei/currency-api/main/api/";
let selectCurrency = document.querySelectorAll(".select-currency select");

let btn = document.querySelector("button");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".message p");
let change = document.querySelector("#arrow");
let fromImg = document.querySelector(".from img");
let toImg = document.querySelector(".to img");

for (let select of selectCurrency) {
  for (currCode in codeList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;

    if (select.name == "from" && currCode == "USD") {
      newOption.selected = "selected";
    }
    if (select.name == "to" && currCode == "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (event) => {
    updateFlag(event.target);
  });
}

const updateFlag = (flag) => {
  let newFlag = flag.value;
  let countryCode = codeList[newFlag];
  let img = flag.parentElement.querySelector("img");
  let newImg = `https://flagsapi.com/${countryCode}/flat/64.png`;
  img.setAttribute("src", newImg);
};

btn.addEventListener("click", (event) => {
  event.preventDefault();
  getExchangeRate();
});
const getExchangeRate = async () => {
  let input = document.querySelector(".form input");
  let amount = input.value;
  if (amount < 1 || amount == "") {
    amount = 1;
    input.value = "1";
  }
  try {
    let URL = `${mainURL}${toCurr.value}_${fromCurr.value}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let currRate = data.rate;
    let totalRate = amount * currRate;
    msg.innerText = `${amount} ${fromCurr.value} = ${totalRate} ${toCurr.value}`;
  } catch (err) {
    msg.innerText = `404 Data Not Found`;
  }
};

change.addEventListener("click", (event) => {
  let tempValue = toCurr.value;
  toCurr.value = fromCurr.value;
  fromCurr.value = tempValue;

  let tempImg = toImg.src;
  toImg.src = fromImg.src;
  fromImg.src = tempImg;
});

window.addEventListener("load", () => {
  getExchangeRate();
});
