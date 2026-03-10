'use client';
import React, { useState } from 'react'

const Assistant = () => {
    const [request, setRequest] = useState("");
  return (
    <>
    <h2 className='text-lg text-gray-800 font-semibold mb-4'>Ask Your AI Campus Assistant</h2>
    <input type='text'
        placeholder='Type your request...'
        value={request}
        onChange={(e) => setRequest(e.target.value)}
        className='w-full border rounded px-3 py-2 text-gray-600'
     />
    </>
  )
}

export default Assistant