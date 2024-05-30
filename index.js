document.addEventListener('DOMContentLoaded', function () {
  const allRestaurantsURL = 'http://localhost:3000/restaurants'
  const allSightsURL = 'http://localhost:3000/sights'
  const allActivitiesURL = 'http://localhost:3000/activities'
  const myItineraryURL = 'http://localhost:3000/myItinerary'
  const diningOptions = document.getElementById('diningOptions')
  const activityOptions = document.getElementById('activityOptions')
  const sightsOptions = document.getElementById('sightsOptions')
  const diningBtn = document.getElementById('diningBtn')
  const activityBtn = document.getElementById('activityBtn')
  const sightsBtn = document.getElementById('sightsBtn')
  const optionDetails = document.getElementById('optionDetails')
  const arrowImage = 'https://cdn-icons-png.flaticon.com/512/54/54382.png'
  const itineraryList = document.getElementById('itineraryList')

  function createItineraryCard(newItem) {
    let eventTitle = document.createElement('h3')
    let listItemContainer = document.createElement('li')
    let deleteBtn = document.createElement('button')

    deleteBtn.innerText = 'Remove'
    listItemContainer.classList.add('itineraryListItem')
    eventTitle.innerText = newItem.name
    deleteBtn.classList.add('info-btn')


    listItemContainer.appendChild(eventTitle)
    listItemContainer.appendChild(deleteBtn)
    itineraryList.appendChild(listItemContainer)

    handleMouseoverEvent(listItemContainer, newItem)
    handleDelete(newItem, deleteBtn)

    // deleteBtn.addEventListener("click", (e) => {
    //   e.preventDefault()
    //   e.target.parentElement.remove()

    //   fetch(`http://localhost:3000/myItinerary/${newItem.id}`, {
    //     method: 'DELETE',
    //     headers:
    //     {
    //       Accept: "application/json"
    //     }
    //   })
    // })
  }

  function handleDelete(newItem, deleteBtn) {
    deleteBtn.addEventListener("click", (e) => {
      e.preventDefault()
      e.target.parentElement.remove()

      fetch(`http://localhost:3000/myItinerary/${newItem.id}`, {
        method: 'DELETE',
        headers:
        {
          Accept: "application/json"
        }
      })
    })
  }

  function handleMouseoverEvent(listItemContainer, newItem) {
    listItemContainer.addEventListener('mouseover', (e) => {
      let addressInfo = document.createElement('p')
      addressInfo.innerText = newItem.location

      listItemContainer.appendChild(addressInfo)

      listItemContainer.addEventListener('mouseout', (e) => {
        addressInfo.innerText = ''
      })
    })
  }

  function displayMyItinerary() {
    fetch(myItineraryURL)
    .then(res => res.json())
    .then(items => {
      items.forEach(item => {
        createItineraryCard(item)
      })
    })
  }

function createDisplayOption(option, container){
  let img = document.createElement('img')
  let li = document.createElement('li')
  let div = document.createElement('div')
  let h2 = document.createElement('h2')
  let infoBtn = document.createElement('button')

  img.src = option.images[0]
  h2.innerText = option.name
  h2.classList.add('title-name')
  infoBtn.classList.add('info-btn')
  infoBtn.innerText = 'More info'
  div.classList.add('divCard')

  div.appendChild(img)
  div.appendChild(h2)
  li.appendChild(div)
  li.appendChild(infoBtn)

  container.appendChild(li)
  return infoBtn
}

function displayOptions(option, container){
  let infoBtn  = createDisplayOption(option, container)

  let detailsContainer = document.createElement('div')
  optionDetails.appendChild(detailsContainer)
  detailsContainer.style.display = 'none'

  infoBtn.addEventListener('click', (e) => {
    e.preventDefault()
    optionDetails.innerHTML = ''

    if (detailsContainer.style.display === 'none') {
      displayDetailsCard(option, detailsContainer)
      } else {
      detailsContainer.style.display = 'none'
    }
    optionDetails.appendChild(detailsContainer);
  })
}

function displayDetailsCard(option, detailsContainer) {
  detailsContainer.innerHTML = ''

  let optionName = document.createElement('h2')
  let img = document.createElement('img')
  let arrowIcon = document.createElement('img')
  let description = document.createElement('p')
  let itineraryBtn = document.createElement('button')

  optionName.classList.add('option-name')
  optionName.innerText = option.name
  img.src = option.images[0]
  arrowIcon.src = arrowImage
  description.innerText = option.description
  arrowIcon.classList.add('arrowIcon')
  itineraryBtn.innerText = 'Add to itinerary'
  itineraryBtn.classList.add('info-btn')

  detailsContainer.appendChild(optionName)
  detailsContainer.appendChild(img)
  detailsContainer.appendChild(arrowIcon)
  detailsContainer.appendChild(description)
  detailsContainer.appendChild(itineraryBtn)

  let currentImage = 0
  window.addEventListener('keydown', (e) => {
    let key = e.keyCode
    if(key === 39) {
      currentImage++

      if (currentImage >= option.images.length) {
        currentImage = 0
      }

      img.src = option.images[currentImage]
    }
  })

  itineraryBtn.addEventListener('click', (e) => {
    e.preventDefault()
    handlePostRequest(option)
  })

  detailsContainer.style.display = 'block'
}

function handlePostRequest(option) {
  let newItineraryItem = {
    'name': option.name,
    'location': option.location
  }

  fetch('http://localhost:3000/myItinerary', {
    method: 'POST',
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(newItineraryItem)
  })
  .then(res => res.json())
  .then(newItem => createItineraryCard(newItem))
}


  function displayFetchOptions(url, container, button){
    let optionsVisible = false
    button.addEventListener('click', (e) => {
      e.preventDefault()

      if (optionsVisible) {
        container.innerHTML = ''
        optionsVisible = false
      } else {
        fetch(url)
          .then(res => res.json())
          .then(options => {
            options.forEach(option => {
              displayOptions(option, container)
            })
            optionsVisible = true
          })
      }
    })
  }


  displayFetchOptions(allRestaurantsURL, diningOptions, diningBtn)
  displayFetchOptions(allActivitiesURL, activityOptions, activityBtn)
  displayFetchOptions(allSightsURL, sightsOptions, sightsBtn)
  displayMyItinerary()
})
