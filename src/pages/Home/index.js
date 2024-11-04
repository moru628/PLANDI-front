import React, {useEffect}from 'react'
import Navbar from '../../nav/Navbar';
import './index.css'
import { AiFillHeart } from "react-icons/ai";
import Category from '../../component/Category/Category';
import Activity from '../../component/Activities/Activities'
import { useDispatch, useSelector } from 'react-redux';
import { selectThreeRandomPosts} from '../../store/modules/postStore';
import { fetchTaskCounts } from '../../store/modules/taskStore';
import { fetchUserData,selectUserName,selectProfileImg } from '../../store/modules/userStore';

const Home = () => {
  const dispatch = useDispatch()
  const userId = localStorage.getItem("userId");
  const url = process.env.REACT_APP_BACKEND_URL;
  const {selectedPosts} = useSelector(state => state.post)
  const {taskCounts} = useSelector(state => state.task)
  const userName = useSelector(selectUserName);
  const profileImg = useSelector(selectProfileImg);

  const categories = [
    { id: 1, name: 'Work', tasks: taskCounts['Work'] || 0 },
    { id: 2, name: 'Study', tasks: taskCounts['Study'] || 0 },
    { id: 3, name: 'Pet', tasks: taskCounts['Pet'] || 0 },
    { id: 4, name: 'Family', tasks: taskCounts['Family'] || 0 },
    { id: 5, name: 'Play', tasks: taskCounts['Play'] || 0 }
  ];

  useEffect(() => {
      dispatch(fetchUserData());
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(selectThreeRandomPosts());
  }, [dispatch]);

  useEffect(()=>{
    dispatch(fetchTaskCounts())
  }, [dispatch])

  return (
    <div>
        <div className='container'>
            <div className='container-title'>
                <div className='user-info'>
                    <div className='user'>
                        <div className='user-welcome'>Hello!</div>
                        <div className='user-name'>{userName}</div> 
                    </div>
                    {userId ? (
                      <img src={profileImg} alt='' className='user-photo'></img>
                    ) : (
                      <img src={'/assets/profile-blank.png'} alt='' className='user-photo'></img>
                    )}
                </div>
                <div className="search-container">
                    <input type='text' placeholder='Search...' className='search-input' />
                    <img src='/assets/search.png' alt='' className="search-icon" />
                </div>
            </div>
            <Category categories={categories} userId={userId} />
            <Activity />
            <div className='container-scroll'>
              <div className='subtitle'>
                Moment
              </div>
              <div className='momemnt-contain'>
                {selectedPosts.map((post) => (
                <div key={post._id} className= 'moment-item'
                  style={{
                  backgroundImage: `url(${url}/upload/${post.imageUrl})`,
                }}
                >
                  <div className='moment-content'>
                    <div className='profile-circle'>
                    <img
                      src={`${url}/upload/${post.profileImg}`}
                      alt=''
                      className='profile-image'
                    />
                    </div>
                  </div>
                  <div className='moment-info'>
                    <div className='name'>{post.name}</div>
                    <div className='like'>
                      <AiFillHeart className='like-icon' />
                      <div className='like-number'>1.2 k</div>
                    </div>
                  </div>
                </div>
              ))}
              </div>
            </div>
        </div>
        <Navbar />
    </div>
  )
}

export default Home