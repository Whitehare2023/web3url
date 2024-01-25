let step = 1;
let inputText = "";

chrome.runtime.onInstalled.addListener(() => {
  console.log("web3url extension installed and service worker started.");
});

chrome.omnibox.onInputChanged.addListener(function (text, suggest) {
  suggest([
    {
      content: `${text}`,
      description: `choose chain when you complete`,
    },
  ]);
});

chrome.omnibox.onInputEntered.addListener((input, disposition) => {
  inputText = input;
  chrome.windows.create({
    url: "popup.html",
    type: "popup",
    width: 400,
    height: 300,
  });
});

const jump = (networkId, url) => {
  // const [networkId, ...extraParam] = input.split(".");
  // const url = extraParam.join(".");
  // let networkId = nets.find(({ content }) => content === network)?.id;
  let networkSuffix = `.${networkId}.w3link.io`;
  if (!networkId) {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icon.png",
      title: "Alarm",
      message: "not match chain,please try again",
    });
    return;
  }
  console.log("networkId: " + networkId);
  console.log("networkSuffix: " + networkSuffix);
  let newUrl = "";
  const [address, ...otherParams] = url.split("/");
  console.log("address: ", address);
  console.log("otherParams: ", otherParams);
  if (address.startsWith("0x")) {
    newUrl = `https://${address}${networkSuffix}/` + otherParams.join("/");
  } else {
    newUrl =
      `https://${address.replace(".eth", ".w3eth.io")}/` +
      otherParams.join("/");
  }

  // chrome.tabs.update({ url: newUrl });
  console.log("newUrl:", newUrl);
  // 执行创建新标签页的操作
  chrome.tabs.create({ url: newUrl });
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("Received value:", request.value);
  // Process the received value as needed
  const input = inputText;
  inputText = "";
  jump(request.value, input);
});
