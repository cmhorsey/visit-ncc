document.addEventListener('DOMContentLoaded', function () {
  const allRestaurantsURL = 'http://localhost:3000/restaurants'
  const allSightsURL = 'http://localhost:3000/sights'
  const allActivitiesURL = 'http://localhost:3000/activities'
  const diningOptions = document.getElementById('diningOptions')
  const activityOptions = document.getElementById('activityOptions')
  const sightsOptions = document.getElementById('sightsOptions')
  const diningBtn = document.getElementById('diningBtn')
  const activityBtn = document.getElementById('activityBtn')
  const sightsBtn = document.getElementById('sightsBtn')
  const optionDetails = document.getElementById('optionDetails')

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

                if (detailsContainer.style.display === 'none') {
                  detailsContainer.innerHTML = ''

                  let optionName = document.createElement('h2')
                  let img = document.createElement('img')
                  // let img3 = document.createElement('img')
                  let description = document.createElement('p')

                  optionName.classList.add('option-name')
                  optionName.innerText = restaurant.name
                  img.src = restaurant.images[0]
                  // img3.src = restaurant.images[2]
                  description.innerText = restaurant.description

                  detailsContainer.appendChild(optionName)
                  detailsContainer.appendChild(img)
                  // detailsContainer.appendChild(img3)
                  detailsContainer.appendChild(description)

                  //Change img to img1
                  //add event listener
                  //On keydown
                  //change img src to img.images[0++]

                  let currentImage = 0
                  window.addEventListener('keydown', (e) => {
                    let key = e.keyCode
                    console.log(key)
                    if(key === 39) {
                      currentImage++

                      if (currentImage >= restaurant.images.length) {
                        currentImage = 0
                      }

                      img.src =restaurant.images[currentImage]
                    }
                  })

                  detailsContainer.style.display = 'block'
                  } else {
                  detailsContainer.style.display = 'none'
                }
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

                if (detailsContainer.style.display === 'none') {
                  detailsContainer.innerHTML = ''

                  let optionName = document.createElement('h2')
                  let img2 = document.createElement('img')
                  let img3 = document.createElement('img')
                  let description = document.createElement('p')

                  optionName.classList.add('option-name')
                  optionName.innerText = activity.name
                  img2.src = activity.images[1]
                  img3.src = activity.images[2]
                  description.innerText = activity.description

                  detailsContainer.appendChild(optionName)
                  detailsContainer.appendChild(img2)
                  detailsContainer.appendChild(img3)
                  detailsContainer.appendChild(description)

                  detailsContainer.style.display = 'block'
                } else {
                  detailsContainer.style.display = 'none'
                }
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

                if (detailsContainer.style.display === 'none') {
                  detailsContainer.innerHTML = ''

                  let optionName = document.createElement('h2')
                  let img2 = document.createElement('img')
                  let img3 = document.createElement('img')
                  let description = document.createElement('p')

                  optionName.classList.add('option-name')
                  optionName.innerText = sight.name
                  img2.src = sight.images[1]
                  img3.src = sight.images[2]
                  description.innerText = sight.description

                  detailsContainer.appendChild(optionName)
                  detailsContainer.appendChild(img2)
                  detailsContainer.appendChild(img3)
                  detailsContainer.appendChild(description)

                  detailsContainer.style.display = 'block'
                } else {
                  detailsContainer.style.display = 'none'
                }
              })
            })
            optionsVisible = true
          })
      }
    })
  }
  displaySightsOptions()
  displayDiningOptions()
  displayActivityOptions()
})
