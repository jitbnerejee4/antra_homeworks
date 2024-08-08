import React from 'react'

export default function Item({data, sellHandler}) {
  return (
    <div>
      <li>
        <span>{data.name}</span>
        <span>{data.quantity}</span>
        <span><button onClick={sellHandler} id={data.id}>SELL</button></span>
      </li>
    </div>
  )
}
