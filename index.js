document.addEventListener('DOMContentLoaded', function () {
  const allRestaurantsURL = 'http://localhost:3000/restaurants'
  const allSightsURL = 'http://localhost:3000/sights'
  const allActivitiesURL = 'http://localhost:3000/activities'
  const myItineraryURL = 'http://localhost:3000/myItinerary'
  const arrowImage = 'https://cdn-icons-png.flaticon.com/512/54/54382.png'

  const diningOptions = document.getElementById('diningOptions')
  const activityOptions = document.getElementById('activityOptions')
  const sightsOptions = document.getElementById('sightsOptions')
  const diningBtn = document.getElementById('diningBtn')
  const activityBtn = document.getElementById('activityBtn')
  const sightsBtn = document.getElementById('sightsBtn')
  const optionDetails = document.getElementById('optionDetails')
  const itineraryList = document.getElementById('itineraryList')
  const detailsContainer = document.createElement('div')
  const tempP = document.getElementById('temp')
  const rainP = document.getElementById('rain')


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

  function handleInfoBtnClick(option, infoBtn){
    infoBtn.addEventListener('click', (e) => {
      e.preventDefault()
      optionDetails.innerHTML = ''

      handleInfoBtnConditional(option)
    })
  }

  function handleInfoBtnConditional(option) {
      if (detailsContainer.style.display === 'none') {
        displayDetailsCard(option, detailsContainer)
      } else {
        detailsContainer.style.display = 'none'
      }
      optionDetails.appendChild(detailsContainer)
  }

  function displayOptions(option, container){
    let infoBtn  = createDisplayOption(option, container)

    optionDetails.appendChild(detailsContainer)
    detailsContainer.style.display = 'none'
    handleInfoBtnClick(option, infoBtn, detailsContainer)
  }

  function createDisplayOption(option, container){
    const displayImg = document.createElement('img')
    const displayLi = document.createElement('li')
    const displayDiv = document.createElement('div')
    const displayName = document.createElement('h2')
    const infoBtn = document.createElement('button')

    displayImg.src = option.images[0]
    displayName.innerText = option.name
    displayName.classList.add('title-name')
    infoBtn.classList.add('info-btn')
    infoBtn.innerText = 'More info'
    displayDiv.classList.add('divCard')

    displayDiv.appendChild(displayImg)
    displayDiv.appendChild(displayName)
    displayLi.appendChild(displayDiv)
    displayLi.appendChild(infoBtn)

    container.appendChild(displayLi)
    return infoBtn
  }

  function displayDetailsCard(option, detailsContainer) {
    detailsContainer.innerHTML = ''

    const optionName = document.createElement('h2')
    const img = document.createElement('img')
    const arrowIcon = document.createElement('img')
    const description = document.createElement('p')
    const itineraryBtn = document.createElement('button')

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
    detailsContainer.style.display = 'block'

    handleImageKeydownEvent(option, img)
    handleItineraryBtn(option, itineraryBtn)
  }

  function handleImageKeydownEvent(option, img) {
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
  }

  function createItineraryCard(newItem) {
    const eventTitle = document.createElement('h3')
    const listItemContainer = document.createElement('li')
    const deleteBtn = document.createElement('button')

    deleteBtn.innerText = 'Remove'
    listItemContainer.classList.add('itineraryListItem')
    eventTitle.innerText = newItem.name
    deleteBtn.classList.add('info-btn')

    listItemContainer.appendChild(eventTitle)
    listItemContainer.appendChild(deleteBtn)
    itineraryList.appendChild(listItemContainer)

    handleMouseoverEvent(listItemContainer, newItem)
    handleDelete(newItem, deleteBtn)
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
    listItemContainer.addEventListener('mouseover', () => {
      let addressInfo = document.createElement('p')
      addressInfo.innerText = newItem.location
      listItemContainer.appendChild(addressInfo)

      listItemContainer.addEventListener('mouseout', () => {
        addressInfo.innerText = ''
      })
    })
  }

  function handleItineraryBtn(option, itineraryBtn) {
    itineraryBtn.addEventListener('click', (e) => {
      e.preventDefault()

      const newItineraryItem = {
        'name': option.name,
        'location': option.location
      }

      postItineraryItem(newItineraryItem)
    })
  }

  function postItineraryItem(newItineraryItem){
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

  function displayMyItinerary() {
    fetch(myItineraryURL)
    .then(res => res.json())
    .then(items => items.forEach(createItineraryCard))
  }

  //Research Weather API
  //Make fetch request
  //Get some info displaying
  //Temperature
  //https://api.open-meteo.com/v1/forecast?latitude=39.6621&longitude=-75.5663&current=temperature_2m
  //Cloud Cover
  //https://api.open-meteo.com/v1/forecast?latitude=39.6621&longitude=-75.5663&current=cloud_cover
  //

  function fetchTemp() {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=39.6621&longitude=-75.5663&current=temperature_2m')
    .then(res => res.json())
    .then(data =>{
      let currentTemp = data.current.temperature_2m
      currentTemp = celsiusToFahrenheit(currentTemp)

      if(currentTemp > 75) {
        tempP.innerText = `Current Temperature is ${currentTemp} °F, that's pretty toasty`
      } else if (currentTemp < 75 && currentTemp > 65) {
        tempP.innerText = `Current Temperature is ${currentTemp} °F, you're gonna wanna be outside`
      } else if (currentTemp < 65 && currentTemp > 55) {
        tempP.innerText = `Current Temperature is ${currentTemp} °F, aka sweater weather!`
      }
    })
  }

  function celsiusToFahrenheit(celsius) {
    return Math.floor((celsius * 9/5) + 32)
  }

function fetchRain() {
  fetch('https://api.open-meteo.com/v1/forecast?latitude=39.6621&longitude=-75.5663&current=rain')
  .then(res => res.json())
  .then(data => {
    let rainStatus = data.current.rain

    if(rainStatus === 1){
      rainP.innerText = 'It is raining'
    } else rainP.innerText = 'It is not raining'
  })
}

  fetchRain()
  fetchTemp()
  displayFetchOptions(allRestaurantsURL, diningOptions, diningBtn)
  displayFetchOptions(allActivitiesURL, activityOptions, activityBtn)
  displayFetchOptions(allSightsURL, sightsOptions, sightsBtn)
  displayMyItinerary()
})
