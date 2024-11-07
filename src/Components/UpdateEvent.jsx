import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import '../Css files/CreateEvent.css'
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';
import { UpdateEvents } from '../Api';

function UpdateEvent() {
  const {removeupEvent,upevent} = useContext(UserContext);
  const navi = useNavigate();
  const [newEvent,SetnewEvent] = useState(upevent);
  const HandleInputChange = (e)=>
  {
      e.preventDefault();
      const {name,value} = e.target;
      SetnewEvent((prevData)=>({
          ...prevData,
          [name] : value
      }));
  }
  const HandleUpdateEvent = async(e)=>
  {
        e.preventDefault();
        try{
            console.log(newEvent._id,newEvent);
            await UpdateEvents(newEvent._id,newEvent);
            removeupEvent();
            alert("Event Updated Successfully");
            navi('/Events');
        }
        catch(error){
            console.error("Error at Update Event "+error.message);
        }
  }
  return (
    <div className="CreateEveMainDiv">
        <Navbar/>
        <div className="CreateEveSubDiv">
            <h2>UPDATE EVENT</h2>
            <form onSubmit={HandleUpdateEvent} className='CreateEventForm'>
              <div className="eventcreatefirstrowDiv">
                  <label htmlFor="">
                      EventName <br />
                      <input type="text" name="EventName" id="" onChange={HandleInputChange} value={newEvent.EventName}/>
                  </label>
                  <label htmlFor="">
                      EventDate <br />
                      <input type="datetime" name="EventDate" id="" onChange={HandleInputChange}  value={newEvent.EventDate}/>
                  </label>
              </div>
              <div className="eventcreatefirstrowDiv">
                  <label htmlFor="">
                      EventVenue <br />
                      <input type="text" name="EventVenue" id="" onChange={HandleInputChange}  value={newEvent.EventVenue}/>
                  </label>
                  <label htmlFor="">
                      EventPrice <br />
                      <input type="text" name="EventPrice" id="" onChange={HandleInputChange}  value={newEvent.EventPrice}/>
                  </label>
              </div>
              <div className="eventcreatefirstrowDiv">
                  <label htmlFor="">
                      Total Number of tickets <br />
                      <input type="text" name="AvailableTickets" id="" onChange={HandleInputChange}  value={newEvent.AvailableTickets}/>
                  </label>
                  <label htmlFor="">
                      EventPic <br />
                      <input type="text" name="EventPic" id="" onChange={HandleInputChange}  value={newEvent.EventPic}/>
                  </label>
              </div>
              <label htmlFor="">
                  EventDescription <br />
                  <textarea name="EventDescription" id="" cols="30" rows="10" onChange={HandleInputChange}  value={newEvent.EventDescription}></textarea>
                  </label>
              <button type='submit'>Update Now</button>
            </form>
        </div>
    </div>
  )
}

export default UpdateEvent