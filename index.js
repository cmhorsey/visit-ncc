document.addEventListener('DOMContentLoaded', function () {
  const allRestaurantsURL = 'http://localhost:3000/restaurants'
  const allSitesURL = 'http://localhost:3000/sites'
  const allActivitiesURL = 'http://localhost:3000/activities'

  const diningOptions = document.getElementById('diningOptions')
  const activityOptions = document.getElementById('activityOptions')
  const sightsOptions = document.getElementById('sightsOptions')
  const diningBtn = document.getElementById('diningBtn')
  const activityBtn = document.getElementById('activityBtn')
  const sightsBtn = document.getElementById('sightsBtn')



    function displayDiningOptions() {
      diningBtn.addEventListener('click', (e) => {
        e.preventDefault()
        fetch(allRestaurantsURL)
        .then(res => res.json())
        .then(restaurants => {
          restaurants.forEach(restaurant => {
            console.log(restaurant.name)

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
        })
      })
    }

    function displayActivityOptions() {
      activityBtn.addEventListener('click', (e) => {
        e.preventDefault()
        fetch(allActivitiesURL)
        .then(res => res.json())
        .then(activities => {
          activities.forEach(activity => {
            console.log(activity.name)

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
        })
      })
    }

    function displaySightsOptions() {
      sightsBtn.addEventListener('click', (e) => {
        e.preventDefault()
        fetch(allSitesURL)
        .then(res => res.json())
        .then(sights => {
          sights.forEach(sight => {
            console.log(sight.name)

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
        })
      })
    }

    //Toggle display
    //

    // fetch(allRestaurantsURL)
    // .then(res => res.json())
    // .then(restaurants => {
    //   restaurants.forEach(restaurant => {
    //     console.log(restaurant.name)

    //     let img = document.createElement('img')
    //     let li = document.createElement('li')
    //     let div = document.createElement('div')
    //     let h2 = document.createElement('h2')

    //     img.src = restaurant.images[0]
    //     h2.innerText = restaurant.name

    //     div.appendChild(img)
    //     div.appendChild(h2)
    //     li.appendChild(div)
    //     diningOptions.appendChild(li)
    //   })
    // })

    fetch(allSitesURL)
    .then(res => res.json())
    .then(console.log)

    fetch(allActivitiesURL)
    .then(res => res.json())
    .then(console.log)


    //Create list function
    //for each element
    //create a card list item that displays img1 and name
    //append card to corresponding container

displaySightsOptions()
displayDiningOptions()
displayActivityOptions()
})
