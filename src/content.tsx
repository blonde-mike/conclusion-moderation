import React from 'react'
import ReactDOM from 'react-dom'
import ModerateButton from './components/ModerateButton/ModerateButton'

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.personPage === 'loaded') {
        // need to add listener for element to load using mutationObserver
        let personPage = document.querySelector('fs-person-page');
        let details = personPage?.shadowRoot?.querySelector('fs-tree-person-details');
        let vitals = details?.shadowRoot?.querySelector('fs-tree-person-vitals');
        let card = vitals?.shadowRoot?.querySelector('fs-tree-collapsable-card');
        let conclusions = card?.querySelectorAll('fs-tree-conclusion') as NodeListOf<Element>;

        for (let i = 0; i < conclusions.length; i++) {
            let conShadow = conclusions.item(i).shadowRoot;
            let conHeader = conShadow?.querySelector('div.conclusion-header');

            // insert dot separator
            let secondDot = document.createElement('span');
            secondDot.innerText = ' • ';
            secondDot.setAttribute('class', 'edit-dot');
            conHeader?.appendChild(secondDot);

            // insert Moderate button
            let moderateButtonDiv = document.createElement('span');
            moderateButtonDiv.id = 'moderate-wrapper';
            conHeader?.appendChild(moderateButtonDiv);
            ReactDOM.render(<ModerateButton/>, moderateButtonDiv);
        }
    }
})

export {}
