import { useEffect, useState } from 'react';
import { ICourse } from '../../models/Models';
import { Button } from "@mui/material";
import { addDoc, collection, onSnapshot, doc, getDoc, updateDoc, deleteDoc, QuerySnapshot } from 'firebase/firestore';
import { db } from '../../Firebase';

interface Props {
    idcurrent: string
}

const CourseForm: React.FC<Props> = ({ idcurrent }) => {

    const [currentstateId, setCurrentstateId] = useState("");

    const valuesinitial: ICourse = {
        id: "",
        name: ''
    }
    const [values, setValues] = useState<ICourse>(valuesinitial);

    const handle = (e: React.ChangeEvent<HTMLInputElement>, max: number) => {
        const { name, value } = e.target;
        if (e.target.value.length <= max) {
            setValues({ ...values, [name]: value });
        }
    }

    const WriteCourse = async () => {

        if (currentstateId === "") {
            await addDoc(collection(db, "courses"), {
                name: values.name
            });
            setValues(valuesinitial);
        } else {
            const docRef = doc(db, "courses", idcurrent)
            await updateDoc(docRef, {
                name: values.name
            });
            setValues(valuesinitial);
            setCurrentstateId("");
        }
    }

    const getCourseById = async (id: string) => {
        const itemRef = doc(db, 'courses', id);
        const itemDoc = await getDoc(itemRef);
        const item = {
            id: itemDoc.id,
            ...itemDoc.data(),
        } as ICourse;
        setValues(item);
    }

    useEffect(() => {
        if (idcurrent === "") {
            setValues({ ...valuesinitial });
        } else {
            setCurrentstateId(idcurrent);
            getCourseById(idcurrent);
        }
    }, [idcurrent]);


    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <h3>Courses Form</h3>
            <label>Name</label>
            <input type="text" name='name' className='form-control' onChange={e => handle(e, 25)} value={values.name} />
            <Button onClick={() => WriteCourse()}>{currentstateId === "" ? "CREATE" : "UPDATE"}</Button>
        </form>
    )
}

export const CourseCrud = () => {
    const clientstate: ICourse = {
        id: '',
        name: ''
    };
    const [currentId, setCurrentId] = useState("");

    const propertyNames = Object.getOwnPropertyNames(clientstate);

    const [collect, setCollect] = useState<Array<ICourse> | null>(null)

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'courses'), (snapshot: QuerySnapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as ICourse[];
            setCollect(data);
        });

        return () => unsubscribe();
    }, [db]);


    const remove = async (id: string) => {
        await deleteDoc(doc(db, "courses", id));
    }


    return (
        <div>
            <CourseForm idcurrent={currentId} />
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
                        collect?.map((course: ICourse) => (
                            <CourseRow course={course} key={course.id}>
                                <button className="btn btn-primary" onClick={() => setCurrentId(course.id)}>Update</button>
                                <button className="btn btn-danger" onClick={() => remove(course.id)}>Remove</button>
                            </CourseRow>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

type PropsCourse = {
    course: ICourse;
    children: JSX.Element[];
}

export const CourseRow: React.FC<PropsCourse> = ({ course, children }) => {
    return (
        <tr>
            <th scope="row">{course.id}</th>
            <td>{course.name}</td>
            <th>
                {
                    children
                }
            </th>
        </tr>
    )
}

