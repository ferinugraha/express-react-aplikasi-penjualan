import { Pagination } from "react-bootstrap";
import PropTypes from "prop-types";

const WidgetCommonPagination = ({ pagination, callback }) => {
  return (
    <>
      <Pagination>
        <Pagination.Prev
          disabled={!pagination.previous}
          onClick={() => callback(pagination.previous)}
        ></Pagination.Prev>
        <Pagination.Next
          disabled={!pagination.next}
          onClick={() => callback(pagination.next)}
        ></Pagination.Next>
      </Pagination>
    </>
  );
};

WidgetCommonPagination.propTypes = {
  pagination: PropTypes.object,
  callback: PropTypes.func,
};

export default WidgetCommonPagination;
