import React, { useEffect} from 'react'
import './activities.css'
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { fetchEventData } from '../../store/modules/activityStore';

const Activity = () => {
const {activities} = useSelector(state => state.activity)
const dispatch = useDispatch()

useEffect(()=>{
    dispatch(fetchEventData())
}, [dispatch])
    
  return (
        <div className='container-scroll'>
        <div className='subtitle'>Events</div>
        <div className='acts'>
        {activities.map((activity)=>(
            <Link to={`/event/details/${activity._id}`} className='item-acts' key={activity.id}>
            <div className='img-container'>
            <img src= {`/assets/activity${activity.id}.png`}alt='' className='acts-img'/>
            </div>
            <div className={`acts-info act-info-${activity.id}`}>
                <div className='acts-title-1'>{activity.title}</div>
                <div className='acts-title-2'>{activity.sub_title}</div>
                <div className='location'>
                    <img src='/assets/vector.png' alt='' className='location-icon'/>
                    <div className='location-text'>{activity.location}</div>
                </div>
                <div className='act-bottom'>
                <div className='act-time'>
                    {activity.time}
                </div>
                <div className='act-friends'>
                    <div className='friends-photo'></div>
                </div>
                </div>
            </div>
        </Link>
        ))}
        </div>
    </div>
  )
}

export default Activity