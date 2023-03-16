import { useEffect, useState } from 'react';
import { IClient } from '../../models/Models';
import { Button, TextField, Typography, Box, Modal, Alert, ButtonGroup, IconButton } from "@mui/material";
import { addDoc, collection, onSnapshot, doc, getDoc, updateDoc, deleteDoc, QuerySnapshot } from 'firebase/firestore';
import { db } from '../../Firebase';
import { ChangeEvent } from 'react';
import "firebase/database";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Link, NavLink, Route, Routes } from 'react-router-dom';

interface Props {
    idcurrent: string
}

const ClientForm = ({ idcurrent }: Props) => {

    const [currentstateId, setCurrentstateId] = useState("");

    const valuesinitial: IClient = {
        id: "",
        name: '',
        lastname: '',
        dni: 0,
        phone: 0,
        age: 0,
        user_id: '',
        password: ''
    }
    const [values, setValues] = useState<IClient>(valuesinitial);

    const handle = <T extends HTMLInputElement | HTMLTextAreaElement>(e: ChangeEvent<T>, max: number) => {
        const { name, value } = e.target;
        if (e.target.value.length <= max) {
            setValues({ ...values, [name]: value });
        }
    }

    const CreateClient = async () => {
        if (currentstateId === "") {
            await addDoc(collection(db, "clients"), {
                name: values.name,
                lastname: values.lastname,
                dni: values.dni,
                phone: values.phone,
                age: values.age,
                user_id: values.user_id,
                password: values.password
            });
            setValues(valuesinitial);
        } else {
            const docRef = doc(db, "clients", idcurrent)
            await updateDoc(docRef, {
                name: values.name,
                lastname: values.lastname,
                dni: values.dni,
                phone: values.phone,
                age: values.age,
                user_id: values.user_id,
                password: values.password
            });
            setValues(valuesinitial);
            setCurrentstateId("");
        }
    }

    const getClientById = async (id: string) => {
        const itemRef = doc(db, 'clients', id);
        const itemDoc = await getDoc(itemRef);
        const item = {
            id: itemDoc.id,
            ...itemDoc.data(),
        } as IClient;
        setValues(item);
    }

    useEffect(() => {
        if (idcurrent === "") {
            setValues({ ...valuesinitial });
        } else {
            setCurrentstateId(idcurrent);
            getClientById(idcurrent);
        }
    }, [idcurrent]);

    const textfield = {
        width: "100%",
        height: "0px",
        marginBottom: "50px",
        marginTop: "30px"
    }

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <Typography sx={{ position: "fixed", top: 0 }} variant="h4">Create Client</Typography>
            <TextField type="text" name='name' label='NAME' sx={textfield} onChange={e => handle(e, 25)} value={values.name} />
            <TextField type="text" name="lastname" label='LAST NAME' sx={textfield} onChange={e => handle(e, 25)} value={values.lastname} />
            <TextField type="number" name="dni" label='DNI' sx={textfield} onChange={e => handle(e, 8)} value={values.dni} />
            <TextField type="number" name="phone" label='PHONE' sx={textfield} onChange={e => handle(e, 9)} value={values.phone} />
            <TextField type="number" name="age" label='AGE' sx={textfield} onChange={e => handle(e, 3)} value={values.age} />
            <TextField type="text" name="user_id" label='USER ID' sx={textfield} onChange={e => handle(e, 15)} value={values.user_id} />
            <TextField type="password" name="password" label='PASSWORD' sx={textfield} onChange={e => handle(e, 15)} value={values.password} />
            <Box sx={{ paddingTop: "30px" }}>
                <Link to="/dashboard/client">
                    <ButtonGroup variant="contained" aria-label="outlined primary button group" sx={{ width: "100%" }}>
                        <Button onClick={() => CreateClient()} sx={{ width: "50%" }}>Create</Button>
                        <Button sx={{ width: "50%" }}>Cancel</Button>
                    </ButtonGroup>
                </Link>
            </Box>
        </form>
    )
}

export const ClientCrud = () => {
    const [collect, setCollect] = useState<IClient[]>([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'clients'), (snapshot: QuerySnapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })) as IClient[];
            setCollect(data);
            console.log(data);
        });
        return () => unsubscribe();

    }, [db]);

    const [selectedRows, setSelectedRows] = useState<string[]>([]);

    const remove = async (id: string) => {
        await deleteDoc(doc(db, "clients", id));
    }

    const handleDeleteRow = (uids: string[]) => {
        if (uids.length !== -1) {
            uids.map((id: string) => {
                remove(id);
            })
        }

    }

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID',
            width: 90
        },
        {
            field: 'name',
            headerName: 'Name',
            width: 150
        },
        {
            field: 'lastname',
            headerName: 'Last name',
            width: 150
        },
        {
            field: 'dni',
            headerName: 'Dni',
            width: 110
        },
        {
            field: 'phone',
            headerName: 'Phone',
            width: 160
        },
        {
            field: 'age',
            headerName: 'Age',
            width: 60
        },
        {
            field: 'user_id',
            headerName: 'User Id',
            width: 150
        },
        {
            field: 'password',
            headerName: 'Password',
            width: 150
        },
        {
            field: 'edit',
            headerName: 'Edit',
            width: 150,
            renderCell: (params) => (
                <NavLink to={"update/" + params.row.id as string}>
                    <IconButton onClick={() => {setCurrentId(params.row.id as string); handleOpen()}}>
                        E
                    </IconButton>
                </NavLink>            
            ),
        }
    ];

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "400px",
        height: "600px",
        overflow: "scroll",
        padding: "20px 20px 20px 20px",
        bgcolor: 'background.paper',
        boxShadow: 24,
    };

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [currentId, setCurrentId] = useState("");

    return (
        <Box>
            <Box>
                <NavLink to="create">
                    <Button onClick={() => handleOpen()}>Create Client</Button>
                </NavLink>
                <Button onClick={() => handleDeleteRow(selectedRows)}>Deletes Client {selectedRows.length}</Button>
            </Box>
            <DataGrid
                sx={{ height: "500px" }}
                rows={collect}
                columns={columns}
                getRowId={(row) => row.id}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                checkboxSelection
                disableRowSelectionOnClick
                onRowSelectionModelChange={(newSelection) => {
                    setSelectedRows(newSelection as string[]);
                }}
                pageSizeOptions={[10]}
            />
            <Box>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Routes>
                            <Route path="create" element={<ClientForm  idcurrent={currentId}/>} />
                            <Route path="update/:clientid" element={<ClientForm  idcurrent={currentId}/>} />
                        </Routes>
                        <Alert onClose={() => handleClose()}>Client Created Successfully! closed now</Alert>
                    </Box>
                </Modal>

            </Box>
        </Box>
    )
}
