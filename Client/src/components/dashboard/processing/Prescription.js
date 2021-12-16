import PropTypes from 'prop-types';
import MaterialTable from '@material-table/core';
import { Typography } from '@mui/material';

// utils
import { toVND } from '../../../utils/formatMoney';

const propTypes = {
    prescription: PropTypes.array.isRequired
};

const columns = [
    {
        field: 'medicineName',
        title: 'Medicine Name'
    },
    {
        field: 'amount',
        title: 'Amount'
    },
    {
        field: 'time',
        title: 'Time'
    },
    {
        field: 'medicinePrice',
        title: 'Medicine Price',
        render: row => <Typography variant='subtitle2'>{toVND(row.medicinePrice)}</Typography>
    }
];

const options = {
    addRowPosition: 'first',
    actionsColumnIndex: -1
};

const Prescription = ({ prescription }) => {
    return (
        <MaterialTable
            title='Medicines'
            columns={columns}
            data={prescription}
            options={options}
        />
    );
};

Prescription.propTypes = propTypes;

export default Prescription;
