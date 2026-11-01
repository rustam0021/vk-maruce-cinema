import { Dialog } from '@headlessui/react';
import { ModalCloseIcon } from '../../styles/icons/ModalCloseIcon/ModalCloseIcon';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import { RegistrationForm } from '../../components/RegistrationForm/RegistrationForm';
import { SuccessRegView } from '../../components/SuccessRegView/SuccessRegView';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { closeAuthModal, setAuthType } from '../../store/slices/authSlice';


import style from "./AuthForm.module.scss"


export const AuthForm = () => {
    const dispatch = useAppDispatch();

    const isOpen = useAppSelector((state) => state.auth.isAuthModalOpen);
    const authType = useAppSelector((state) => state.auth.authMode)

    const handleClose = () => {
        dispatch(closeAuthModal());
        setTimeout(() => dispatch(setAuthType('login')), 300); 
    };

    if(!isOpen) return null;

    return (
        <div className={style.authForm}>
            <Dialog open={isOpen} onClose={handleClose}>
                <div className={style.authForm__bg}>
                    <Dialog.Panel className={style.authForm__popup}>

                        {authType === 'login' && (
                            <LoginForm 
                                onSwitch={() => dispatch(setAuthType('registration'))} 
                                onClose={handleClose}
                            />
                        )}

                        {authType === 'registration' && (
                            <RegistrationForm 
                                onSwitch={() => dispatch(setAuthType('login'))}
                                onRegisterSuccess={() => dispatch(setAuthType('success'))}
                            />
                        )}

                        {authType === 'success' && (
                            <SuccessRegView onGoToLogin={() => dispatch(setAuthType('login'))} />
                        )}

                        <button className={style.authForm__popupClose} onClick={() => dispatch(closeAuthModal())}>
                            <ModalCloseIcon />
                        </button>

                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    );
};