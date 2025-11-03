import { mockRestaurants } from './mockData'

export const fetchRestaurants = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockRestaurants), 500)
  })
}

export const getRestaurantById = (id) => {
  return fetchRestaurants().then(list => list.find(r => r.id === id))
}
