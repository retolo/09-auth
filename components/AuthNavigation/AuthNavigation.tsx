import css from './AuthNavigation.module.css'
import Link from 'next/link';




const AuthNavigation = () =>{
    return(
        <>
             <li className={css.navigationItem}>
                <Link prefetch={false}  href="/profile"  className={css.navigationLink}>
                    Profile
                </Link>
            </li>

            <li className={css.navigationItem}>
                <p className={css.userEmail}>User email</p>
                <button className={css.logoutButton}>
                    Logout
                </button>
            </li>

            <li className={css.navigationItem}>
                <Link prefetch={false} href="/sign-in"  className={css.navigationLink}>
                    Login
                </Link>
            </li>

            <li className={css.navigationItem}>
                <Link prefetch={false} href="/sign-up"  className={css.navigationLink}>
                    Sign up
                </Link>
            </li>

        
        </>
    )
}



export default AuthNavigation;