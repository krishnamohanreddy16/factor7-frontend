import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CORRECT_OTP = '123456'

export default function Otp() {
  const [otp, setOtp] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (otp === CORRECT_OTP) {
      localStorage.setItem('isAuthenticated', 'true')
      navigate('/list')
    } else {
      alert('Invalid OTP. Try 123456')
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center p-4'>
      <div className='w-full max-w-md bg-white p-6 rounded-xl shadow'>
        <h2 className='text-2xl font-bold mb-4'>Enter OTP</h2>
        <form onSubmit={handleSubmit}>
          <label className='block text-sm mb-2'>OTP</label>
          <input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder='6-digit OTP' className='w-full border rounded p-2 mb-4' />
          <button className='w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600'>Verify</button>
        </form>
      </div>
    </div>
  )
}
