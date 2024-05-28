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



    function displayDiningOptions() {
      let optionsVisible = false

      diningBtn.addEventListener('click', (e) => {
        e.preventDefault()

      if(optionsVisible) {
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

              img.src = restaurant.images[0]
              h2.innerText = restaurant.name

              div.appendChild(img)
              div.appendChild(h2)
              li.appendChild(div)
              diningOptions.appendChild(li)
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

      if(optionsVisible) {
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

              img.src = activity.images[0]
              h2.innerText = activity.name

              div.appendChild(img)
              div.appendChild(h2)
              li.appendChild(div)
              activityOptions.appendChild(li)
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

      if(optionsVisible) {
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

              img.src = sight.images[0]
              h2.innerText = sight.name

              div.appendChild(img)
              div.appendChild(h2)
              li.appendChild(div)
              sightsOptions.appendChild(li)
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
