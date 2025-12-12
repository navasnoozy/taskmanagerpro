import { Box, debounce, InputBase } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useMemo, useState, type ChangeEvent } from "react";

interface SearchBarProps {
  onSearch: (value: string) => void;
  placeholder?: string;
  defaultValue?: string;
}

const SearchBar = ({ onSearch, placeholder = "Search...", defaultValue = "" }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState<string>(defaultValue);

  const debouncedUpdate = useMemo(() => {
    return debounce((value: string) => {
      onSearch(value);
    }, 300);
  }, [onSearch]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchQuery(newValue);
    debouncedUpdate(newValue);
  };

  return (
    <Box
      sx={{
        p: "4px 12px",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        width: { xs: '100%', sm: 300 },
      }}
    >
      <InputBase 
        sx={{ ml: 1, flex: 1 }} 
        placeholder={placeholder} 
        value={searchQuery} 
        onChange={handleOnChange} 
        inputProps={{ "aria-label": "search" }} 
      />
      <Search sx={{ color: 'text.secondary' }} />
    </Box>
  );
};

export default SearchBar;
