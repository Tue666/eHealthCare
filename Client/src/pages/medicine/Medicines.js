import { useState, useEffect, forwardRef } from 'react';
import MaterialTable from '@material-table/core';
import { Container, Typography, Alert } from '@mui/material';
import { AddCircle, Edit, Delete } from '@mui/icons-material';
import { useConfirm } from 'material-ui-confirm';

// apis
import medicineApi from '../../apis/medicineApi';
// components
import Page from '../../components/Page';
// hooks
import useSnackbar from '../../hooks/useSnackbar';
// utils
import { toVND } from '../../utils/formatMoney';

const columns = [
    {
        field: 'name',
        title: 'Medicine name',
        validate: row => row.name === '' ? { isValid: false, helperText: 'This field is required!' } : true
    },
    {
        field: 'quantity',
        title: 'Quantity left',
        validate: row => parseInt(row.quantity) < 0 ? { isValid: false, helperText: 'Quantity can not be nagative' } : true
    },
    {
        field: 'price',
        title: 'Medicine Price',
        render: row => <Typography variant='subtitle2'>{toVND(row.price)}</Typography>,
        validate: row => parseInt(row.price) < 0 ? { isValid: false, helperText: 'Price can not be nagative' } : true
    }
];

const options = {
    selection: true,
    addRowPosition: 'first',
    actionsColumnIndex: -1
};

const icons = {
    Add: forwardRef((props, ref) => <AddCircle color='primary' {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit color='warning' {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <Delete color='error' {...props} ref={ref} />)
};

const Medicines = () => {
    const [medicines, setMedicines] = useState(null);
    const { setSnackbar } = useSnackbar();
    const confirm = useConfirm();
    useEffect(() => {
        const getMedicines = async () => {
            const medicines = await medicineApi.findAll();
            setMedicines(medicines);
        };
        getMedicines();
    }, []);
    const handleInsertMedicine = async newData => {
        const res = await medicineApi.insertMedicine(newData);
        const { status, message, medicine } = res;
        if (status === 'success') {
            const newMedicines = [...medicines, medicine];
            setMedicines(newMedicines);
        }
        setSnackbar({
            isOpen: true,
            type: status,
            message: message,
            anchor: 'bottom-center'
        });
    };
    const handleEditMedicine = async (newData, oldData) => {
        const { _id, name, price, quantity } = newData;
        const res = await medicineApi.editMedicine(_id, {
            name,
            price,
            quantity
        });
        const { status, message, medicine } = res;
        if (status === 'success') {
            const { _id, ...newBody } = medicine;
            const newMedicines = medicines.map(medicine => medicine._id === _id ? { ...medicine, ...newBody } : medicine);
            setMedicines(newMedicines);
        }
        setSnackbar({
            isOpen: true,
            type: status,
            message: message,
            anchor: 'bottom-center'
        });
    };
    const handleDeleteOne = async oldData => {
        const { _id } = oldData;
        const res = await medicineApi.deleteById(_id);
        const { status, message, medicineId } = res;
        if (status === 'success') {
            const newMedicines = medicines.filter(medicine => medicine._id !== medicineId);
            setMedicines(newMedicines);
        }
        setSnackbar({
            isOpen: true,
            type: status,
            message: message,
            anchor: 'bottom-center'
        });
    };
    const handleDeleteMultiple = async deleteItems => {
        try {
            await confirm({
                title: 'Are you sure you wanna remove all medicine selected?',
                content: <Alert severity='error'>Medicines can be restore in trash!</Alert>,
                confirmationButtonProps: {
                    color: 'error'
                }
            });
            const deleteIds = deleteItems.map(item => item._id);
            const res = await medicineApi.deleteMultiple(deleteIds);
            const { status, message, medicineIds } = res;
            if (status === 'success') {
                const newMedicines = medicines.filter(medicine => !medicineIds.includes(medicine._id));
                setMedicines(newMedicines);
            }
            setSnackbar({
                isOpen: true,
                type: status,
                message: message,
                anchor: 'bottom-center'
            });
        } catch (error) {

        }
    };
    return (
        <Page title='Medicines | E-Health Care'>
            <Container>
                <Typography variant='h6' sx={{ mb: 3 }}>All Medicines</Typography>
                {medicines && (
                    <MaterialTable
                        title='Medicines'
                        columns={columns}
                        data={medicines}
                        options={options}
                        icons={icons}
                        editable={{
                            onRowAdd: handleInsertMedicine,
                            onRowUpdate: handleEditMedicine,
                            onRowDelete: handleDeleteOne
                        }}
                        actions={[
                            {
                                icon: () => <Delete color='error' />,
                                tooltip: 'Delete all checked',
                                onClick: (evt, rows) => handleDeleteMultiple(rows)
                            }
                        ]}
                    />
                )}
                {!medicines && 'Loading...'}
            </Container>
        </Page>
    );
};

export default Medicines;
