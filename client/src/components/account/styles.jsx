import { styled } from '@mui/system';
import { Box, TextField, Button, Typography } from '@mui/material';
import {backgroundImageURL} from './img.jsx'

export const OuterContainer = styled(Box)`
    background: url(${backgroundImageURL}) center/cover fixed;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: cover;
    background-repeat: no-repeat;
`;

export const StyledContainer = styled(Box)`
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

export const StyledImage = styled('img')`
    width: 100%;
    max-height: 150px;
    object-fit: contain;
    margin-bottom: 20px;
    border-radius: 4px;
`;

export const StyledTextField = styled(TextField)`
    width: 100%;
    margin-bottom: 15px;
`;

export const StyledButton = styled(Button)`
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

export const StyledToggle = styled(Button)`
    width: 100%;
    margin-top: 10px;
    color: #8e44ad;

    &:hover {
        background: #8e44ad;
        color: #ffffff;
    }
`;

export const ErrorCss = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`