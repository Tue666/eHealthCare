import PropTypes from 'prop-types';
import MaterialTable from '@material-table/core';
import { Stack, Typography } from '@mui/material';

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

const Prescription = ({ prescription, insurance }) => {
    const guessPrice = prescription.reduce((total, medicine) => total + medicine.medicinePrice, 0);
    const insuranceType = insurance?.title || 'No insurance';
    const percentPay = insurance?.percentPay || 0;
    const maxPay = insurance?.moneyPay || 0;
    const calculatedPay = Math.round(guessPrice * percentPay / 100);
    const moneyPay = calculatedPay > maxPay ? maxPay : calculatedPay;
    return (
        <Stack spacing={1}>
            <MaterialTable
                title='Medicines'
                columns={columns}
                data={prescription}
                options={options}
            />
            <Stack direction='row' spacing={1}>
                <Typography variant='subtitle2' sx={{ fontWeight: 'bold' }}>Guess price:</Typography>
                <Typography variant='subtitle2'>{toVND(guessPrice)}</Typography>
            </Stack>
            <Stack direction='row' spacing={1}>
                <Typography variant='subtitle2' sx={{ fontWeight: 'bold' }}>Insurance:</Typography>
                <Typography variant='subtitle2'>{`${insuranceType} ( Pay: ${percentPay}% ) *Maximum pay: ${toVND(maxPay)}`}</Typography>
            </Stack>
            <Stack direction='row' spacing={1}>
                <Typography variant='subtitle2' sx={{ fontWeight: 'bold' }}>Total price:</Typography>
                <Typography variant='subtitle2' sx={{ color: 'red' }}>{`${toVND(guessPrice)} - ${toVND(moneyPay)} = ${toVND(guessPrice - moneyPay)}`}</Typography>
            </Stack>
        </Stack>
    );
};

Prescription.propTypes = propTypes;

export default Prescription;
