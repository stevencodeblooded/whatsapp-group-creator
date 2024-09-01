document.getElementById('createGroupButton').addEventListener('click', () => {
  const fileInput = document.getElementById('fileInput');
  if (fileInput.files.length === 0) {
      alert("Please upload a CSV file.");
      return;
  }

  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function(event) {
      const csv = event.target.result;
      const contacts = parseCSV(csv);

      // Instead of initiating group creation, execute the simulateUserActions directly
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.scripting.executeScript({
              target: { tabId: tabs[0].id },
              func: simulateUserActions,
              args: [contacts]
          });
      });
  };

  reader.readAsText(file);
});

function parseCSV(csv) {
  const lines = csv.split('\n');
  const contacts = lines.map(line => line.trim()).filter(line => line.length > 0);
  return contacts;
}

// Define simulateUserActions here
function simulateUserActions(contacts) {
  // Same implementation as in background.js or content.js
  const menuIcon = document.querySelector('[data-icon="menu"]');
  if (menuIcon) {
      menuIcon.click();
  } else {
      console.error("Menu icon not found");
      return;
  }

  setTimeout(() => {
      const newGroupOption = document.querySelector('div[aria-label="New group"]');
      if (newGroupOption) {
          newGroupOption.click();

          setTimeout(() => {
              contacts.forEach(contact => {
                  const inputField = document.querySelector('input[type="text"]');
                  if (inputField) {
                      inputField.value = contact;
                      inputField.dispatchEvent(new Event('input', { bubbles: true }));

                      setTimeout(() => {
                          const firstResult = document.querySelector('span[title="' + contact + '"]');
                          if (firstResult) {
                              firstResult.click();
                          } else {
                              console.error("Contact not found: " + contact);
                          }
                      }, 500);
                  } else {
                      console.error("Contact input field not found");
                  }
              });

              setTimeout(() => {
                  const nextButton = document.querySelector('span[data-icon="forward-light"]');
                  if (nextButton) {
                      nextButton.click();

                      setTimeout(() => {
                          const groupNameInput = document.querySelector('div[role="textbox"]');
                          if (groupNameInput) {
                              groupNameInput.textContent = "New Group Name"; // Customize the group name here
                              groupNameInput.dispatchEvent(new Event('input', { bubbles: true }));

                              const createButton = document.querySelector('span[data-icon="checkmark-light"]');
                              if (createButton) {
                                  createButton.click();
                              } else {
                                  console.error("Create button not found");
                              }
                          } else {
                              console.error("Group name input not found");
                          }
                      }, 500);
                  } else {
                      console.error("Next button not found");
                  }
              }, 1000);

          }, 1000);
      } else {
          console.error("New group option not found");
      }
  }, 500);
}
