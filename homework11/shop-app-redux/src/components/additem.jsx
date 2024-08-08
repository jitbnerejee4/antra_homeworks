import React from 'react'

export default function AddItem({addItemHandler}) {
  return (
    <div>
        <form onSubmit={addItemHandler}>
            <input type="text" placeholder="Item Name" name="name"/>
            <input type="number" placeholder="quantity" name="quantity"/>
            <button type="submit">ADD</button>
        </form>
    </div>
  )
}
