import React,  { useEffect } from 'react'
import './index.css'
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../nav/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { bookEvent, fetchEventDetails, setUserName, setEmail, setSelectedTime } from '../../store/modules/eventStore';

const Booking = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const {events, userName, email, selectedTime } = useSelector(state => state.event)
  
    useEffect(() => {
      if (eventId) { 
        dispatch(fetchEventDetails(eventId));
      }
    }, [dispatch, eventId]);

    const handleBookingClick = async () => {
      const userId = localStorage.getItem('userId')
      if (!userId) {
        alert("You must be logged in to book your ticket.");
        return;
      }
      dispatch(bookEvent({
        eventId: events.id,
        eventName: events.title,
        category: events.category,
        location: events.location,
        date: events.time,
        userName: userName,
        email: email,
        time: selectedTime
      })
      ).then(()=>{
        navigate('/event')
      })
  };

  const handleBackClick = () => {
    navigate(`/event/details/${eventId}`);
  };

  const handleTimeSelection = (time) => {
    dispatch(setSelectedTime(time)); 
  };

  const handleUserNameChange = (e) => {
    dispatch(setUserName(e.target.value));
  };

  const handleEmailChange = (e) => {
    dispatch(setEmail(e.target.value));
  };
  
  return (
    <div className='event-details-container'>
      <div className='top-event-details'>
        <div onClick={handleBackClick}>
          <img src='/assets/back.png' alt='' />
        </div>
        <div className='title'>Details Order</div>
      </div>
        {events && 
          <div className='details-content'>
          <div className='event-details-img'>
            <img src= {`/assets/activity${events.id}.png`}alt='' className='each-event-image'/>
          </div>
          <div className='box'>
            <div className='text'>Name <span>*</span></div>
            <input 
              name='name'
              value={userName}
              onChange={handleUserNameChange}
            />
          </div>
          <div className='box'>
            <div className='text'>Email <span>*</span></div>
            <input 
              name='email'
              value={email}
              onChange={handleEmailChange}
            /> 
          </div>
          <div className='box'>
            <div className='text'>Choose Time<span>*</span></div>
          </div>
          <div className={`time-container time-${events.id}`}>
            {['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30'].map((time) => (
              <div 
              key={time} 
              onClick={() => handleTimeSelection(time)} 
              className={selectedTime === time ? 'selected' : ''}
            >
              {time}
            </div>
          ))}
          </div>
        </div>
        }
      <div className='booking-btn'>
        {events?(
          <button className={`booking-different-${events.id}`} onClick={handleBookingClick}>Booking</button>
        ):(
          <div></div>
        )}
      </div>
      <Navbar />
    </div>
  )
}

export default Booking