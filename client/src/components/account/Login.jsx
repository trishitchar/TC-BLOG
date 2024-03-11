import React, { useState } from 'react';
import { Box } from '@mui/material';
import {API} from '../../service/api'
import { OuterContainer,StyledContainer, StyledImage, StyledTextField, StyledButton, StyledToggle, ErrorCss } from './styles'; 
import {imageURL} from './img'

const loginInitialValues = {
    username:'',
    password:''
}

const signupInitialValues = {
    name: '',
    username: '',
    password: ''
}

const Login = () => {
    const [showLogin, setShowLogin] = useState(true);

    const [login,setLogin] = useState(loginInitialValues);
    const [signup, setSignup] = useState(signupInitialValues);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const toggleView = () => {
        setShowLogin(!showLogin);
    };

    const onValueChange = (e) =>{
        setLogin({...login, [e.target.name]: e.target.value});
    }

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    };

    const loginUser = async () =>{
        let response = await API.userLogin(login);
        if(response  && response.isSuccess){
            setError('');
        }
    }

    // Perform signup action
    const signupUser = async () => {
        try {
            setLoading(true);
            let response = await API.userSignup(signup);
            if(response.isSuccess) {
                setError('');
                setSignup(signupInitialValues);
                toggleView();
            } else {
                setError(response.error.message || 'Failed to submit POST req');
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
                        <StyledButton onClick={(e)=>{onValueChange(e)}} variant="contained" disabled={loading} >Log In</StyledButton>
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
