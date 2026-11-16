import { SubmitEventHandler, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../../api/Users';
import { queryClient } from '../../api/qyeryClient';
import { FormErrors, SignUpSchema } from '../../api/ValidationSchema';

import style from './RegistrationForm.module.scss';

type RegistrationFormProp = {
    onSwitch: () => void;
    onRegisterSuccess: () => void;
}

export const RegistrationForm = ({onSwitch, onRegisterSuccess}: RegistrationFormProp) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [errors, setErrors] = useState<FormErrors>({});

    const registrationMutation = useMutation({
        mutationFn: () => registerUser(email, password, name, surname),
        onSuccess: (data) => {
            if(data.success) {
                onRegisterSuccess();
            }
        },
        onError: (error: any) => {
            setErrors({
                api: error.message || "Произошла непредвиденная ошибка на сервере."
            });
        }
    }, queryClient);

    const handleSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        setErrors({});

        const result = SignUpSchema.safeParse({email, name, surname, password, confirmPassword});

        if(!result.success) {
            const formattedErrors: FormErrors = {};

            result.error.issues.forEach((issue) => {
                const path = issue.path[0] as keyof typeof formattedErrors;
                formattedErrors[path] = issue.message;
            });

            if(formattedErrors.confirmPassword === "Пароли не совпадают") {
                formattedErrors.password = "Пароли не совпадают";
            }

            setErrors(formattedErrors);
            return;
        }       

        registrationMutation.mutate();
    }

    return (
        <form className={style.registrationForm} onSubmit={handleSubmit}>
            <div className={style.registrationForm__wrapper}>
                <span className={style.registrationForm__logo}>маруся</span>
                <div className={style.registrationForm__inputBox}>

                    <input 
                        className={`${style.registrationForm__input} ${style.registrationForm__emailInput} ${errors.email ? style['registrationForm__input--error'] : ''}`} 
                        type="email" 
                        name='email'
                        onChange={(event) => setEmail(event.target.value)}
                        value={email}
                        placeholder="Электронная почта" 
                        required
                    />
                    <input 
                        className={`${style.registrationForm__input} ${style.registrationForm__nameInput} ${errors.name ? style['registrationForm__input--error'] : ''}`}
                        type="text" 
                        name='name'
                        onChange={(event) => setName(event.target.value)}
                        value={name}
                        placeholder="Имя" 
                        required
                    />
                    <input 
                        className={`${style.registrationForm__input} ${style.registrationForm__surnameInput} ${errors.surname ? style['registrationForm__input--error'] : ''}`} 
                        type="text" 
                        name='surname'
                        onChange={(event) => setSurname(event.target.value)}
                        value={surname}
                        placeholder="Фамилия" 
                        required
                    />
                    <input 
                        className={`${style.registrationForm__input} ${style.registrationForm__passInput} ${errors.password ? style['registrationForm__input--error'] : ''}`} 
                        type="password" 
                        name='password'
                        onChange={(event) => setPassword(event.target.value)}
                        value={password}
                        placeholder="Пароль" 
                        required 
                    />    
                    <input 
                        className={`${style.registrationForm__input} ${style.registrationForm__passInput} ${errors.confirmPassword ? style['registrationForm__input--error'] : ''}`} 
                        type="password" 
                        name='confirmPassword'
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        value={confirmPassword}
                        placeholder="Подтвердите пароль" 
                        required
                    />    
                </div>

                {errors.api && <span className={style.registrationForm__errorMessage}>{errors.api}</span>}
                
                <div className={style.registrationForm__buttons}>
                    <button className={style.registrationForm__createBtn} type="submit" disabled={registrationMutation.isPending}>
                        Создать аккаунт
                    </button>
                    <button className={style.registrationForm__haveBtn} type="button" onClick={onSwitch}>
                        У меня есть аккаунт
                    </button>
                </div>
            </div>
        </form>
    );
};