console.log("Content script running");

function simulateUserActions(contacts) {
    console.log("Simulating user actions with contacts:", contacts);

    const menuIcon = document.querySelector('[data-icon="menu"]');
    if (menuIcon) {
        menuIcon.click();
        console.log("Menu icon clicked");
    } else {
        console.error("Menu icon not found");
        return;
    }

    setTimeout(() => {
        const newGroupOption = document.querySelector('div[aria-label="New group"]');
        if (newGroupOption) {
            newGroupOption.click();
            console.log("New group option clicked");
        } else {
            console.error("New group option not found");
            return;
        }

        setTimeout(() => {
            contacts.forEach((contact, index) => {
                setTimeout(() => {
                    const inputField = document.querySelector('input[type="text"]');
                    if (inputField) {
                        inputField.value = contact;
                        inputField.dispatchEvent(new Event('input', { bubbles: true }));
                        console.log(`Input field updated with contact: ${contact}`);

                        setTimeout(() => {
                          const button = document.querySelector('div[role="button"] .x1n2onr6 img');

                          if (button) {
                              button.scrollIntoView({ behavior: 'smooth', block: 'center' });
                              button.parentElement.click();
                              console.log("Button clicked successfully");
                          } else {
                              console.error("Button not found");
                          }
                        }, 1000);
                    } else {
                        console.error("Contact input field not found");
                    }
                }, index * 2000);
            });

            setTimeout(() => {
                const nextButton = document.querySelector('div[role="button"][aria-label="Next"]');
                if (nextButton) {
                  nextButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  nextButton.click();
                  console.log("Next button clicked successfully");

                    setTimeout(() => {
                        const groupNameInput = document.querySelector('div[role="textbox"]');
                        if (groupNameInput) {
                            groupNameInput.textContent = "Testing Group";
                            groupNameInput.dispatchEvent(new Event('input', { bubbles: true }));
                            console.log("Group name input updated");

                            const createGroupButton = document.querySelector('div[role="button"][aria-label="Create group"]');
                            if (createGroupButton) {
                                createGroupButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                createGroupButton.click();
                                console.log("Create group button clicked successfully");
                            } else {
                                console.error("Create group button not found");
                            }
                        } else {
                            console.error("Group name input not found");
                        }
                    }, 500);
                } else {
                    console.error("Next button not found");
                }
            }, contacts.length * 2000 + 1000);
        }, 1000);
    }, 500);
}
