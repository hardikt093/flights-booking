import { Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import AllImages from '../../constant/images'
import { FlightCardDetailsInterface } from '../../interfaces/FlightCardDetails.Interface'
import { deleteFlightById } from '../../services/Flight.service'
import ConfirmModal from '../ConfirmModal/ConfirmModal'
import { bookFlight } from '../../services/Booking.service'
import { useNavigate } from 'react-router-dom'
import EditFlight from '../edit-flight/EditFlight'
import { FlightDataInterface } from '../../interfaces/Flight.interface'
import { toast } from 'react-toastify'
import DeleteFilghtModal from '../delete-flight/DeleteFilght'
import dayjs, { Dayjs } from 'dayjs'


const FlightCardDetails = ({ data, getData }: FlightCardDetailsInterface) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const token = localStorage.getItem('token');
  const userDetails = JSON.parse(localStorage.getItem("userDetails")!);
  const [isEditFlight, setIsEditFlight] = useState<boolean>(false);
  const [editFlightData, setEditFlightData] = useState<FlightDataInterface>();
  const [id, setId] = useState('')
  const [deleteModal, setDeleteModal] = useState(false)

  const handleModalOpen = (id: string) => {
    if (token) {

      bookFlight(id)
      setOpen(true)
    } else {
      navigate('/login')
    }
  }

  const handleDeleteFlight = (id: string) => {
    setId(id)
    setDeleteModal(true);
  }
  return (
    <>
      <div className="infoRoot">
        <Typography className="heading">{data?.name}</Typography>
        <div className="detail">
          <Typography>
            <img src={AllImages.userLogo} />
            Jimmy Paul
          </Typography>
          <Typography>
            <img src={AllImages.calendar} />
            {dayjs(data?.departure, "DD/MM/YYYY").format("DD MMM YYYY")}
          </Typography>
          <Typography>
            <img src={AllImages.map} />
            {data?.from}
          </Typography>
        </div>
        <Typography className="description">
          Lörem ipsum fotobomba minynat. Göra en pudel masar fadogon heteroktigt
          holatt.
        </Typography>
        <div className="btn">
          {
            (token && userDetails?.userRole?.name === 'flight') ? <>
              <Button variant="contained" onClick={() => {
                setIsEditFlight(true);
                setEditFlightData(data);
              }}
              >
                Edit
              </Button>
              <Button variant="contained" onClick={() => handleDeleteFlight(data?.id)}>Delete</Button>
            </> :
              <Button variant="contained" onClick={() => handleModalOpen(data?.id)}
                endIcon={<img src={AllImages.greater} />}
              >Book Now
              </Button>

          }

        </div>
        {true && <ConfirmModal open={open} setOpen={setOpen} />}
      </div>
      {isEditFlight &&
        <EditFlight
          isEdit={isEditFlight}
          setIsEdit={(value: boolean) => { setIsEditFlight(value); getData() }}
          editData={editFlightData}
        />}
      {true && <DeleteFilghtModal open={deleteModal} setOpen={setDeleteModal} id={id} handleClick={() => { getData() }} />}
    </>
  )
}

export default FlightCardDetails