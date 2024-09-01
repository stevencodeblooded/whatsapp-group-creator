chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Message received:", message);
    if (message.type === "createGroup") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length > 0) {
                console.log("Executing script in tab:", tabs[0].id);
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    func: simulateUserActions,
                    args: [message.contacts]
                });
            } else {
                console.error("No active tab found");
            }
        });
    }
});
