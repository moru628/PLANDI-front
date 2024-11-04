import React, { useEffect } from 'react'
import Navbar from '../../nav/Navbar'
import { Link } from 'react-router-dom'; 
import './index.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventData } from '../../store/modules/activityStore';
import { toggleHeartEvent } from '../../store/modules/eventStore'

const Event = () => {
  const dispatch = useDispatch();

  const activities = useSelector(state => state.activity.activities); 
  const heartIconStates = useSelector(state => state.event.heartIconStates || {});

  useEffect(()=>{
    dispatch(fetchEventData())
  },[dispatch])

  const handleClickHeart = (activity) => {
    const newLikedState = !heartIconStates[activity.id];
    dispatch(toggleHeartEvent({ ...activity, isLiked: newLikedState }));
};


  return (
    <div className='event-container'>
      <div className='container-scroll-event'>
        <div className='title-event'>
          <div className='line-event'>--</div>
          <div className='event'>Event</div>
          <div className='line-event'>--</div>
        </div>
        <div className='event-items'>
        {activities.map((activity)=>(
          <div className='event-item' key={activity.id}>
            <div className='img-container'>
            <img src= {`/assets/activity${activity.id}.png`}alt='' className='event-img'/>
            </div>
            <div className={`act-info act-info-${activity.id}`}>
            <div className='act-title-1'>{activity.title}</div>
            <div className='act-title-2'>{activity.sub_title}</div>
            <div className='location'>
                <img src='/assets/vector.png' alt='' className='act-icon'/>
                <div className='act-location'>{activity.location}</div>
            </div>
            <div className='act-bottom'>
            <div className='act-time'>
                {activity.time}
            </div>
            <div className='act-friends'>
                <div className='friends-photo'></div>
            </div>
            </div>
            <div className='end-section'>
              <Link to={`/event/details/${activity._id}`} className={`act-button button-${activity.id}`}>
                <img src='/assets/ok.png' alt='' />
                <div className='button-text'>Joining</div>
              </Link>
              <div className='heart-button' onClick={() => handleClickHeart(activity)}>
              <img 
                src={heartIconStates[activity.id] ? '/assets/heart-2.png' : '/assets/heart-1.png'} 
                alt={heartIconStates[activity.id] ? 'Liked' : 'Not Liked'} 
                className='heart-icon'
              />
              </div>
            </div>
          </div>
          </div>
        ))}
        </div>
    </div>
      <Navbar />
    </div>
  )
}

export default Event