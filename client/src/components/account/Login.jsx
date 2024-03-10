import React, { useState } from 'react';
import { Box } from '@mui/material';
import {API} from '../../service/api'
import { OuterContainer,StyledContainer, StyledImage, StyledTextField, StyledButton, StyledToggle, ErrorCss } from './styles'; 
import {imageURL} from './img'

const signupInitialValues = {
    name: '',
    username: '',
    password: ''
}

const Login = () => {
    const [showLogin, setShowLogin] = useState(true);
    const [signup, setSignup] = useState(signupInitialValues);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const toggleView = () => {
        setShowLogin(!showLogin);
    };

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    };

    // Perform signup action
    const signupUser = async () => {
        try {
            setLoading(true);
            let response = await API.userSignup(signup);
            console.log('Signup response:', response);

            if(response.isSuccess) {
                setError('');
                setSignup(signupInitialValues);
                toggleView();
            } else {
                setError(response.msg || 'Something went wrong');
            }
              
        } catch (error) {
            console.error('Error signing up user:', error);
            setError(error.message || 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <OuterContainer>
            <StyledContainer>
                <StyledImage src={imageURL} alt="login_img" />
                {showLogin ? (
                    <Box>
                        <StyledTextField id="username" label="Username" variant="standard" />
                        <StyledTextField id="password" label="Password" type="password" variant="standard" />
                        {error && <ErrorCss>{error}</ErrorCss>}
                        <StyledButton variant="contained" disabled={loading}>Log In</StyledButton>
                        <StyledToggle onClick={toggleView}>Create an Account</StyledToggle>
                    </Box>
                ) : (
                    <Box>
                        <StyledTextField id="name" name="name" label="Name" variant="standard" onChange={(e) => { onInputChange(e) }} />
                        <StyledTextField id="username" name="username" label="Username" variant="standard" onChange={(e) => { onInputChange(e) }} />
                        <StyledTextField id="password" name="password" label="Password" type="password" variant="standard" onChange={(e) => { onInputChange(e) }} />
                        {error && <ErrorCss>{error}</ErrorCss>}
                        <StyledButton onClick={() => { signupUser() }} variant="contained" disabled={loading}>Create Account</StyledButton>
                        <StyledToggle onClick={toggleView}>Log In</StyledToggle>
                    </Box>
                )}
            </StyledContainer>
        </OuterContainer>
    );
};

export default Login;
