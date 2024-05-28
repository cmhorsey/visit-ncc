console.log('hello world')

document.addEventListener('DOMContentLoaded', function () {
  const allRestaurantsURL = 'http://localhost:3000/restaurants'
  const allSitesURL = 'http://localhost:3000/sites'
  const allActivitiesURL = 'http://localhost:3000/activities'



    fetch(allRestaurantsURL)
    .then(res => res.json())
    .then(console.log)

    fetch(allSitesURL)
    .then(res => res.json())
    .then(console.log)

    fetch(allActivitiesURL)
    .then(res => res.json())
    .then(console.log)


})
