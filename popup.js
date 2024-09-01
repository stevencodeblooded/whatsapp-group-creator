document.getElementById('createGroupButton').addEventListener('click', () => {
  console.log("Create Group button clicked");

  const fileInput = document.getElementById('fileInput');
  if (fileInput.files.length === 0) {
      alert("Please upload a CSV file.");
      return;
  }

  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function(event) {
      console.log("File read successfully");
      const csv = event.target.result;
      const contacts = parseCSV(csv);

      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          console.log("Injecting content.js into tab:", tabs[0].id);

          // Inject content.js
          chrome.scripting.executeScript({
              target: { tabId: tabs[0].id },
              files: ['content.js']
          }, () => {
              console.log("content.js injected");

              // Execute simulateUserActions function
              chrome.scripting.executeScript({
                  target: { tabId: tabs[0].id },
                  func: (contacts) => {
                      if (window.simulateUserActions) {
                          window.simulateUserActions(contacts);
                      } else {
                          console.error("simulateUserActions function not found");
                      }
                  },
                  args: [contacts]
              });
          });
      });
  };

  reader.readAsText(file);
});

function parseCSV(csv) {
  console.log("Parsing CSV data");
  const lines = csv.split('\n');
  const contacts = lines.map(line => line.trim()).filter(line => line.length > 0);
  return contacts;
}
