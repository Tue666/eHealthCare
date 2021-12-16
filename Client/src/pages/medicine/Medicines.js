import { forwardRef } from 'react';
import MaterialTable from '@material-table/core';
import { Container, Typography } from '@mui/material';
import { AddCircle, Edit, Delete } from '@mui/icons-material';

// components
import Page from '../../components/Page';
// utils
import { toVND } from '../../utils/formatMoney';

const columns = [
    {
        field: 'name',
        title: 'Medicine name'
    },
    {
        field: 'quantity',
        title: 'Quantity left'
    },
    {
        field: 'price',
        title: 'Medicine Price',
        render: row => <Typography variant='subtitle2'>{toVND(row.price)}</Typography>
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

const medicines = [
    { id: 1, name: 'ahublaka', quantity: 50, price: 981273 }
];

const Medicines = () => {
    return (
        <Page title='Medicines | E-Health Care'>
            <Container>
                <Typography variant='h6' sx={{ mb: 3 }}>All Medicines</Typography>
                <MaterialTable
                    title='Medicines'
                    columns={columns}
                    data={medicines}
                    options={options}
                    icons={icons}
                    editable={{
                        onRowAdd: newData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    resolve();
                                }, 1000);
                            }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    resolve();
                                }, 1000);
                            }),
                        onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    resolve();
                                }, 1000);
                            })
                    }}
                />
            </Container>
        </Page>
    );
};

export default Medicines;
