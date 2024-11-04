import React from 'react'
import { useState,useEffect } from 'react'
import './category.css'
import TaskDialog from '../TaskDialog/TaskDialog';
import { fetchTaskCounts, selectTaskCounts} from '../../store/modules/taskStore';
import { useDispatch, useSelector } from 'react-redux';

const Category = ({categories, userId}) => {
  const dispatch = useDispatch();
  const taskCounts = useSelector(selectTaskCounts);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(()=>{
    if (userId) {
      dispatch(fetchTaskCounts());
    }
  }, [userId, dispatch])

  const handleClick = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const handleClose = () => {
    setSelectedCategory(null);
  };

  return (
  <div className='container-scroll'>
      <div className='subtitle'>Plan Category</div>
      <div className='category-items'>
        {categories.map((category) => (
          <div key={category.id} onClick={() => handleClick(category)} className='click'>
            <div className={`item item-${category.name.toLowerCase()}`}>
              <img src={`/assets/${category.name.toLowerCase()}.png`}alt='' className='category-icon' />
              <div className='category-name'>{category.name}</div>
              <div className='category-task'>
                <img src='/assets/arrow.png' alt='' className='arrow-icon' />
                <div className='task-number'>{taskCounts[category.name] || 0} Tasks</div>
              </div>
              <div className='plus'>
                <img src='/assets/plus.png' alt='' className='plus-icon' />
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedCategory && (
        <TaskDialog selectedCategory={selectedCategory} handleClose={handleClose} />
      )}
  </div>
  )
}

export default Category