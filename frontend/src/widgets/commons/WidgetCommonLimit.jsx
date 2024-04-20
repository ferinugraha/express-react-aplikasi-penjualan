import { useRef } from "react";
import { FormGroup, FormLabel, FormSelect } from "react-bootstrap";
import PropTypes from "prop-types";

const WidgetCommonLimit = ({ callback }) => {
  const limit = useRef({ value: 2 });

  return (
    <FormGroup>
      <FormLabel>Limit per halaman</FormLabel>
      <FormSelect ref={limit} onChange={() => callback(limit.current.value)}>
        <option>Pilih limit</option>
        <option value={2}>2</option>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </FormSelect>
    </FormGroup>
  );
};

WidgetCommonLimit.propTypes = {
  callback: PropTypes.func,
};

export default WidgetCommonLimit;
