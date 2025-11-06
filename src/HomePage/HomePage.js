import '../index.css';
// eslint-disable-next-line no-unused-vars
import varDump from '../classifier/classifier';

import AuthContext from '../Context/AuthContext';

import React,  { useContext, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import cryptoRandomString from 'crypto-random-string';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

const HomePage = () => {

    console.count('HomePage Render');

    const { idToken, } = useContext(AuthContext);
    //eslint-disable-next-line no-unused-vars
    const [cookie, setCookie] = useCookies(['idToken', 'accessToken', 'profile']);
    const [generatedCsrf, setGeneratedCsrf] = useState();

    useEffect( () => {

        // generate CSRF token for login and store in a cookie w/60m expiry
        console.count('generate CSRF in HomePage');

        var csrf = cryptoRandomString({length: 64, type: 'alphanumeric'});
        setGeneratedCsrf(csrf);
        setCookie('csrfToken', csrf, { path: '/', maxAge: 3600 });

    }, [idToken, setCookie])


    return (
        <>
        <Box className="app-title">
            <Typography variant="h3">
                Welcome to Darwin
            </Typography>
        </Box>
        <Box className="app-homepage">
            <Typography variant="h6">
                Accounts
            </Typography>
            {!idToken ?
                generatedCsrf ?
                    <Typography key="login"
                                variant="body1"
                                component="a"
                                href={`https://${process.env.REACT_APP_COGNITO_DOMAIN}/login?response_type=token&state=${generatedCsrf}&client_id=${process.env.REACT_APP_COGNITO_CLIENT_ID}&scope=aws.cognito.signin.user.admin+email+openid&redirect_uri=${process.env.REACT_APP_LOGIN_REDIRECT}`}
                                sx={{marginBottom: 2 }} >
                        Login / Create Account
                    </Typography>
                :
                    <CircularProgress/>
             :
                <Typography key="logout"
                            variant="body1"
                            component="a"
                            href={`logout`}
                            sx={{marginBottom: 0, }} >
                    Logout
                </Typography>
            }
        </Box>
        </>
    )
}

export default HomePage;
