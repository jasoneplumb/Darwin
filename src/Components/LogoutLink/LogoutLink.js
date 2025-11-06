// eslint-disable-next-line no-unused-vars
import varDump from '../../classifier/classifier';

import { useCookies } from 'react-cookie';

const LogoutLink = () => {

    console.count('logout link called');
    // Logout Link provides a mechanism for HomePage to clear all authentication cookies
    // and logout via cognito

    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookie, removeCookie] = useCookies(['profile', 'idToken', 'accessToken']);

    removeCookie('idToken', { path: '/', maxAge: ((24 * 3600) - 300), secure: true });
    removeCookie('accessToken', { path: '/', maxAge: ((24 * 3600) - 300), secure: true });
    removeCookie('profile', { path: '/', maxAge: ((24 * 3600) - 300), secure: true })

    window.location = `https://${process.env.REACT_APP_COGNITO_DOMAIN}/logout?client_id=${process.env.REACT_APP_COGNITO_CLIENT_ID}&logout_uri=${process.env.REACT_APP_LOGOUT_REDIRECT}`; 
    return null;
}

export default LogoutLink;
