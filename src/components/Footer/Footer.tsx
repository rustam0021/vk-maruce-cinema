import { VkIcon } from '../../styles/icons/VkIcon/VkIcon';
import { YtIcon } from '../../styles/icons/YtIcon/YtIcon';
import { OkIcon } from '../../styles/icons/OkIcon/OkIcon';
import { TgIcon } from '../../styles/icons/TgIcon/TgIcon';

import style from './Footer.module.scss';

export const Footer = () => {
    return (
        <footer className={style.footer}>
            <div className={style.footer__container}>
                <ul className={style.footer__links}>
                    <li className={style.footer__sociallink}><a href="#">{<VkIcon />}</a></li>
                    <li className={style.footer__sociallink}><a href="#">{<YtIcon />}</a></li>
                    <li className={style.footer__sociallink}><a href="#">{<OkIcon />}</a></li>
                    <li className={style.footer__sociallink}><a href="#">{<TgIcon />}</a></li>
                </ul>
            </div>
        </footer>
    )
}