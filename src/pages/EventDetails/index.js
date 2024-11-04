import React,  { useEffect} from 'react'
import './index.css'
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../nav/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventDetails } from '../../store/modules/eventStore';

const EventDetails = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {events} = useSelector(state => state.event)

  useEffect(() => {
    if (eventId) { 
      dispatch(fetchEventDetails(eventId));
    }
  }, [dispatch, eventId]);

  const handleBackClick = () => {
    navigate('/event');
  };

  const handleConfirmClick = () => {
    navigate(`/booking/${eventId}`);
  };

  return (
    <div className='event-details-container'>
      <div className='top-event-details'>
        <div onClick={handleBackClick}>
          <img src='/assets/back.png' alt='' />
        </div>
        <div className='title'>Event Details</div>
      </div>
      {events ? (
          <div className='details-content'>
            <div className='event-details-img'>
              <img src= {`/assets/activity${events.id}.png`}alt='' className='each-event-image'/>
            </div>
            <div className='box'>
              <div className='text'>Event Name :</div>
              <input value={events.title} readOnly />
            </div>
            <div className='box'>
              <div className='text'>Category Event :</div>
              <input value={events.category} readOnly /> 
            </div>
            <div className='box'>
              <div className='text'>Location :</div>
              <input value={events.location} readOnly />
            </div>
            <div className='box'>
              <div className='text'>Date :</div>
              <input value={events.time} readOnly />
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      <div className='confirm-btn'>
        {events?(
          <button className={`confirm-different-${events.id}`} onClick={handleConfirmClick}>Confirm</button>
        ):(
          <div></div>
        )}
      </div>
      <Navbar />
    </div>
  )
}

export default EventDetails 