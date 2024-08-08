import React from 'react'
import { useSelector } from "react-redux";
import Item from './item';
import store from '../redux/store';


export default function Items() {
    const shopItems = useSelector((state) => state);

    const sellHandler = (event)=>{
        store.dispatch(({type: "SELL", payload: parseInt(event.target.id)}))
    }
  return (
    <div>
        <ul>
            {shopItems.map((data) => (
            <Item key={data.id} data={data} sellHandler={sellHandler}/>
            ))}
        </ul>
    </div>
  )
}
