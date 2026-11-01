import { Link } from "react-router-dom";
import { UserType } from "../../api/ValidationSchema";

import style from "./UserAccountLink.module.scss";

type UserAccountLinkProps = {
    user: UserType;
}

export const UserAccountLink = ({ user }: UserAccountLinkProps) => {
    return (
        <Link to="user-account" className={style.userAccountLink}>
            {user.name}
        </Link>
    );
};