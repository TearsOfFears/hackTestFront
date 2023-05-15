import {
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  OutlinedInput,
  SelectProps,
} from '@mui/material';
import React, { memo } from 'react';

import { Item } from '../redux/services/university';

interface ItemOption {
  value: string;
  name: string;
}
interface ISelect extends SelectProps {
  children: React.ReactNode;
  label: string;
  name: string;
  extraClasses?: string;
  disabled: boolean | undefined;
  error?: string[];
  arrayOption: ItemOption[];
  isLoading: boolean;
  isCheckbox: boolean;
  size?: string;
}
function SelectCommon({
  error,
  arrayOption,
  label,
  size,
  ...props
}: ISelect): JSX.Element {
  return (
    <FormControl size={size}>
      <InputLabel id="multiple-name-label">{label}</InputLabel>
      <Select
        labelId="multiple-name-label"
        id="multiple-name-label"
        value={arrayOption}
        input={<OutlinedInput label={label} />}
        {...props}
      >
        {arrayOption.map(({ value, name }) => (
          <MenuItem key={value} value={value}>
            {/*<ListItemText primary={title} />*/}
            {/*<Checkbox checked={arrayOption.indexOf(universityId) > -1} />*/}
            {name}
          </MenuItem>
        ))}
      </Select>
      {error && <span className="text-xs text-orange">{error}</span>}
    </FormControl>
  );
}

export default memo(SelectCommon);
