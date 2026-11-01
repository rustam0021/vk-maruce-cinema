import { FC, useState } from "react";
import { FavoriteMovies } from "../../components/FavoriteMovies/FavoriteMovies";
import { PropertyCard } from "../../components/PropertyCard/PropertyCard";
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../../api/Users";
import { queryClient } from "../../api/qyeryClient";

import style from "./UserAccountPage.module.scss";

type UserAccountPageType = 'favorite' | 'property';

export const UserAccountPage: FC = () => {
    const [accountPageType, setAccountPageType] = useState<UserAccountPageType>('favorite');

    const { data: user, status } = useQuery({
        queryFn: () => fetchUser(),
        queryKey: ['users', 'me'],
    }, queryClient);
        
    if (status === 'pending') return <span>Загрузка...</span>;
    if (status === 'error' || !user) return <span>Ошибка доступа. Пожалуйста, войдите в аккаунт.</span>;

    return (
        <div className={style.userPage}>
            <div className={style.userPage__container}>
                <h1 className={style.userPage__title}>Мой аккаунт</h1>
                <div className={style.userPage__buttons}>
                <button 
                    onClick={() => setAccountPageType('favorite')} 
                    className={`${style.userPage__btn} ${style['userPage__btn--favorite']}`}
                >
                    <span className={style.userPage__btnText} data-full="Избранные фильмы" data-short="Избранные">
                        Избранные фильмы
                    </span>
                    <span className={style.userPage__btnTextShort} data-full="Избранные фильмы" data-short="Избранные">
                        Избранные
                    </span>
                </button>
                <button 
                    onClick={() => setAccountPageType('property')}  
                    className={`${style.userPage__btn} ${style['userPage__btn--property']}`}
                >
                    <span className={style.userPage__btnText} data-full="Настройка аккаунта" data-short="Настройка">
                        Настройка аккаунта
                    </span>
                    <span className={style.userPage__btnTextShort} data-full="Настройка аккаунта" data-short="Настройка">
                        Настройка
                    </span>
                </button>
            </div>
                {accountPageType === 'favorite' ? <FavoriteMovies /> : <PropertyCard user={user} />}
            </div>
        </div>
    );
};