import { collection, DocumentData, onSnapshot } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../Firebase";
import { IMessage } from "../../models/Models";
import "./ChatOnly.css";

export const ChatOnly = () => {
    const [collect, setCollect] = useState<Array<IMessage> | null>(null);
    const docs: Array<IMessage> = [];

    onSnapshot(
        collection(db, "messages"), (snapshot) => {
            snapshot.forEach((doc: DocumentData) => {
                docs?.push({ ...doc.data(), id: doc.id });
                setCollect(docs);
                console.log(docs);
            })
        }
    )

    return (
        <div>
            {collect?.map((message: IMessage) => (
                <Message key={message.id} message={message} />
            ))}
        </div>
    )
}

type Props = {
    message: IMessage;
}

export const DateString = (date: Date): string => {
    const m = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let datestring = m[date.getMonth()] + " "  + date.getDate() + ", " + date.getFullYear() + " - " + date.getHours() + ":" + date.getMinutes() + " " + (date.getHours() < 12 ? "a.m" : "p.m");
    return datestring;
}

export const Message: React.FC<Props> = ({ message }) => {
    const date: Date = new Date(message.date.toDate());
    return (
        <div className="bg-primary shadow p-3 rounded text-white message">
            <label style={{fontSize: "14px"}}><small>{DateString(date)}</small></label>
            <p>{message.body}</p>
        </div>
    )
}

