import React, { useContext, useEffect, useState } from 'react';
import '../Css files/Events.css';
import Navbar from './Navbar';
import { DeleteEvent, GetEvents } from '../Api';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import UpdateEvent from './UpdateEvent';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

function Events() {
  const { updateEvent } = useContext(UserContext);
  const [events, setEvents] = useState([]); // Initialize with an empty array
  const [searchText, setSearchText] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editEvent, setEditEvent] = useState(null);
  const navi = useNavigate();

  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await GetEvents();
        console.log(data);
        setEvents(data.events); // Store fetched data in state
      } catch (error) {
        console.log("Error fetching events: ", error);
      }
    }
    fetchEvents();
  }, []);

  const HandleDelEvent = async (eventId) => {
    try {
      console.log(eventId);
      await DeleteEvent(eventId); // Call the API to delete the event
      // Update the state to exclude the deleted event
      setEvents(events.filter(event => event._id !== eventId));
    } catch (error) {
      console.log("Error deleting event: ", error);
    }
  };

  const HandleSearchEvents = (text) => {
    setSearchText(text);
  };

  // Filter events based on search text
  const filteredEvents = events.filter(event =>
    event.EventName.toLowerCase().includes(searchText.toLowerCase())
  );

  const HandleUpdateEvent = async (event) => {
    try {
      updateEvent(event);
      navi('/UpdateEvent');
    } catch (error) {
      console.log("Error updating event: ", error);
    }
  };

  return (
    <div className='EventsMainDiv'>
      <Navbar />
      <div className="searchEventsDiv">
        <input
          type="text"
          placeholder="Search Events..."
          onChange={(event) => HandleSearchEvents(event.target.value)}
        />
      </div>
      <div className="EventshowDiv">
        {filteredEvents && filteredEvents.length > 0 ? (
          filteredEvents.filter(event => new Date(event.EventDate).getTime() >= Date.now()).map(event => (
            <div className="eacheventDiv" key={event._id}>
              <div className="TicketRemainingDiv">
                <span>Available Tickets: {event.AvailableTickets}</span>
              </div>
              <div className="EvenntImgDiv">
                <img src={event.EventPic} alt="" />
              </div>
              <h2>{event.EventName}</h2>
              <div className="PriceDiv">
                <table style={{ alignItems: "start", textAlign: "start" }}>
                  <tbody>
                    <tr>
                      <td>Date</td><td>:</td><td>{new Date(event.EventDate).toLocaleDateString()}</td>
                    </tr>
                    <tr>
                      <td>Time</td><td>:</td><td>{new Date(event.EventDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</td>
                    </tr>
                    <tr>
                      <td>Location</td><td>:</td><td>{event.EventVenue}</td>
                    </tr>
                    <tr style={{ alignItems: "center" }}>
                      <td>Price</td><td>:</td><td>₹{event.EventPrice}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="AdminSettingDiv">
                <button className='EditButton' onClick={() => { HandleUpdateEvent(event) }}><MdEdit />Edit</button>
                <button className='DeleteButton' onClick={() => HandleDelEvent(event._id)}><MdDelete />Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No events available at the moment.</p>
        )}
      </div>
      {isEdit ? <UpdateEvent eventData={editEvent} close={isEdit} /> : null}
    </div>
  );
}

export default Events;
