
chrome.webNavigation.onCompleted.addListener((details) => {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        chrome.tabs.sendMessage(tabs[0].id as number, {personPage: 'loaded'}, (response) => {});
    })
},{
    url: [
        {hostSuffix:'familysearch.org', pathContains:'tree/person/details'}
    ]
})

export {}
