import './App.css';
import Items from './components/items';
import AddItem from './components/additem';
import store from './redux/store';

function App() {

  const addItemHandler = (event)=>{
    event.preventDefault()
    const name = event.target.name.value;
    const quantity = parseInt(event.target.quantity.value);
    console.log(name, quantity)
    store.dispatch({type: "ADD", payload: {name, quantity}})


  }
  return (
    <div className="App">
      <h1>Shop</h1>
      <AddItem addItemHandler={addItemHandler}/>
      <Items/>
    </div>
  );
}

export default App;
