import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';

const propTypes = {
    prescription: PropTypes.array.isRequired
};

const columns = [
    {
        field: 'medicineName',
        headerName: 'Medicine Name',
        flex: 3
    },
    {
        field: 'amount',
        headerName: 'Amount',
        flex: 1
    },
    {
        field: 'time',
        headerName: 'Time',
        flex: 1
    }
];

const Prescription = ({ prescription }) => {
    console.log(prescription);
    return (
        <DataGrid
            autoHeight
            autoPageSize
            rows={prescription}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            getRowId={row => row._id}
        />
    );
};

Prescription.propTypes = propTypes;

export default Prescription;
