import { useState } from "react"
import { UserContext } from "./UserContext"

type Props = {
    children: JSX.Element | JSX.Element[]
}

export const UserProvider = ({ children }: Props) => {
    const [user, setUser] = useState<boolean>();
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}
