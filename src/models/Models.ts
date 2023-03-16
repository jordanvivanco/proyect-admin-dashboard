import { DocumentData, Timestamp } from "firebase/firestore";

export interface IMessage extends DocumentData {
    id: string;
    body: string;
    addressee: string;
    me: string;
    date: Timestamp;
}

export interface IClient extends DocumentData {
    id: string;
    name: string;
    lastname: string;
    dni: number;
    phone: number;
    age: number;
    user_id: string;
    password: string;
}

export interface IUser extends DocumentData {
    id: string;
    displayname: string;
    email: string;
    photourl: string;
}

export interface IInstructor extends DocumentData {
    id: string;
    name: string;
    lastname: string;
    dni: number;
    photodni: string;
    dateofbirth: Timestamp;
    license: number;
    photoc4: string;
}

export interface ICourse extends DocumentData {
    id: string;
    name: string;
}

export interface IPromotion extends DocumentData {
    id: string;
    name: string;
    image: string;
    discount: number;
    start_date: Timestamp;
    last_date: Timestamp;
}

export interface IPackage extends DocumentData {
    id: string;
    name: string;
    hours: number;
    price: number;
}

export interface IProduct extends DocumentData {
    id: string;
    name: string;
    mark: string;
    pricebefore: number;
    price: number;
    source: string;
    desc: number;
}

export interface ISchedule extends DocumentData {
    id: string;
    shift: string;
    days: Date[];
    hours: number;
}

export interface IReservation extends DocumentData {
    id: string;
    date: Date;
    client_id: string;
    schedule: ISchedule;
}

export interface IVehicle extends DocumentData {
    id: string;
    plaque: string;
    color: string;
    type: string;
    transmission: string;
}

export interface IVoucher extends DocumentData {
    id: string;
    client_id: string;
    photo: string;
    date: Date;
}