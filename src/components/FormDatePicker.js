import React, { forwardRef, useImperativeHandle, useState } from 'react'

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box } from '@mui/material';
import { endOfDay } from 'date-fns';

const FormDatePicker = forwardRef((props, _ref) => {
  const [date, setDate] = useState('')
  // console.log(date);

  useImperativeHandle(_ref, () => ({
    getDateData: () => {
      return date
    }
  }))

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Deadline date picker"
        value={date}
        onChange={(e) => { setDate(endOfDay(e)) }}
        renderInput={({ inputRef, inputProps, InputProps }) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center'
            }}>
            <input ref={inputRef} {...inputProps} />
            {InputProps?.endAdornment}
          </Box>
        )}
      />
    </LocalizationProvider>

  )
})

export default FormDatePicker