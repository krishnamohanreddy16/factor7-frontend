import React, { useEffect, useState } from 'react'
import { fetchRestaurants } from '../api/apiService'
import RestaurantCard from '../components/RestaurantCard'

export default function RestaurantList() {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    fetchRestaurants().then(data => {
      if (mounted) setList(data)
    }).catch(() => {
      if (mounted) setList([])
    }).finally(() => mounted && setLoading(false))
    return () => mounted = false
  }, [])

  return (
    <div className='min-h-screen p-6'>
      <header className='max-w-5xl mx-auto mb-6 flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Nearby Restaurants</h1>
        <div>
          <button onClick={() => { localStorage.removeItem('isAuthenticated'); window.location.href = '/login' }} className='text-sm text-slate-600 underline'>Logout</button>
        </div>
      </header>

      <main className='max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {loading ? <div>Loading...</div> :
          list.map(item => <RestaurantCard key={item.id} item={item} />)
        }
      </main>
    </div>
  )
}
