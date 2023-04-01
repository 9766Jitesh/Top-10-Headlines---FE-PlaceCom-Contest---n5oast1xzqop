import React, { useState, useEffect } from 'react'
import '../styles/App.css';

const App = () => {
  const [category, setCategory] = useState("general");
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState();
  const apiKey='278d2471b53d8aa2b7390076f98f5905';

  useEffect(()=>{
    setLoading(true);
    fetch( `https://gnews.io/api/v4/top-headlines?category=${category}&apikey=${apiKey}&max=10&lang=en `)
      .then(res=>res.json())
      .then(data=>{
        setNewsData(data.article);
        setLoading(false);
      })
      .catch(err=>console.error(err));
  },[category])

  const handleCategory=(e)=>{
    //console.log(e.target.value);
    setCategory(e.target.value);
  }

  return (
    <div id="main">
      <h1 className='heading' >Top 10 {category} news.</h1>
      <select value={category} onChange={handleCategory}>
        <option value="general" >General</option>
        <option value="business">Business</option>
        <option value="sports">Sports</option>
        <option value="technology">Technology</option>
        <option value="world">World</option>
        <option value="entertainment">Entertainment</option>
        <option value="science">Science</option>
      </select>
      {loading?(

        <p className='loader'>Loading...</p>
      ):(
      <ol>
        {newsData?.map((articles)=>(
        <li key={articles.url}>
          <img className='news-img' src={articles.image} alt=""/>
          <section className='new-title-content-author'>
            <h3 className='news-title'>{articles.title}</h3>
            <section className='new-content-author'>
              <p className='news-description'>{articles.description}</p>
              <p className='news-source'><strong>Source:{articles.source}</strong> source name</p>
            </section>
          </section>
        </li>
        ))}
      </ol>

      )

      }
    </div>
  )
}


export default App;
