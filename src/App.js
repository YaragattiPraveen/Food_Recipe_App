import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [search, setsearch] = useState();
  const [foodlist, setfoodlist] = useState([])
  const [load,setload] = useState(8)

  const url = `https://api.edamam.com/search?q=${search}&app_id=${process.env.REACT_APP_API_ID}&app_key=${process.env.REACT_APP_API_KEY}&to=${load}`

  const fetchFoodRecipe = async () => {
    try {
      const data = await axios.get(url);
      setfoodlist(data.data.hits)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchFoodRecipe() // eslint-disable-next-line 
  }, [])


  function submit(e) {
    e.preventDefault()
  }

  const loadMore = ()=>{
    setload((preVal)=>{
      return preVal + 4
    })
    fetchFoodRecipe()
  } 

  return (
    <div className="app">
      <h1>Food Recipe App</h1>
      <form onSubmit={submit}>
        <input type='text' className='inputSearch' placeholder='Search with ingredients..' onChange={(e) => {
          setload(8)
          setsearch(e.target.value)
          }} />
        <button onClick={fetchFoodRecipe} onKeyPress={(e) => {
          if (e.key === 'Enter') {
            fetchFoodRecipe()
            setsearch('')
          }
        }}>Search</button>
      </form>
      <div className='food_item_container'>
        {
          foodlist.map((val, index) => {
            return (
              <div className='card' key={index} onClick={(e)=>{
                window.open(val.recipe.url)
              }}>
                <img src={val.recipe.image} alt='random img' />
                <h3>{val.recipe.label}</h3>
              </div>
            )
          })
        }
      </div>
      <div className='readmore'>
          <p onClick={loadMore}>Load more..</p>
        </div>
    </div>
  );
}

export default App;
