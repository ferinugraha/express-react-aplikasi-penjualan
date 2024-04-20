import { useRef } from "react";
import PropTypes from "prop-types";
import { FormControl, FormGroup, FormLabel } from "react-bootstrap";

const WidgetCommonSearch = ({ callback }) => {
  const search = useRef({ value: "" });

  const callbackSearch = (e) => {
    if (e.key === "Enter") {
      callback(search.current.value);
    }
  };

  return (
    <FormGroup>
      <FormLabel>Pencarian</FormLabel>
      <FormControl
        ref={search}
        onKeyUp={callbackSearch}
        placeholder="Search...."
      />
    </FormGroup>
  );
};

WidgetCommonSearch.propTypes = {
  callback: PropTypes.func,
};

export default WidgetCommonSearch;
