import React from 'react'
import { useState, useEffect } from 'react'
import './ChangeTask.css'
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useDispatch, useSelector} from 'react-redux';
import {
  setName,
  setTitle,
  setDateStart,
  setDateEnd,
  setDescription,
  setSelectedPriority,
  setSelectedStatus,
  resetForm,
} from '../../store/modules/taskFormStore'

const ChangeTask = ({selectedCategory,handleClose,taskToEdit, onTaskUpdate}) => {
  const dispatch = useDispatch();
  const url = process.env.REACT_APP_BACKEND_URL;
  const [showDropdown, setShowDropdown] = useState({ priority: false, status: false });
  const [formattedDateStart, setFormattedDateStart] = useState('');
  const [formattedDateEnd, setFormattedDateEnd] = useState('');

  const {
    name,
    title,
    dateStart,
    dateEnd,
    description,
    selectedPriority,
    selectedStatus
  } = useSelector((state) => state.taskForm);

  useEffect(() => {
    if (taskToEdit) {
      dispatch(setName(taskToEdit.name || ''));
      dispatch(setTitle(taskToEdit.title || ''));
      dispatch(setDateStart(taskToEdit.dateStart || ''));
      dispatch(setDateEnd(taskToEdit.dateEnd || ''));
      dispatch(setDescription(taskToEdit.description || ''));
      dispatch(setSelectedPriority(taskToEdit.priority || 'Low'));
      dispatch(setSelectedStatus(taskToEdit.status || 'On track'));

      setFormattedDateStart(taskToEdit.dateStart || '');
      setFormattedDateEnd(taskToEdit.dateEnd || '');
    }
  }, [taskToEdit, dispatch]);

  const handleSubmit =  async(e) => {
    e.preventDefault()
    if (!name || !title || !dateStart || !selectedPriority) {
      alert("Please fill in all required fields.");
      return;
    }
    const userId = localStorage.getItem("userId");

    const formattedDateStart = new Date(dateStart).toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
    const formattedDateEnd = dateEnd ? new Date(dateEnd).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }) : '';

    const newTask = {
      name,
      category: selectedCategory.category,
      title,
      dateStart: formattedDateStart,
      dateEnd: formattedDateEnd,
      priority: selectedPriority,
      status: selectedStatus,
      description,
      userId
    }

    try{
      const response = await axios.put(`${url}/task/${taskToEdit._id}`,newTask)
      onTaskUpdate(response.data); 
      handleClose();
      dispatch(resetForm());
    }catch(error){
      console.error("Error updating task:", error);
      alert("There was an error updating the task.");
    }
  }


  const toggleDropdown = (type) => {
    setShowDropdown(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const handleSelection = (type, value) => {
    if (type === 'priority') {
      dispatch(setSelectedPriority(value));
    } else {
      dispatch(setSelectedStatus(value));
    }
    setShowDropdown(prev => ({ ...prev, [type]: false }));
  };

  const handleDateStartChange = (e) => {
    const selectedDate = e.target.value;
    dispatch(setDateStart(selectedDate)); 

    const date = new Date(selectedDate);
    const options = { day: 'numeric', month: 'short' };
    const formatted = date.toLocaleDateString('en-US', options);
    setFormattedDateStart(formatted);
  };

  const handleDateEndChange = (e) => {
    const selectedDate = e.target.value;
    dispatch(setDateEnd(selectedDate)); 

    const date = new Date(selectedDate);
    const options = { day: 'numeric', month: 'short' };
    const formatted = date.toLocaleDateString('en-US', options);
    setFormattedDateEnd(formatted);
  };

    return(
      <Dialog
      open={!!selectedCategory}
      onClose={handleClose}
      fullWidth
      maxWidth='sm'
      scroll='body'
      PaperProps={{
        style: {
          borderRadius: '10px 10px 10px 10px',
          position: 'fixed',
          bottom: 120,
          transform: 'translateX(-50%)', 
          margin: 0,
          width: '100%',
          height: '50vh',
          overflowY: 'auto', 
        },
      }}
    >
      <DialogTitle>
        {selectedCategory ? selectedCategory.name : "Task Details"}
        <IconButton
          aria-label='close'
          onClick={handleClose}
          style={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <div className='draft-title'>Draft plan brief</div>
        <form className="info-category" onSubmit={handleSubmit}>
          <div className='info-content'>
            <div className='title'>
              Assignee
            </div>
            <div className='content'>
              <input 
                type="text"
                name="name"
                value={name}
                placeholder="type your name"
                onChange={(e) => dispatch(setName(e.target.value))}/>
            </div>
          </div>
          <div className='date-title'>
              Due date :
          </div>
          <div className='info-content'>
            <div className='date-content'>
            from {!formattedDateStart ? (
              <input type="date" value={dateStart} onChange={handleDateStartChange} />
            ) : (
              <div onClick={() => {setFormattedDateStart(''); dispatch(setDateStart(''));}}>
                {formattedDateStart}
              </div>
            )} 
            </div>
            <div className='date-content'>
            to {!formattedDateEnd ? (
              <input type="date" value={dateEnd} onChange={handleDateEndChange} />
            ) : (
              <div onClick={() => {setFormattedDateEnd(''); dispatch(setDateEnd(''));}}> 
                {formattedDateEnd}
              </div>
            )} 
            </div>
          </div>
          <div className='info-content'>
            <div className='project-title'>
              Title
            </div>
            <div className='content'>
              <input
                type='text' 
                name='title'
                value={title}
                placeholder="type brief project"
                onChange={(e) => dispatch(setTitle(e.target.value))}
              />
            </div>
          </div>
          <div className='info-content'>
            <div className='title'>
              Fields
            </div>
            <div className='content'>
              <table className="simple-table">
                <tbody>
                  <tr>
                    <td className='fields-container'>
                      <img src='/assets/right-arrow.png' alt='' className='arrow-right-icon'/>
                      Priority
                    </td>
                    <td onClick={() => toggleDropdown('priority')} className='priority-container'>
                      { !showDropdown.priority ? ( 
                      <div className='priority'>
                        <div className='priority-name'>
                          {selectedPriority}
                        </div>
                          <img src='/assets/chevron-down.png' alt='' className='chevron-down'/>
                      </div>
                      ) : ( 
                        <div className='drop-down'>
                        <ul>
                          <li onClick={(e)=> {e.stopPropagation();handleSelection('priority', 'Low')}}>Low</li>
                          <li onClick={(e)=> {e.stopPropagation();handleSelection('priority', 'Medium')}}>Medium</li>
                          <li onClick={(e)=> {e.stopPropagation();handleSelection('priority', 'High')}}>High</li>
                        </ul>
                      </div>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className='fields-container'>
                      <img src='/assets/right-arrow.png' alt='' className='arrow-right-icon'/>
                      Status
                    </td>
                    <td onClick={() => toggleDropdown('status')}className='status-container'>
                    {!showDropdown.status ? (
                      <div className='priority'>
                        <div className='priority-name'>
                          {selectedStatus}
                        </div>
                          <img src='/assets/chevron-down.png' alt='' className='chevron-down'/>
                      </div>
                      ): (
                        <div className='drop-down'>
                        <ul>
                          <li onClick={(e) => {e.stopPropagation(); handleSelection('status', 'On track')}}>On track</li>
                          <li  onClick={(e) => {e.stopPropagation(); handleSelection('status', 'At risk')}}>At risk</li>
                          <li  onClick={(e) => {e.stopPropagation(); handleSelection('status', 'Off track')}}>Off track</li>
                        </ul>
                      </div>
                      )
                    }
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className='info-content-description'>
            <div className='title'>
              Description
            </div>
            <div className='content'>
              <textarea 
                type = "text"
                name = "description"
                value={description}
                onChange={(e) => dispatch(setDescription(e.target.value))}
                className='description-text'
              />
            </div>
          </div>
          <div className='info-content'>
            <button className='btn-task-submit'>submit</button>
          </div>
        </form>

      </DialogContent>
    </Dialog>
    )}

export default ChangeTask