import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AllImages from '../../constant/images';
import { ConfirmModalInterface } from '../../interfaces/ConfirmModal.interface';
import './ConfirmModal.scss'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 597,
  height: 445,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: '40px',

};

const ConfirmModal = ({ open, setOpen }:ConfirmModalInterface) => {

  return (
      <Modal
        className='modal-container'
        keepMounted
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <div className='modal-container'>

            <img src={AllImages.animation} />

            <Typography id="keep-mounted-modal-title" variant="h3" component="h2" className='header'>
              booking successful
            </Typography>
            <Typography id="keep-mounted-modal-description">
              We will send an Email with the Booking information.
            </Typography>
            <Button variant='contained' className='btn' onClick={()=>setOpen(false)}>Done</Button>
          </div>

        </Box>
      </Modal>
  );
}

export default ConfirmModal