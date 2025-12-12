import { MenuItem, Select, FormControl, FormHelperText } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";

export type DropdownOption = {
  label: string;
  value: string;
};

type DropdownProps = {
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  options: DropdownOption[];
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  width?: string | number;
  error?: boolean;
  helperText?: string;
};

const Dropdown = ({
  value,
  onChange,
  options,
  label,
  placeholder,
  width,
  disabled,
  error,
  helperText,
  ...otherProps
}: DropdownProps) => {
  return (
    <FormControl error={error} sx={{ width: width }}>
      <Select
        sx={{
          borderRadius: 2,
          width: "100%",
          fontSize: "0.875rem",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: error ? "error.main" : "divider",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: error ? "error.main" : "primary.main",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: error ? "error.main" : "primary.main",
          },
        }}
        size="small"
        value={value}
        onChange={onChange}
        displayEmpty
        disabled={disabled}
        inputProps={{ "aria-label": label || "select" }}
        {...otherProps}
      >
        {placeholder && (
          <MenuItem value="" disabled>
            {placeholder}
          </MenuItem>
        )}
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && (
        <FormHelperText sx={{ ml: 1 }}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default Dropdown;