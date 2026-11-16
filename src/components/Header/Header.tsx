import { useState, FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../../api/Users";
import { queryClient } from "../../api/qyeryClient";
import { UserAccountLink } from "../UserAccountLink/UserAccountLink";
import { Search } from "../Search/Search";
import { useAppDispatch } from "../../store/hooks";
import { openAuthModal } from "../../store/slices/authSlice";

import style from './Header.module.scss';
import { GenresIcon } from "../../styles/icons/GenresIcon/GenresIcon";
import { SearchIcon } from "../../styles/icons/SearchIcon/SearchIcon";
import { AccountIcon } from "../../styles/icons/AccpuntIcon/AccountIcon";

export const Header: FC = () => {
    const dispatch = useAppDispatch();
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const meQuery = useQuery({
        queryFn: () => fetchUser(),
        queryKey: ['users', 'me'],
    }, queryClient);

    return (
        <header className={style.header}>
            <div className={style.header__container}>
                <nav className={style.header__nav}>
                    <div className={style.header__logo}>
                        <a href="/">маруся</a>
                    </div>

                    <ul className={style.header__navList}>
                        <li className={style.header__navListItem}>
                            <a className={style.header__navHomeLink} href="/">
                                Главная
                            </a>
                        </li>
                        <li className={style.header__navListItem}>
                            <a href="/genres">
                                <span className={style.header__navGenresLinkText}>Жанры</span>
                                <span className={style.header__navGenresLinkIcon}><GenresIcon /></span>
                            </a>
                        </li>
                        <li className={`${style.header__navListItem} ${style['header__navListItem--search']}`}>
                            <div className={style.header__navSearchField}>
                                <Search />
                            </div>
                            <div 
                                className={style.header__navSearchIcon} 
                                onClick={() => setIsSearchOpen(true)}
                            >
                                <SearchIcon />
                            </div>
                            {isSearchOpen && (
                                <div className={style.header__searchModal}>
                                    <div className={style.header__searchModalContent}>
                                        <Search />
                                        <button 
                                            className={style.header__searchCloseBtn}
                                            onClick={() => setIsSearchOpen(false)}
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>
                            )}
                        </li>
                    </ul>

                    <div className={style.header__profile}>
                        <div className={style.header__accountBox}>
                            {meQuery.status === 'pending' && <span>...</span>}

                            {meQuery.status === 'error' && (
                                <button 
                                    className={style['header__login-btn']} 
                                    onClick={() => dispatch(openAuthModal())}
                                >
                                    <span className={style.header__accountText}>Войти</span>
                                    <div className={style.header__accountIcon}><AccountIcon /></div>
                                </button>
                            )}

                            {meQuery.status === 'success' && (
                                <UserAccountLink user={meQuery.data} />
                            )}
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};