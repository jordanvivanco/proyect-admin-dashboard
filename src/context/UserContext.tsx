import { createContext } from "react";
export interface UserProps {
    user: boolean | undefined;
    setUser: (user: boolean) => void;
}
export const UserContext = createContext<UserProps>({
    user: undefined,
    setUser: () => {},
});
