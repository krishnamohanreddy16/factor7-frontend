import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [mobile, setMobile] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const cleaned = mobile.replace(/\D/g, '')
    if (cleaned.length !== 10) {
      alert('Enter a valid 10-digit mobile number')
      return
    }
    // store temporarily
    localStorage.setItem('fastor_mobile', cleaned)
    navigate('/otp')
  }

  return (
    <div className='min-h-screen flex items-center justify-center p-4'>
      <div className='w-full max-w-md bg-white p-6 rounded-xl shadow'>
        <h2 className='text-2xl font-bold mb-4'>Welcome to Fastor</h2>
        <form onSubmit={handleSubmit}>
          <label className='block text-sm mb-2'>Mobile Number</label>
          <input value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder='Enter 10 digit mobile' className='w-full border rounded p-2 mb-4' />
          <button className='w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600'>Send OTP</button>
        </form>
      </div>
    </div>
  )
}
