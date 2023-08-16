import { useEffect } from 'react';
import jwt_decode from 'jwt-decode';

export const SignInWithGoogle = ({getCredentials}) => {

    function handleCallBackResponse(response) {
        const userObject = jwt_decode(response.credential);
        getCredentials(userObject)
    }

    useEffect(() => {
        if (window.google && window.google.accounts && window.google.accounts.id) {
            window.google.accounts.id.initialize({
                client_id: "92889447111-gd20bttlnn05009nosu5h6u5h3j6gfs7.apps.googleusercontent.com",
                callback: handleCallBackResponse
            });

            window.google.accounts.id.renderButton(
                document.getElementById('signInDiv'),
                { theme: 'outline', size: 'large' }
            )
        }
    }, [])

    return (
        <div id="signInDiv" style={{display: 'flex', justifyContent: 'center'}}></div>
    )
}