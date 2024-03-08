import React, { useState } from 'react';
import { Box, TextField, Button, styled } from '@mui/material';

const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';
const backgroundImageURL = 'https://source.unsplash.com/1080x2400?sunset+birdeye+ocean';

const OuterContainer = styled(Box)`
    background: url(${backgroundImageURL}) center/cover fixed;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: cover;
    background-repeat: no-repeat;
`;

const StyledContainer = styled(Box)`
    width: 80%;
    max-width: 400px;
    background-color: rgba(255, 255, 255, 0.1);
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    border-radius: 10px;
    backdrop-filter: blur(9px);
    border: 2px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
    padding: 20px;
`;

const StyledImage = styled('img')`
    width: 100%;
    max-height: 150px;
    object-fit: contain;
    margin-bottom: 20px;
    border-radius: 4px;
`;

const StyledTextField = styled(TextField)`
    width: 100%;
    margin-bottom: 15px;
`;

const StyledButton = styled(Button)`
    width: 100%;
    margin-top: 10px;
    background: linear-gradient(to right, #8e44ad, #c0392b);
    color: #ffffff;
    border: 2px solid #8e44ad;
    transition: background 0.3s, color 0.3s;

    &:hover {
        background: linear-gradient(to right, #c0392b, #8e44ad);
        color: #ffffff;
    }
`;

const StyledToggle = styled(Button)`
    width: 100%;
    margin-top: 10px;
    color: #8e44ad;

    &:hover {
        background: #8e44ad;
        color: #ffffff;
    }
`;

const Login = () => {
    const [showLogin, setShowLogin] = useState(true);

    const toggleView = () => {
        setShowLogin(!showLogin);
    };

    return (
        <OuterContainer>
            <StyledContainer>
                <StyledImage src={imageURL} alt="login_img" />
                {showLogin ? (
                    <Box>
                        <StyledTextField id="username" label="Username" variant="standard" />
                        <StyledTextField id="password" label="Password" type="password" variant="standard" />
                        <StyledButton variant="contained">Log In</StyledButton>
                        <StyledToggle onClick={toggleView}>Create an Account</StyledToggle>
                    </Box>
                ) : (
                    <Box>
                        <StyledTextField id="name" label="Name" variant="standard" />
                        <StyledTextField id="username" label="Username" variant="standard" />
                        <StyledTextField id="password" label="Password" type="password" variant="standard" />
                        <StyledButton variant="contained">Create Account</StyledButton>
                        <StyledToggle onClick={toggleView}>Log In</StyledToggle>
                    </Box>
                )}
            </StyledContainer>
        </OuterContainer>
    );
};

export default Login;
