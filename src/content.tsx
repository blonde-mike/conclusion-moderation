import React from 'react'
import ReactDOM from 'react-dom'
import ModerateButton from './components/ModerateButton/ModerateButton'
import ProposeChangeButton from './components/ProposeChangeButton/ProposeChangeButton'
import ModeratedBy from './components/ModeratedBy/ModeratedBy'
import { getModerationByPerson } from './moderator.service';
import { findLocalItems } from './helpers';

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.personPage === 'loaded') {
        // need to add listener for element to load using mutationObserver
        let personPage = document.querySelector('fs-person-page');
        let details = personPage?.shadowRoot?.querySelector('fs-tree-person-details');
        let vitals = details?.shadowRoot?.querySelector('fs-tree-person-vitals');
        let card = vitals?.shadowRoot?.querySelector('fs-tree-collapsable-card');
        let conclusions = card?.querySelectorAll('fs-tree-conclusion') as NodeListOf<Element>;

        const userId = findLocalItems(/beta-v2-user/)[0].val.user.cisId;
        const personId = window.location.href.split('/')[6];
        let moderation: any = {};
        await getModerationByPerson(personId)
            .then((results) => {
                moderation = results;
            })
            console.log(moderation);
        // In order for this logic to work, sign in to FamilySearch, then go to Family Tree > Overview > Recents > Mary Haws
        for (let i = 0; i < conclusions.length; i++) {
            let conShadow = conclusions.item(i).shadowRoot;
            let conHeader = conShadow?.querySelector('div.conclusion-header');
            let eventType = conHeader?.querySelector('h5')?.innerText.toLocaleLowerCase() as string;
            let secondDot = document.createElement('span');
            secondDot.innerText = ' • ';
            secondDot.setAttribute('class', 'edit-dot');

            let moderator = '';
            let isOwn = false;
            if (moderation[eventType].moderator !== null){
                moderator = moderation[eventType].moderator.contactName;
                if(moderation[eventType].moderator.userId === userId) {
                    isOwn = true;
                }
            }
            // If the current user is a moderator...
            if (userId === 'cis.user.M7X1-R1ZT' || userId === 'cis.user.MMM9-K6JW') {
                // insert dot separator
                conHeader?.appendChild(secondDot);

                // insert Moderate button
                let moderateButtonDiv = document.createElement('span');
                moderateButtonDiv.id = 'moderate-wrapper';
                conHeader?.appendChild(moderateButtonDiv);
                ReactDOM.render(<ModerateButton cisId={userId} conclusionType={eventType} personId={personId} moderator={moderator} isOwn={isOwn}/>, moderateButtonDiv);
            } else if (moderator && !isOwn) {
                // remove edit button
                conHeader?.removeChild(conHeader?.querySelector("#editButton") as Element);

                // insert ProposeChangeButton
                let proposeChangeButton = document.createElement('span');
                proposeChangeButton.id = 'propose-wrapper';
                conHeader?.appendChild(proposeChangeButton);
                ReactDOM.render(<ProposeChangeButton/>, proposeChangeButton);

                // insert dot separator
                conHeader?.appendChild(secondDot);

                // insert ModeratedBy
                let moderatedBy = document.createElement('span');
                moderatedBy.id = 'moderated-by-wrapper';
                conHeader?.appendChild(moderatedBy);
                ReactDOM.render(<ModeratedBy moderatorName={moderator}/>, moderatedBy);
            }
        }
    }
})

export {}
