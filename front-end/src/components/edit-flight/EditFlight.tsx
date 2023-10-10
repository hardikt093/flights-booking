import { Dialog, Modal } from "@mui/material"
import AddFlight from "../add-flight/AddFlight";
import { FlightDataInterface } from "../../interfaces/Flight.interface";
import "./EditFlight.scss";

type EditFlightProps = {
    isEdit: boolean;
    setIsEdit: (value: boolean) => void
    editData?: FlightDataInterface
}


const EditFlight = ({ isEdit, editData, setIsEdit }: EditFlightProps) => {
    return (
        <>
            <Modal open={isEdit} onClose={() => setIsEdit(false)} className="edit-flight-container" aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description">
                <AddFlight flightData={editData} setIsEdit={setIsEdit} />
            </Modal>
        </>
    )
};

export default EditFlight;