import { SubmitEventHandler, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../../api/Users';
import { queryClient } from '../../api/qyeryClient';

import style from './LoginForm.module.scss'



type LoginFormProp = {
    onSwitch: () => void,
    onClose: () => void,
}

export const LoginForm = ({onSwitch, onClose}: LoginFormProp) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");    

    const loginMutation = useMutation({
        mutationFn: () => loginUser(email, password),
        onSuccess() {
            queryClient.invalidateQueries({queryKey: ['users', 'me']})
            onClose();
        }
    }, queryClient)

    const handleSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        loginMutation.mutate();
    }

    return (
        <form className={style.loginForm} onSubmit={handleSubmit}>
            <div className={style.loginForm__wrapper}>
                <span className={style.loginForm__logo}>маруся</span>
                <div className={style.loginForm__inputBox}>
                    <input
                         className={style.loginForm__emailInput} 
                         type="email" 
                         name='email' 
                         placeholder="Электронная почта" 
                         onChange={(event) => setEmail(event.target.value)}
                         value={email}
                         required
                    />
                    <input 
                        className={style.loginForm__passwordInput} 
                        type="password" 
                        placeholder="Пароль" 
                        name='password'
                        onChange={(event) => setPassword(event.target.value)}
                        value={password}
                        required 
                    />    
                </div>
                {loginMutation.error && <span>{loginMutation.error.message}</span>}
                <div className={style.loginForm__buttons}>
                    <button className={style.loginForm__loginBtn} type="submit" disabled={loginMutation.isPending}>Войти</button>
                    <button className={style.loginForm__registerBtn} type="button" onClick={onSwitch}>Регистрация</button>
                </div>
            </div>
        </form>
    )
}