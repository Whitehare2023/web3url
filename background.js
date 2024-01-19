const nets = [
  { content: "mainnet", description: "use mainnet", id: 1 },
  { content: "sepolia", description: "use sepolia", id: 11155111 },
];

chrome.runtime.onInstalled.addListener(() => {
  console.log("web3url extension installed and service worker started.");
});

chrome.omnibox.onInputChanged.addListener(function (text, suggest) {
  // 设置默认建议，显示在下拉菜单的最上面
  chrome.omnibox.setDefaultSuggestion({
    description: "please check net to jump",
  });
  // 在建议中包含额外的参数
  suggest(
    nets.map(({ content, description }) => ({
      content: `${content}.${text}`,
      description,
    }))
  );
});

chrome.omnibox.onInputEntered.addListener((input, disposition) => {
  const [network, ...extraParam] = input.split(".");
  const url = extraParam.join(".");
  let networkId = nets.find(({ content }) => content === network)?.id;
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

  chrome.tabs.update({ url: newUrl });
  // if (newUrl) {
  //   switch (disposition) {
  //     case "currentTab":
  //       chrome.tabs.update({ url: newUrl });
  //       break;
  //     case "newForegroundTab":
  //       chrome.tabs.create({ url: newUrl });
  //       break;
  //     case "newBackgroundTab":
  //       chrome.tabs.create({ url: newUrl, active: false });
  //       break;
  //   }
  // }
});
