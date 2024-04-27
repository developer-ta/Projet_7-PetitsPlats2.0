export const appareilsDisplay = (data) => {
  // Dom
  const $appareils_options = document.querySelector('#appareils>.options')


  // display
  $appareils_options.innerHTML = ''
  const $ul = document.createElement('ul')
  const applianceList = []
  data.forEach((el) => {
    const $li = document.createElement('li')
    $li.className = 'li-item appareil'
    $li.id = el.id
    $li.innerHTML += (`${(el.appliance[0].toUpperCase() + el.appliance.slice(1).toLowerCase())}`)
    applianceList.push($li)
  }

  )
  const textContents = applianceList.map(el => el.textContent.toLowerCase())
  const uniqueElements = applianceList.filter((el, i) => i == textContents.indexOf(el.textContent.toLowerCase()))
  uniqueElements.sort((a, b) => a.textContent.localeCompare(b.textContent))
  uniqueElements.forEach(li => $ul.appendChild(li))

  $appareils_options.appendChild($ul)
}
