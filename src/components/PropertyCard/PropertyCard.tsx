import { UserType } from "../../api/ValidationSchema";
import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../../api/Users";
import { queryClient } from "../../api/qyeryClient";

import style from './PropertyCard.module.scss';

type PropertyCardProp = {
    user: UserType;
}

export const PropertyCard = ({ user }: PropertyCardProp) => {
    const userLogoutMutation = useMutation({
        mutationFn: () => logoutUser(),
        mutationKey: ['logout'],
    }, queryClient);

    const handleLogoutUser = () => {
        userLogoutMutation.mutate();
        setTimeout(() => window.location.reload(), 1000);
    }

    return (
        <div className={style.userPageProperty}>
            <div className={style.userPageAccountWrapper}>
                <div className={style.userPageAccountInfo}>
                    <span className={style.userPageAccountLabel}>Имя Фамилия</span>
                    <span className={style.userPageAccountData}>{user.name} {user.surname}</span>
                </div>
                <div className={style.userPageAccountEmail}>
                    <span className={style.userPageAccountLabel}>Электронная почта</span>
                    <span className={style.userPageAccountData}>{user.email}</span>
                </div>
            </div>
            <button
                className={style.userPageLogout}
                onClick={() => handleLogoutUser()}
            >
                Выйти из аккаунта
            </button>
        </div>
    );
};