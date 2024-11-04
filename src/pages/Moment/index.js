import React, {useEffect, useState} from 'react'
import Navbar from '../../nav/Navbar'
import './index.css'
import PostDialog from '../../component/PostDialog/PostDialog'
import { useDispatch,useSelector } from 'react-redux'
import { fetchPostsData } from '../../store/modules/postStore'
import { followFriend, unfollowFriend, fetchFriendsData } from '../../store/modules/friendStore'

const Moment = () => {
  const [open, setOpen] = useState(false)

  const url = process.env.REACT_APP_BACKEND_URL;

  const dispatch = useDispatch()
  const {posts} = useSelector(state => state.post)
  const { followedFriends } = useSelector(state => state.friend);

  useEffect(()=>{
    dispatch(fetchPostsData())
    dispatch(fetchFriendsData());
  },[dispatch])

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleFollow = (friendId) => {
    dispatch(followFriend(friendId));
  };
  
  const handleUnfollow = (friendId) => {
    dispatch(unfollowFriend(friendId)); 
  };
  
  return (
    <div className='moment-container'>
      <div className='container-scroll-moment'>
        <div className='title-moment'>
            <div className='line-moment'>--</div>
            <div className='moment'>Moment</div>
            <div className='line-moment'>--</div>
        </div>
        <div className='friends-Image-container'>
        {followedFriends.length === 0 ? (
          <>
            <img src='/assets/dot.png' alt='No followed friends' className='dot-image' />
            <img src='/assets/dot.png' alt='No followed friends' className='dot-image' />
          </>
          ) : (
          followedFriends.map((friend) => (
            <div className='each-profile' key={friend._id}>
              <img src={`${url}/upload/${friend.profileImg}`} alt='' className='top-image' />
              <div className='name'>{friend.name}</div>
            </div>
          ))
        )}
        </div>
        <div className='post-container'>
          <div className='title'>Posts</div>
          <div className='all-posts'>
            {posts.map((post)=>(
              <div className='each-post' key={post._id}>
                <div className='post-top'>
                  <img src={post.profileImg} alt='' className='post-image'/>
                  <div className='name'>{post.name}</div>
                  <div className='follow-btn' onClick={() => {
                      if (followedFriends.some(friend => friend._id === post.user)) {
                        handleUnfollow(post.user);
                      } else {
                        handleFollow(post.user);
                      }
                    }}>
                    <div className={followedFriends.some(friend => friend._id === post.user) ? 'following' : 'follow'}>
                      {followedFriends.some(friend => friend._id === post.user) ? "Followed" : "Follow"}
                    </div>
                  </div>
                </div>
                <div className='post-medium'>
                  <img src={`${url}/upload/${post.imageUrl}`} alt='' className='image'/>
                </div>
                <div className='post-bottom'>
                  <div className='description'>
                    {post.title}
                  </div>
                  <img src='/assets/comment.png' alt='' className='comment-icon'/>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='add-icon' onClick={handleClickOpen}>
          <img src='/assets/Add.png' alt='' className='add-icon'/>
        </div>
        <PostDialog 
          open={open}
          handleClose={handleClose}
        />
      </div>
      <Navbar />
    </div>
  )
}

export default Moment