chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "analyze-sentence",
    title: "Analyze Sentence",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "analyze-sentence") {
    const sentence = info.selectionText;
    
    // Notify the user something is happening
    chrome.action.setBadgeText({ text: "..." });

    try {
      const response = await fetch("http://localhost:3000/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ sentence })
      });

      const result = await response.json();

      // Store results for popup
      chrome.storage.local.set({ lastAnalysis: result }, () => {
        chrome.action.setBadgeText({ text: "Done" });
        setTimeout(() => chrome.action.setBadgeText({ text: "" }), 3000);
        
        // Open popup (Optional: in modern extensions, we can't open popup programmatically easily, 
        // but we can notify via notification or just wait for user to click)
      });
    } catch (error) {
      console.error("Analysis error:", error);
      chrome.action.setBadgeText({ text: "ERR" });
    }
  }
});
