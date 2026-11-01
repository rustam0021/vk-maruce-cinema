import style from './SuccessRegView.module.scss';

type SuccessRegViewProp = {
    onGoToLogin: () => void;
}

export const SuccessRegView = ({ onGoToLogin }: SuccessRegViewProp) => {
    return (
        <div className={style.successReg}>
            <span className={style.successReg__logo}>маруся</span>
            <div className={style.successReg__content}>
                <h2 className={style.successReg__title}>Регистрация завершена</h2>
                <p className={style.successReg__text}>
                    Используйте вашу электронную почту для входа
                </p>
                <button 
                    className={style.successReg__btn} 
                    type="button" 
                    onClick={onGoToLogin}
                >
                    Войти
                </button>
            </div>
        </div>
    );
};