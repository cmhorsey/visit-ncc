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
  const itineraryListContainer = document.getElementById('itineraryListContainer')


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

    listItemContainer.addEventListener('mouseover', (e) => {
      let addressInfo = document.createElement('p')
      addressInfo.innerText = newItem.location

      listItemContainer.appendChild(addressInfo)

      listItemContainer.addEventListener('mouseout', (e) => {
        addressInfo.innerText = ''
      })
    })

    deleteBtn.addEventListener("click", (e) => {
      e.preventDefault()
      console.log(newItem.id)
      e.target.parentElement.remove()

      fetch(`http://localhost:3000/myItinerary/${newItem.id}`, {
        method: 'DELETE',
        headers:
        {
          Accept: "application/json"
        }
      })
      .then(res => res.json())
      .then(console.log)
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

  function displayDiningOptions() {
    let optionsVisible = false

    diningBtn.addEventListener('click', (e) => {
      e.preventDefault()

      if (optionsVisible) {
        diningOptions.innerHTML = ''
        optionsVisible = false
      } else {
        fetch(allRestaurantsURL)
          .then(res => res.json())
          .then(restaurants => {
            restaurants.forEach(restaurant => {
              let img = document.createElement('img')
              let li = document.createElement('li')
              let div = document.createElement('div')
              let h2 = document.createElement('h2')
              let infoBtn = document.createElement('button')

              img.src = restaurant.images[0]
              h2.innerText = restaurant.name
              h2.classList.add('title-name')
              infoBtn.classList.add('info-btn')
              infoBtn.innerText = 'More info'
              div.classList.add('divCard')

              div.appendChild(img)
              div.appendChild(h2)
              li.appendChild(div)
              li.appendChild(infoBtn)

              diningOptions.appendChild(li)

              let detailsContainer = document.createElement('div')
              optionDetails.appendChild(detailsContainer)
              detailsContainer.style.display = 'none'

              infoBtn.addEventListener('click', (e) => {
                e.preventDefault()

                optionDetails.innerHTML = '';

                if (detailsContainer.style.display === 'none') {
                  detailsContainer.innerHTML = ''

                  let optionName = document.createElement('h2')
                  let img = document.createElement('img')
                  let arrowIcon = document.createElement('img')
                  let description = document.createElement('p')
                  let itineraryBtn = document.createElement('button')

                  optionName.classList.add('option-name')
                  optionName.innerText = restaurant.name
                  img.src = restaurant.images[0]
                  arrowIcon.src = arrowImage
                  description.innerText = restaurant.description
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
                    console.log(key)
                    if(key === 39) {
                      currentImage++

                      if (currentImage >= restaurant.images.length) {
                        currentImage = 0
                      }

                      img.src = restaurant.images[currentImage]
                    }
                  })

                  itineraryBtn.addEventListener('click', (e) => {
                    e.preventDefault()

                  //CREATE POST REQUEST
                  let newItineraryItem = {
                    'name': restaurant.name,
                    'location': restaurant.location
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
                  })

                  detailsContainer.style.display = 'block'
                  } else {
                  detailsContainer.style.display = 'none'
                }

                optionDetails.appendChild(detailsContainer);
              })
            })
            optionsVisible = true
          })
      }
    })
  }

  function displayActivityOptions() {
    let optionsVisible = false

    activityBtn.addEventListener('click', (e) => {
      e.preventDefault()

      if (optionsVisible) {
        activityOptions.innerHTML = ''
        optionsVisible = false
      } else {
        fetch(allActivitiesURL)
          .then(res => res.json())
          .then(activities => {
            activities.forEach(activity => {
              let img = document.createElement('img')
              let li = document.createElement('li')
              let div = document.createElement('div')
              let h2 = document.createElement('h2')
              let infoBtn = document.createElement('button')

              img.src = activity.images[0]
              h2.innerText = activity.name
              h2.classList.add('title-name')
              infoBtn.classList.add('info-btn')
              infoBtn.innerText = 'More info'
              div.classList.add('divCard')

              div.appendChild(img)
              div.appendChild(h2)
              li.appendChild(div)
              li.appendChild(infoBtn)

              activityOptions.appendChild(li)

              let detailsContainer = document.createElement('div')
              optionDetails.appendChild(detailsContainer)
              detailsContainer.style.display = 'none'

              infoBtn.addEventListener('click', (e) => {
                e.preventDefault()

                optionDetails.innerHTML = '';

                if (detailsContainer.style.display === 'none') {
                  detailsContainer.innerHTML = ''

                  let optionName = document.createElement('h2')
                  let img = document.createElement('img')
                  let arrowIcon = document.createElement('img')
                  let description = document.createElement('p')
                  let itineraryBtn = document.createElement('button')

                  optionName.classList.add('option-name')
                  optionName.innerText = activity.name
                  img.src = activity.images[0]
                  arrowIcon.src = arrowImage
                  description.innerText = activity.description
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
                    console.log(key)
                    if(key === 39) {
                      currentImage++

                      if (currentImage >= activity.images.length) {
                        currentImage = 0
                      }
                      img.src = activity.images[currentImage]
                    }
                  })

                  itineraryBtn.addEventListener('click', (e) => {
                    e.preventDefault()

                    //CREATE POST REQUEST
                    let newItineraryItem = {
                      'name': activity.name,
                      'location': activity.location
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

                    })

                  detailsContainer.style.display = 'block'
                } else {
                  detailsContainer.style.display = 'none'
                }
                optionDetails.appendChild(detailsContainer);

              })
            })
            optionsVisible = true
          })
      }
    })
  }

  function displaySightsOptions() {
    let optionsVisible = false

    sightsBtn.addEventListener('click', (e) => {
      e.preventDefault()

      if (optionsVisible) {
        sightsOptions.innerHTML = ''
        optionsVisible = false
      } else {
        fetch(allSightsURL)
          .then(res => res.json())
          .then(sights => {
            sights.forEach(sight => {
              let img = document.createElement('img')
              let li = document.createElement('li')
              let div = document.createElement('div')
              let h2 = document.createElement('h2')
              let infoBtn = document.createElement('button')

              img.src = sight.images[0]
              h2.innerText = sight.name
              h2.classList.add('title-name')
              infoBtn.classList.add('info-btn')
              infoBtn.innerText = 'More info'
              div.classList.add('divCard')

              div.appendChild(img)
              div.appendChild(h2)
              li.appendChild(div)
              li.appendChild(infoBtn)

              sightsOptions.appendChild(li)

              let detailsContainer = document.createElement('div')
              optionDetails.appendChild(detailsContainer)
              detailsContainer.style.display = 'none'

              infoBtn.addEventListener('click', (e) => {
                e.preventDefault()

                optionDetails.innerHTML = '';

                if (detailsContainer.style.display === 'none') {
                  detailsContainer.innerHTML = ''

                  let optionName = document.createElement('h2')
                  let img = document.createElement('img')
                  let arrowIcon = document.createElement('img')
                  let description = document.createElement('p')
                  let itineraryBtn = document.createElement('button')

                  optionName.classList.add('option-name')
                  optionName.innerText = sight.name
                  img.src = sight.images[0]
                  arrowIcon.src = arrowImage
                  description.innerText = sight.description
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
                    console.log(key)
                    if(key === 39) {
                      currentImage++

                      if (currentImage >= sight.images.length) {
                        currentImage = 0
                      }
                      img.src = sight.images[currentImage]
                    }
                  })

                  itineraryBtn.addEventListener('click', (e) => {
                    e.preventDefault()
                    //CREATE POST REQUEST
                    let newItineraryItem = {
                      'name': sight.name,
                      'location': sight.location
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
                  })

                  detailsContainer.style.display = 'block'
                } else {
                  detailsContainer.style.display = 'none'
                }

                optionDetails.appendChild(detailsContainer);
              })
            })
            optionsVisible = true
          })
      }
    })
  }
  displayMyItinerary()
  displaySightsOptions()
  displayDiningOptions()
  displayActivityOptions()
})
