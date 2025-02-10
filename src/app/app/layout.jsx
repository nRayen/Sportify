import { SessionProvider } from "../../hooks/useSession";

const AppLayout = ({ children }) => {

    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
};

export default AppLayout
