import React from 'react';
import { Grid, TextField } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

const AddressInput = ({ name, label, required, autoComplete, sm }) => {
    const { control } = useFormContext();
    return (
        <Grid item xs={12} sm={sm}>
            <Controller
                control={control}
                name={name}
                defaultValue=""
                render={({
                    field: { onChange, onBlur, value, name }
                }) => (
                    <TextField
                        required={required}
                        id={name}
                        value={value}
                        name={name}
                        label={label}
                        fullWidth
                        autoComplete={autoComplete}
                        variant="standard"
                        onBlur={onBlur}
                        onChange={onChange}
                    />
                )}
            />
        </Grid>
    );
}

export default AddressInput;