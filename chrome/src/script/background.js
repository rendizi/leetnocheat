const banned = [
  "https://chatgpt.com",
  "https://gemini.google.com"
];

chrome.tabs.onUpdated.addListener((tabId, changeInfo, updatedTab) => {
  if (changeInfo.url) {
    chrome.tabs.query({}, (tabs) => {
      let wasLeetcode = false;

      tabs.forEach((tab) => {
        if (tab.url.startsWith("https://leetcode.com/problems/")) {
          if (tab.url.endsWith("/solutions/")) {
            const newUrl = tab.url.slice(0, -11) + "/description/";
            chrome.tabs.update(tab.id, { url: newUrl });
            return; 
          }
          
          
          wasLeetcode = true;
          
        }
      });

      if (wasLeetcode) {
        tabs.forEach((tab) => {
          banned.forEach((bannedUrl) => {
            if (tab.url.startsWith(bannedUrl)) {
              chrome.tabs.update(tab.id, { url: "https://www.google.com" });
            }
          });
        });
      }
    });
  }
});
