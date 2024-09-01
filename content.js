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
                            const contactButton = Array.from(document.querySelectorAll('div[role="button"]')).find(button => {
                                const span = button.querySelector('span[dir="auto"]');
                                return span && span.textContent.trim() === contact;
                            });

                            if (contactButton) {
                                contactButton.scrollIntoView();
                                contactButton.click();
                                console.log(`Clicked contact: ${contact}`);
                            } else {
                                console.error(`Contact button not found: ${contact}`);
                            }
                        }, 500);
                    } else {
                        console.error("Contact input field not found");
                    }
                }, index * 2000);
            });

            setTimeout(() => {
                const nextButton = document.querySelector('span[data-icon="forward-light"]');
                if (nextButton) {
                    nextButton.click();
                    console.log("Next button clicked");

                    setTimeout(() => {
                        const groupNameInput = document.querySelector('div[role="textbox"]');
                        if (groupNameInput) {
                            groupNameInput.textContent = "New Group Name";
                            groupNameInput.dispatchEvent(new Event('input', { bubbles: true }));
                            console.log("Group name input updated");

                            const createButton = document.querySelector('span[data-icon="checkmark-light"]');
                            if (createButton) {
                                createButton.click();
                                console.log("Create button clicked");
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
            }, contacts.length * 2000 + 1000);
        }, 1000);
    }, 500);
}
