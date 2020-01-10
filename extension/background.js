const sites = {
  epicurious: true,
  foodnetwork: true,
  bonappetit: true,
  chowhound: true,
  simplyrecipes: true,
  allrecipes: true,
  nytimes: true
}

chrome.tabs.onUpdated.addListener(toggleIcon)
chrome.tabs.onActivated.addListener(toggleIcon)

function toggleIcon() {
  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    let url = tabs[0].url
    let urlBase = ''
    const urlTail = url.split('www.')[1]
    if (urlTail) urlBase = urlTail.split('.com')[0]
    let isNYT = url.indexOf('nytimes')
    if (isNYT !== -1) urlBase = 'nytimes'
    if (url && sites[urlBase]) {
      chrome.browserAction.setIcon({path: 'enabled128.png'})
    } else {
      chrome.browserAction.setIcon({path: 'disabled128.png'})
    }
  })
}
