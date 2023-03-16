import { useEffect, useState } from 'react';
import { IInstructor } from '../../models/Models';
import { Button } from "@mui/material";
import { addDoc, collection, onSnapshot, doc, getDoc, updateDoc, deleteDoc, QuerySnapshot, Timestamp } from 'firebase/firestore';
import { db } from '../../Firebase';
import { DateString } from '../Chat/ChatOnly';

interface Props {
    idcurrent: string
}

const InstructorForm: React.FC<Props> = ({ idcurrent }) => {
    const [startDate, setStartDate] = useState<string>('');
    const [currentstateId, setCurrentstateId] = useState("");

    const valuesinitial: IInstructor = {
        id: "",
        name: "",
        lastname: "",
        dni: 0,
        photodni: "",
        dateofbirth: new Timestamp(0, 0),
        license: 0,
        photoc4: "",
    }
    const [values, setValues] = useState<IInstructor>(valuesinitial);

    const handle = (e: React.ChangeEvent<HTMLInputElement>, max: number) => {
        const { name, value } = e.target;
        if (e.target.value.length <= max) {
            setValues({ ...values, [name]: value });
        }
    }

    //setUTCHours(0)) : value
    const WriteInstructor = async () => {

        if (currentstateId === "") {
            await addDoc(collection(db, "instructors"), {
                name: values.name,
                lastname: values.lastname,
                dni: values.dni,
                photodni: values.photodni,
                dateofbirth: Timestamp.fromDate(new Date(startDate.slice(0,10)+"T00:00:00.000Z")),
                license: values.license,
                photoc4: values.photoc4
            });
            setValues(valuesinitial);
            setStartDate("");
        } else {
            const docRef = doc(db, "instructors", idcurrent)
            await updateDoc(docRef, {
                name: values.name,
                lastname: values.lastname,
                dni: values.dni,
                photodni: values.photodni,
                dateofbirth: Timestamp.fromDate(new Date(startDate.slice(0,10)+"T00:00:00.000Z")),
                license: values.license,
                photoc4: values.photoc4
            });
            setValues(valuesinitial);
            setCurrentstateId("");
            setStartDate("");
        }
    }

    const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStartDate(event.target.value);
    };

    const getInstructorById = async (id: string) => {
        const itemRef = doc(db, 'instructors', id);
        const itemDoc = await getDoc(itemRef);
        const item = {
            id: itemDoc.id,
            ...itemDoc.data(),
        } as IInstructor;
        setValues(item);
        setStartDate(item.dateofbirth.toDate().toISOString().slice(0, 10));
    } 

    useEffect(() => {
        if (idcurrent === "") {
            setValues({ ...valuesinitial });
            setStartDate("");
        } else {
            setCurrentstateId(idcurrent);
            getInstructorById(idcurrent);
        }
    }, [idcurrent]);


    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <h3>Instructors Form</h3>
            <label>Name</label>
            <input type="text" name='name' className='form-control' onChange={e => handle(e, 25)} value={values.name} />
            <label>Last Name</label>
            <input type="text" name='lastname' className='form-control' onChange={e => handle(e, 25)} value={values.lastname} />
            <label>Dni</label>
            <input type="text" name='dni' className='form-control' onChange={e => handle(e, 25)} value={values.dni} />
            <label>Photo Dni</label>
            <input type="text" name='photodni' className='form-control' onChange={e => handle(e, 25)} value={values.photodni} />
            <label>Date Birth</label>
            <input type="date" name='dateofbirth' className='form-control' onChange={handleStartDateChange} value={startDate} />
            <label>License</label>
            <input type="text" name='license' className='form-control' onChange={e => handle(e, 25)} value={values.license} />
            <label>Photo C4</label>
            <input type="text" name='photoc4' className='form-control' onChange={e => handle(e, 25)} value={values.photoc4} />
            <Button onClick={() => WriteInstructor()}>{currentstateId === "" ? "CREATE" : "UPDATE"}</Button>
        </form>
    )
}

export const InstructorCrud = () => {
    const clientstate: IInstructor = {
        id: "",
        name: "",
        lastname: "",
        dni: 0,
        photodni: "",
        dateofbirth: new Timestamp(0, 0),
        license: 0,
        photoc4: "",

    };
    const [currentId, setCurrentId] = useState("");

    const propertyNames = Object.getOwnPropertyNames(clientstate);

    const [collect, setCollect] = useState<Array<IInstructor> | null>(null)

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'instructors'), (snapshot: QuerySnapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as IInstructor[];
            setCollect(data);
        });

        return () => unsubscribe();
    }, [db]);


    const remove = async (id: string) => {
        await deleteDoc(doc(db, "instructors", id));
    }


    return (
        <div>
            <InstructorForm idcurrent={currentId} />
            <table className="table">
                <thead>
                    <tr>
                        {
                            propertyNames.map((propertyName) => (
                                <th key={propertyName} scope="col">{propertyName.toUpperCase()}</th>
                            ))
                        }
                        <th scope="col">ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        collect?.map((instructor: IInstructor) => (
                            <InstructorRow instructor={instructor} key={instructor.id}>
                                <button className="btn btn-primary" onClick={() => setCurrentId(instructor.id)}>Update</button>
                                <button className="btn btn-danger" onClick={() => remove(instructor.id)}>Remove</button>
                            </InstructorRow>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

type PropsInstructor = {
    instructor: IInstructor;
    children: JSX.Element[];
}

export const InstructorRow: React.FC<PropsInstructor> = ({ instructor, children }) => {
    const date: Date = new Date(instructor.dateofbirth.toDate());
    return (
        <tr>
            <th scope="row">{instructor.id}</th>
            <td>{instructor.name}</td>
            <td>{instructor.lastname}</td>
            <td>{instructor.dni}</td>
            <td>{instructor.photodni}</td>
            <td>{DateString(date)}</td>
            <td>{instructor.license}</td>
            <td>{instructor.photoc4}</td>
            <th>
                {
                    children
                }
            </th>
        </tr>
    )
}

