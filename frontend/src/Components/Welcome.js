import React from 'react';
import Typography from '@mui/material/Typography';

const Welcome = () => {
    return (

        <div>

            <Typography variant="h3" gutterBottom component="div">
                Welcome to EzLogs
            </Typography>
            <Typography variant="h5" gutterBottom component="div">
                lookup logs easily
            </Typography>
        </div>
    );
}

export default Welcome;
