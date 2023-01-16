import TableDialog from "./TableDialog";
import {Button} from "@mui/material";
import {useState} from "react";
import GridOnRoundedIcon from "@mui/icons-material/GridOnRounded";

const AddNewTable = ()=>{
    const [isTableDialogOpen, setIsTableDialogOpen] = useState(false);
    const toggleTableDialog = () => setIsTableDialogOpen((isOpen) => !isOpen);
    const closeTableDialog = () => setIsTableDialogOpen(false);

    return (<>
        <TableDialog
            isOpen={isTableDialogOpen}
            handleClose={closeTableDialog}
        />
        <Button
            variant="contained"
            startIcon={<GridOnRoundedIcon />}
            onClick={toggleTableDialog}
        >
            Create new Custom Model
        </Button>
    </>)
}


export default AddNewTable;
