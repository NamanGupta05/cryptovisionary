import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const SelectButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "selected",
})(({ theme, selected }) => ({
  border: "1px solid gold",
  borderRadius: 5,
  padding: "10px 20px",
  fontFamily: "Montserrat",
  cursor: "pointer",
  backgroundColor: selected ? "gold" : "",
  color: selected ? "black" : "",
  fontWeight: selected ? 700 : 500,
  "&:hover": {
    backgroundColor: "gold",
    color: "black",
  },
  width: "22%",
}));

const SelectButtonComponent = ({ children, selected, onClick }) => {
  return (
    <SelectButton onClick={onClick} selected={selected} variant="outlined">
      {children}
    </SelectButton>
  );
};

export default SelectButtonComponent;
