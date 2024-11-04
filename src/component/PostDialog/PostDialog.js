import React, {useState,  useRef } from 'react'
import { Dialog, DialogContent, DialogActions, Button} from '@mui/material'
import './postDialog.css'
import { uploadPost } from '../../store/modules/postStore'
import { useDispatch } from 'react-redux'

const PostDialog = ({open, handleClose}) => {
    const dispatch = useDispatch()
    const fileInputRef = useRef(null)
    const [selectedImage, setSelectedImage] = useState(null)
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);

    const handleUploadClick = () => {
        fileInputRef.current.click()
    }
  
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const imageUrl = URL.createObjectURL(file);
          setSelectedImage(imageUrl);
        }
    };

    const handleUpload = async() => {
      if (!title || !selectedImage) {
        alert("Please fill in the title and select an image.");
        return;
      }

      const userId = localStorage.getItem("userId");

      if (!userId) {
          alert("User not logged in. Please log in to upload posts.");
          return;
      }

      const formData = new FormData();
      formData.append('title', title);
      formData.append('postImage', fileInputRef.current.files[0]);
      formData.append('userId', userId);

      setLoading(true); 

      console.log('Form Data:', formData);

      dispatch(uploadPost(formData)).then(() => {
        handleClose();
        setTitle('');
        setSelectedImage(null);
      });
    }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth={true}
      maxWidth="md"
      PaperProps={{
        style: {
          minHeight: '400px',
          maxHeight: '700px',
          width: '600px',
        },
      }}
   >
    <DialogContent>
      <form>
        {/* Image Upload */}
        <div onClick={handleUploadClick}>
        {selectedImage ? (
          <div className='image-box'>
            <img src={selectedImage} alt='Selected' className='selected-image' />
          </div>
        ) : (
          <div className='upload-box'>
            <img src='/assets/plus.png' alt='Plus Icon' />
          </div>
        )}
        </div>
        <input
          id='file-input'
          type='file'
          accept='image/*'
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        {/* Description Input */}
        <div className='dialog-bottom'>
          <div className='title'>Title:</div>
          <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
      </form>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button color='primary'  onClick={handleUpload}  disabled={loading}>
        {loading ? 'Uploading...' : 'Upload'}
      </Button>
    </DialogActions>
  </Dialog>
  )
}

export default PostDialog