import React, { useContext, useState } from 'react'
import Navbar from './Navbar'
import '../Css files/CreateEvent.css'
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

function CreateEvent() {
    const {user} = useContext(UserContext);
    const navi = useNavigate();
  const [newEvent,SetnewEvent] = useState({
    EventName:"",
    EventDescription:"",
    EventDate:"",
    EventVenue:"",
    EventPrice:0,
    AvailableTickets:0,
    EventPic:""
  });
  const HandleInputChange = (e)=>
  {
      e.preventDefault();
      const {name,value} = e.target;
      SetnewEvent((prevData)=>({
          ...prevData,
          [name] : value
      }));
  }
  const HandleCreateEvent = async(e)=>{
    e.preventDefault();
    try{
        const res = await CreateEvent(newEvent,user._id);
        console.log("Created event:", res.data);
        alert("Event created successfully!");
        navi('/Events');
    }
    catch(error){
        console.error("Error creating event:", error);
        alert("Error creating event");
    }
  }
  return (
    <div className="CreateEveMainDiv">
        <Navbar/>
        <div className="CreateEveSubDiv">
            <h2>CREATE A NEW EVENT</h2>
            <form onSubmit={HandleCreateEvent} className='CreateEventForm'>
              <div className="eventcreatefirstrowDiv">
                  <label htmlFor="">
                      EventName <br />
                      <input type="text" name="EventName" id="" onChange={HandleInputChange}/>
                  </label>
                  <label htmlFor="">
                      EventDate <br />
                      <input type="datetime" name="" id="" onChange={HandleInputChange} />
                  </label>
              </div>
              <div className="eventcreatefirstrowDiv">
                  <label htmlFor="">
                      EventVenue <br />
                      <input type="text" name="EventVenue" id=""  onChange={HandleInputChange}/>
                  </label>
                  <label htmlFor="">
                      EventPrice <br />
                      <input type="text" name="EventPrice" id="" onChange={HandleInputChange} />
                  </label>
              </div>
              <div className="eventcreatefirstrowDiv">
                  <label htmlFor="">
                      Total Number of tickets <br />
                      <input type="text" name="AvailableTickets" id="" onChange={HandleInputChange} />
                  </label>
                  <label htmlFor="">
                      EventPic <br />
                      <input type="text" name="EventPic" id=""  onChange={HandleInputChange}/>
                  </label>
              </div>
              <label htmlFor="">
                  EventDescription <br />
                  <textarea name="" id="" cols="30" rows="10"  onChange={HandleInputChange}></textarea>
                  </label>
              <button type='submit'>Organize Now</button>
            </form>
        </div>
    </div>
  )
}

export default CreateEvent