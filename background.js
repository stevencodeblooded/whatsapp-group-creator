// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.type === "createGroup") {
//         chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//             if (tabs.length > 0) {
//                 chrome.scripting.executeScript({
//                     target: { tabId: tabs[0].id },
//                     func: simulateUserActions,
//                     args: [message.contacts]
//                 });
//             } else {
//                 console.error("No active tab found");
//             }
//         });
//     }
// });

// function simulateUserActions(contacts) {
//     // Step 1: Open the menu by clicking the menu icon
//     const menuIcon = document.querySelector('[data-icon="menu"]');
//     if (menuIcon) {
//         menuIcon.click();
//     } else {
//         console.error("Menu icon not found");
//         return;
//     }

//     // Step 2: Wait a moment and click on the "New group" option
//     setTimeout(() => {
//         const newGroupOption = document.querySelector('div[aria-label="New group"]');
//         if (newGroupOption) {
//             newGroupOption.click();
//         } else {
//             console.error("New group option not found");
//             return;
//         }

//         // Step 3: Wait a moment for the New Group dialog to open, then add contacts
//         setTimeout(() => {
//             contacts.forEach(contact => {
//                 // Simulate typing the contact's name/number
//                 const inputField = document.querySelector('input[type="text"]');
//                 if (inputField) {
//                     inputField.value = contact;
//                     inputField.dispatchEvent(new Event('input', { bubbles: true }));

//                     // Simulate selecting the first matching result
//                     setTimeout(() => {
//                         const firstResult = document.querySelector('span[title="' + contact + '"]');
//                         if (firstResult) {
//                             firstResult.click();
//                         } else {
//                             console.error("Contact not found: " + contact);
//                         }
//                     }, 500);
//                 } else {
//                     console.error("Contact input field not found");
//                 }
//             });

//             // Step 4: After adding contacts, click the "Next" button
//             setTimeout(() => {
//                 const nextButton = document.querySelector('span[data-icon="forward-light"]');
//                 if (nextButton) {
//                     nextButton.click();

//                     // Step 5: Set group name and create the group
//                     setTimeout(() => {
//                         const groupNameInput = document.querySelector('div[role="textbox"]');
//                         if (groupNameInput) {
//                             groupNameInput.textContent = "New Group Name"; // You can customize the group name here
//                             groupNameInput.dispatchEvent(new Event('input', { bubbles: true }));

//                             const createButton = document.querySelector('span[data-icon="checkmark-light"]');
//                             if (createButton) {
//                                 createButton.click();
//                             } else {
//                                 console.error("Create button not found");
//                             }
//                         } else {
//                             console.error("Group name input not found");
//                         }
//                     }, 500);
//                 } else {
//                     console.error("Next button not found");
//                 }
//             }, 1000);

//         }, 1000);
//     }, 500);
// }

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "createGroup") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length > 0) {
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
