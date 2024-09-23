import { useState } from 'react';
import './App.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Helmet} from 'react-helmet';
import { motion } from "framer-motion"

function App() {
  const [random, setRandom] = useState({});
  const [color, setColor] = useState('');

  function handleClick(){
    axios.get('https://api.quotable.io/random')
      .then(response =>{
        setRandom(response.data);
        setColor(getRandomColor());
      })
    .catch(error =>{
      console.error(error);
    })
  }

  function getRandomColor() {
    var letters = '01234567';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 8)];
    }
    return color;
  }

  return (
    <motion.div 
    initial={{opacity:0}}
    animate={{opacity:1,transition:.4,ease:"easeIn"}}
    id="wrapper">
       <Helmet>
                <style>{`body { background-color: ${color} }`}</style>
            </Helmet>
    <div id="quote-box">
      <div class="quote-text">
        <i class="fa fa-quote-left"> </i><span id="text" style={{color: color}}>{random.content}</span>
      </div>
      <div class="quote-author">- <span id="author" style={{color: color}}>{random.author}</span></div>
      <div class="buttons" >
        <a
          class="button"
          id="tweet-quote"
          title="Tweet this quote!"
          target="_top"
          style={{backgroundColor: color}}
        >
        <FontAwesomeIcon icon="fa-brands fa-x-twitter" />        
        </a>
        <a
          class="button"
          id="tumblr-quote"
          title="Post this quote on tumblr!"
          target="_blank"
          style={{backgroundColor: color}}
        >
        <FontAwesomeIcon icon="fa-brands fa-square-twitter" />        </a>
        <button class="button" id="new-quote" onClick={handleClick} style={{backgroundColor: color}}>New quote</button>
      </div>
    </div>
    <div class="footer">by <a href="https://codepen.io/reyvans pahlevi/">Rey</a></div>
  </motion.div>
  
  );
}

export default App;

