import { Box, Button, Modal, Typography } from '@mui/material'
import { DeleteFilghtModalInterface } from '../../interfaces/DeleteFilghtModal.interface';
import './DeleteFilght.scss'
import { deleteFlightById } from '../../services/Flight.service';
import { toast } from 'react-toastify';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: '40px',

};
const DeleteFilghtModal = ({ open, setOpen, handleClick, id }: DeleteFilghtModalInterface) => {

    const handleDeleteFilght = () => {
        deleteFlightById(id).then((res) => {
            handleClick()
            toast.success("Flight Deleted Successfully!!!", { autoClose: 4000 });
            setOpen(false)
        }).catch((err) => {
            toast.error(err?.message, { autoClose: 4000 });
        })
    }
    return (
        <Modal
            className='delete-modal-container'
            keepMounted
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >
            <Box sx={style}>
                <div className='modal-container'>
                    <Typography id="keep-mounted-modal-description ">
                        Are you sure you want to delete ?
                    </Typography>
                    <div className='btn-container'>

                        <Button variant='contained' className='btn' onClick={() => setOpen(false)}>Close</Button>
                        <Button variant='contained' color="error" className='delete-btn' onClick={() => handleDeleteFilght()}>Delete</Button>
                    </div>
                </div>

            </Box>
        </Modal>
    )
}

export default DeleteFilghtModal