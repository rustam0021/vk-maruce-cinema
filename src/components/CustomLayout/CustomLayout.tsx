import { FC } from "react";
import { Header } from "../Header/Header";
import { Outlet } from "react-router-dom"
import { Footer } from "../Footer/Footer";
import { AuthForm } from "../AuthForm/AuthForm";
import { TrailerModal } from "../TrailerModal/TrailerModal";


export type AuthContextType = {
    openAuthModal: () => void;
    closeAuthModal: () => void;
};

    const CustomLayout: FC = () => {

        return (
            <>
                <Header />
                <main className="main-content">
                    <Outlet />
                </main>
                <Footer />
                <AuthForm />
                <TrailerModal />
            </>
        )
    }

export default CustomLayout;