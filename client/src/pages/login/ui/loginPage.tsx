import { Logo } from "widgets/logo"
import { LoginBox } from "widgets/login"

import styles from './loginPage.module.css'

const LoginPage = () => {

    return (
        <div className={styles.page}>
            <Logo className={styles.logo}/>
            <LoginBox />
        </div>
    )
}

export default LoginPage;