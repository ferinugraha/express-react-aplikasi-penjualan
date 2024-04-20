import { useNavigate } from "react-router-dom";
import useHTTP from "../../libs/hooks/useHTTP";
import useJWT from "../../libs/hooks/useJWT";
import useMessage from "../../libs/hooks/useMessage";
import { useEffect, useState } from "react";
import { PaginationData } from "../../data/PaginationData";
import { BASE_URL } from "../../libs/config/settings";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import WidgetCommonSearch from "../../widgets/commons/WidgetCommonSearch";
import WidgetCommonLimit from "../../widgets/commons/WidgetCommonLimit";
import WidgetCommonLoadingTable from "../../widgets/commons/WidgetCommonLoadingTable";
import useFormatter from "../../libs/hooks/useFormatter";
import { BsInfoCircle } from "react-icons/bs";
import WidgetCommonPagination from "../../widgets/commons/WidgetCommonPagination";

const PageOrderList = () => {
  const navigate = useNavigate();
  const http = useHTTP();
  const jwt = useJWT();

  const message = useMessage();
  const formatter = useFormatter();

  const [daftarOrder, setDaftarOrder] = useState([]);
  const [paginateOrder, setPaginateOrder] = useState(PaginationData);

  const onOrderList = (page, search, limit = 2) => {
    const url = `${BASE_URL}/order/`;
    const params = { page, limit, search };
    const config = {
      headers: {
        Authorization: jwt.get(),
      },
      params,
    };

    http.privateHTTP
      .get(url, config)
      .then((response) => {
        const { results, ...paginate } = response.data;
        setDaftarOrder(results);
        setPaginateOrder(paginate);
      })
      .catch((error) => {
        message.error(error);
      });
  };

  const onOrderPaginate = (page) => {
    onOrderList(page);
  };

  const onOrderSearch = (search) => {
    onOrderList(null, search);
  };

  const onOrderLimit = (limit) => {
    onOrderList(null, null, limit);
  };

  useEffect(() => {
    onOrderList();
  }, []);

  return (
    <>
      <Container className="mb-4 mt-4">
        <Row className="mb-3">
          <Col>
            <h2>Kelola Order</h2>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button onClick={() => navigate("create")}>Order Baru</Button>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={5}>
            <WidgetCommonSearch callback={onOrderSearch} />
          </Col>
          <Col md={3}>
            <WidgetCommonLimit callback={onOrderLimit} />
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <WidgetCommonLoadingTable>
              <Table responsive={true} bordered={true} striped={true}>
                <thead>
                  <tr>
                    <th>Nomor Order</th>
                    <th>Nomor Customer</th>
                    <th>Nama Customer</th>
                    <th>Tanggal</th>
                    <th>Total</th>
                    <th>#</th>
                  </tr>
                </thead>
                <tbody>
                  {daftarOrder.map((order) => (
                    <tr key={order._id}>
                      <td>{order.nomor}</td>
                      <td>{order.customer.nomor}</td>
                      <td>{order.customer.nama}</td>
                      <td>{formatter.formatDate(order.tanggal)}</td>
                      <td>{formatter.formatCurrency(order.total)}</td>
                      <td>
                        <Button
                          onClick={() =>
                            navigate("detail", { state: { _id: order._id } })
                          }
                          size="sm"
                        >
                          <BsInfoCircle />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </WidgetCommonLoadingTable>
          </Col>
        </Row>
        <Row>
          <Col>
            <WidgetCommonPagination
              pagination={paginateOrder}
              callback={onOrderPaginate}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PageOrderList;
