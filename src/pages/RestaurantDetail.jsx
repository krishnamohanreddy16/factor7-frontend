import React, { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getRestaurantById } from '../api/apiService'

export default function RestaurantDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [restaurant, setRestaurant] = useState(null)
  const [loading, setLoading] = useState(true)
  const canvasRef = useRef(null)

  // logo position state for bonus feature
  const [logoPos, setLogoPos] = useState({ x: 0.5, y: 0.5 }) // normalized (0..1)
  const dragging = useRef(false)

  useEffect(() => {
    getRestaurantById(id).then(r => setRestaurant(r)).finally(() => setLoading(false))
  }, [id])

  useEffect(() => {
    drawCanvas()
    // redraw when logoPos changes
  }, [restaurant, logoPos])

  const drawCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas || !restaurant) return
    const ctx = canvas.getContext('2d')
    const width = 800
    const height = 600
    canvas.width = width
    canvas.height = height
    // clear
    ctx.fillStyle = '#fff'
    ctx.fillRect(0,0,width,height)

    const baseImg = new Image()
    baseImg.crossOrigin = 'anonymous'
    baseImg.src = restaurant.imageURL

    const logo = new Image()
    logo.src = '/fastor-logo.svg'

    baseImg.onload = () => {
      // fit base image
      ctx.drawImage(baseImg, 0, 0, width, height)
      logo.onload = () => {
        const logoSize = Math.min(width, height) * 0.2
        const x = Math.round((width - logoSize) * logoPos.x)
        const y = Math.round((height - logoSize) * logoPos.y)
        ctx.drawImage(logo, x, y, logoSize, logoSize)
      }
    }
  }

  // Mouse/touch handlers for dragging logo
  const toCanvasCoords = (e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    const x = (clientX - rect.left) / rect.width
    const y = (clientY - rect.top) / rect.height
    return { x: Math.min(Math.max(x, 0), 1), y: Math.min(Math.max(y, 0), 1) }
  }

  const handleDown = (e) => {
    dragging.current = true
  }
  const handleMove = (e) => {
    if (!dragging.current) return
    const pos = toCanvasCoords(e)
    setLogoPos(pos)
  }
  const handleUp = () => {
    dragging.current = false
  }

  const handleShare = async () => {
    const canvas = canvasRef.current
    if (!canvas) return alert('No canvas available')
    try {
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'))
      const filesArray = [ new File([blob], 'fastor.png', { type: 'image/png' }) ]
      if (navigator.canShare && navigator.canShare({ files: filesArray })) {
        await navigator.share({
          files: filesArray,
          title: restaurant.name,
          text: 'Shared from Fastor demo app'
        })
      } else {
        // fallback: open image in new tab
        const url = URL.createObjectURL(blob)
        window.open(url, '_blank')
      }
    } catch (err) {
      console.error(err)
      alert('Share failed: ' + err.message)
    }
  }

  if (loading) return <div className='min-h-screen flex items-center justify-center'>Loading...</div>
  if (!restaurant) return <div className='min-h-screen flex items-center justify-center'>Restaurant not found</div>

  return (
    <div className='min-h-screen p-6'>
      <div className='max-w-5xl mx-auto'>
        <header className='flex items-center justify-between mb-4'>
          <button onClick={() => navigate(-1)} className='text-slate-600 underline'>Back</button>
          <h1 className='text-xl font-bold'>{restaurant.name}</h1>
          <div></div>
        </header>

        <div className='bg-white rounded-xl shadow p-4'>
          <div className='flex flex-col md:flex-row gap-4'>
            <div className='md:flex-1'>
              <canvas ref={canvasRef}
                className='w-full border rounded'
                onMouseDown={handleDown}
                onMouseMove={handleMove}
                onMouseUp={handleUp}
                onMouseLeave={handleUp}
                onTouchStart={handleDown}
                onTouchMove={handleMove}
                onTouchEnd={handleUp}
                style={{ maxWidth: '100%', height: 'auto' }}
              />
              <div className='mt-3 flex gap-2'>
                <button onClick={handleShare} className='bg-teal-500 text-white px-4 py-2 rounded'>Share Image</button>
                <button onClick={() => { setLogoPos({ x:0.5, y:0.5 }); drawCanvas() }} className='px-3 py-2 border rounded'>Center Logo</button>
              </div>
            </div>
            <aside className='md:w-80'>
              <h3 className='font-semibold'>Details</h3>
              <p className='text-sm text-slate-600'>Address: {restaurant.address}</p>
              <p className='text-sm text-slate-600'>Rating: {restaurant.rating}</p>
              <div className='mt-4 text-sm text-slate-500'>Tip: Drag (or touch) on the image to reposition the logo.</div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}
