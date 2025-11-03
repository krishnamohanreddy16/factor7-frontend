import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function RestaurantCard({ item }) {
  const navigate = useNavigate()
  return (
    <div className='bg-white rounded-xl shadow p-4 cursor-pointer hover:shadow-lg transition' onClick={() => navigate(`/detail/${item.id}`)}>
      <img src={item.imageURL} alt={item.name} className='w-full h-40 object-cover rounded-md mb-3' />
      <h3 className='text-lg font-semibold'>{item.name}</h3>
      <p className='text-sm text-slate-500'>{item.address}</p>
      <div className='mt-2 text-sm'>Rating: <span className='font-medium'>{item.rating}</span></div>
    </div>
  )
}
