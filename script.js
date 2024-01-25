document.addEventListener("DOMContentLoaded", function () {
  const nets = [
    { content: "Ethereum Mainnet", id: 1 },
    { content: "Sepolia Testnet", id: 11155111 },
    { content: "Goerli Testnet", id: 5 },
    { content: "Optimism", id: 10 },
    { content: "Optimism Testnet", id: 420 },
    { content: "Arbitrum One", id: 42161 },
    { content: "Arbitrum Nova", id: 42170 },
    { content: "Arbitrum Testnet", id: 421613 },
    { content: "Metis Andromeda", id: 1088 },
    { content: "Metis Testnet", id: 599 },
    { content: "Web3Q Galileo Testnet", id: 3334 },
    { content: "BNB Smart Chain", id: 56 },
    { content: "BNB Smart Chain Testnet", id: 97 },
    { content: "Avalanche C-Chain", id: 43114 },
    { content: "Avalanche Fuji Testnet", id: 43113 },
    { content: "Fantom Opera", id: 250 },
    { content: "Fantom Testnet", id: 4002 },
    { content: "Polygon Mainnet", id: 137 },
    { content: "Polygon Mumbai", id: 80001 },
    { content: "Polygon zkEVM Testnet", id: 1402 },
    { content: "QuarkChain Mainnet Shard 0", id: 100001 },
    { content: "QuarkChain Devnet Shard 0", id: 110001 },
    { content: "Harmony Mainnet Shard 0", id: 1666600000 },
    { content: "Harmony Testnet Shard 0", id: 1666700000 },
    { content: "Evmos", id: 9001 },
    { content: "Evmos Testnet", id: 9000 },
  ];
  // Get the select element
  const selectElement = document.getElementById("networkSelect");

  // Loop through the array and create options
  nets.forEach((network) => {
    const optionElement = document.createElement("option");
    optionElement.value = network.id;
    optionElement.textContent = network.content;
    selectElement.appendChild(optionElement);
  });

  const myButton = document.getElementById("myButton");

  myButton.addEventListener("click", function () {
    getValue();
  });
});

function getValue() {
  var dropdown = document.getElementById("networkSelect");
  var selectedValue = dropdown.options[dropdown.selectedIndex].value;
  chrome.runtime.sendMessage({ value: selectedValue });
  //   window.close();
  setTimeout(() => {
    window.close();
  }, 300);
}
