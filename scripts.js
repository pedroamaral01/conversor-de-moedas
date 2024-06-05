const currencySelect = document.querySelector(".currency-select")
const convertButton = document.querySelector(".convert-button")
var parametroRecebidoApi = "";

fetch(`https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL${parametroRecebidoApi}`)
.then(response => {
  if (!response.ok) {
    throw new Error('Erro ao buscar a cotação');
  }
  return response.json();
})
.then(data => {
    parametroRecebidoApi = data;
  console.log({...data});
})
.catch(error => {
  console.error('Erro:', error);
  alert("Erro ao consultar valor moeda")
});

function convertValues() {
    const inputCurrencyValue = document.querySelector(".input-currency").value
    const currencyValueToConvert = document.querySelector(".currency-value-to-convert") // Valor em Real
    const currencyValueConverted = document.querySelector(".currency-value") // Outras Moedas

    if (currencySelect.value == "dolar") {

        currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(inputCurrencyValue / parametroRecebidoApi.USDBRL.bid)
    }

    if (currencySelect.value == "euro") {

        currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR"
        }).format(inputCurrencyValue / parametroRecebidoApi.EURBRL.bid)
    }

    currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(inputCurrencyValue)
}

function changeCurrency() {
    const currencyName = document.querySelector("#currency-name")
    const currencyImage = document.querySelector(".currency-img")

    if (currencySelect.value == "dolar") {
        currencyName.innerHTML = "Dolar"
        currencyImage.src = "./imagens/dolar.png"
    }

    if (currencySelect.value == "euro") {
        currencyName.innerHTML = "Euro"
        currencyImage.src = "./imagens/euro.png"
    }
}
currencySelect.addEventListener("change", changeCurrency)
convertButton.addEventListener("click", convertValues)