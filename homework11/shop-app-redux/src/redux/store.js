import {createStore} from 'redux'
import { v4 as uuidv4 } from 'uuid';


const shop = [
    {
      id: 1,
      name: "apple",
      quantity: 10,
    },
    {
      id: 2,
      name: "banana",
      quantity: 22,
    },
    {
      id: 3,
      name: "Mango",
      quantity: 20,
    },
  ];

const shopReducer = (state={shop}, {type, payload})=>{
    switch(type){
        case "SELL":
            return state.map((item)=>{
                if(item.id === payload){
                    const tempItem = {
                        ...item,
                        quantity: item.quantity - 1
                    }
                    return tempItem
                }else{
                    return item
                }
            })
        case "ADD":
            const itemObj = {
                id: uuidv4(),
                name: payload.name,
                quantity: payload.quantity
            }
            const temp = [...state, itemObj]
            console.log(temp)
            return temp

        default:
            return state
    }
}


const store = createStore(shopReducer, shop)

export default store