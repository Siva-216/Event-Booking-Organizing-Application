import React from 'react'
import '../Css files/Home.css'
import HeroImg from '../Images/Food Festival.avif'
import Navbar from './Navbar'

function Home() {
  return (
    <div className='HomeMainDiv'>
       <Navbar/>
       <div className="HerosectionTotalDiv">
                  <div className="HeroContents">
                      <h1>Discover and experience <span>events</span> with like-minded people</h1>
                      <p>Discover and book events tailored to your passions.Connect with like-minded enthusiasts, join vibrant communities, and chat with fellow attendees-all in one app!</p>
                      <button>Get Started Now</button>
                  </div>
                  <div className="heroImg">
        </div>
        </div>
    </div>
  )
}

export default Home