let myLeads = []
const inputButton = document.getElementById('input-btn')
const inputEl = document.getElementById('input-el')
const ulElement = document.getElementById('ul-el')
const deleteButton = document.getElementById('delete-btn')
const tabButton = document.getElementById('tab-btn')

//myLeads = JSON.parse(myLeads)   //Turn the myLeads string into an array
//myLeads = JSON.stringify(myLeads)   //Turn the myLeads array into a string

//the code below parses items stored in local storage
//and assigns them to myLeads array
const leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'))
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    renderOnTheScreen(myLeads)
}

tabButton.addEventListener('click', function () {
    //hey chrome, I want to query some of your tabs
    //the tab has to be active and in the currently active window
    //this function will be triggered when chrome found tab we're looking for
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        myLeads.push(tabs[0].url)   //tabs[0].url - this way you get a hold of url
        localStorage.setItem('myLeads', JSON.stringify(myLeads))
        renderOnTheScreen(myLeads)
    })
})

//this function renders existing leads to the screen
function renderOnTheScreen(leads) {
    let listItems = ''
    for (let i = 0; i < leads.length; i++) {
        listItems += `
        <li>
            <a href='${leads[i]}' target='_blank'>
                ${leads[i]}
            </a>
        </li>
        `
    }
    //DOM manipulation comes at a cost!!
    //this is why it's recommended to manipulate it
    //outside the loop
    ulElement.innerHTML = listItems
}

//the code below clears removes saved leads
deleteButton.addEventListener("dblclick", function () {
    localStorage.clear()
    myLeads = []
    renderOnTheScreen(myLeads)
})

//the code below adds leads to local storage
inputButton.addEventListener("click", function () {
    myLeads.push(inputEl.value)
    inputEl.value = ''
    localStorage.setItem('myLeads', JSON.stringify(myLeads))
    renderOnTheScreen(myLeads)
})




