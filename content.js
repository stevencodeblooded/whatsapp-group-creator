// function simulateUserActions(contacts) {
//   // Step 1: Click the menu icon to open the dropdown
//   const menuIcon = document.querySelector('span[data-icon="menu"]');
//   if (menuIcon) {
//       menuIcon.click();

//       // Step 2: Wait for the dropdown to appear and click "New group"
//       setTimeout(() => {
//           const newGroupButton = document.querySelector('div[aria-label="New group"]');
//           if (newGroupButton) {
//               newGroupButton.click();

//               // Step 3: Add contacts to the new group
//               addContactsToGroup(contacts);
//           }
//       }, 500);
//   }
// }

// function addContactsToGroup(contacts) {
//   // This function will add the contacts to the group (to be implemented)
//   console.log("Adding contacts:", contacts);
// }


function simulateUserActions(contacts) {
  // Step 1: Click the menu icon to open the dropdown
  const menuIcon = document.querySelector('span[data-icon="menu"]');
  if (menuIcon) {
      menuIcon.click();

      // Step 2: Wait for the dropdown to appear and click "New group"
      setTimeout(() => {
          const newGroupButton = document.querySelector('div[aria-label="New group"]');
          if (newGroupButton) {
              newGroupButton.click();

              // Step 3: Wait for the new group dialog to open and add contacts
              setTimeout(() => {
                  addContactsToGroup(contacts);
              }, 1000);
          } else {
              console.error("New group button not found");
          }
      }, 500);
  } else {
      console.error("Menu icon not found");
  }
}

function addContactsToGroup(contacts) {
  contacts.forEach((contact, index) => {
      setTimeout(() => {
          // Simulate typing the contact's name/number
          const inputField = document.querySelector('input[type="text"]');
          if (inputField) {
              inputField.value = contact;
              inputField.dispatchEvent(new Event('input', { bubbles: true }));

              // Simulate selecting the first matching result
              setTimeout(() => {
                  const firstResult = document.querySelector(`span[title="${contact}"]`);
                  if (firstResult) {
                      firstResult.click();
                  } else {
                      console.error(`Contact not found: ${contact}`);
                  }
              }, 500);
          } else {
              console.error("Contact input field not found");
          }
      }, index * 1500); // Delay between each contact
  });

  // Step 4: Click the "Next" button after adding all contacts
  setTimeout(() => {
      const nextButton = document.querySelector('span[data-icon="forward-light"]');
      if (nextButton) {
          nextButton.click();

          // Step 5: Set group name and create the group
          setTimeout(() => {
              const groupNameInput = document.querySelector('div[role="textbox"]');
              if (groupNameInput) {
                  groupNameInput.textContent = "New Group Name"; // Customize group name
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
          }, 1000);
      } else {
          console.error("Next button not found");
      }
  }, contacts.length * 1500 + 1000);
}
