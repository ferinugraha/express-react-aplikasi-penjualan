import { Outlet, useNavigate } from "react-router-dom";
import useHTTP from "../../libs/hooks/useHTTP";
import useJWT from "../../libs/hooks/useJWT";
import useMessage from "../../libs/hooks/useMessage";
import { useEffect, useState } from "react";
import { PaginationData } from "../../data/PaginationData";
import { BASE_URL } from "../../libs/config/settings";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import WidgetCommonLoadingTable from "../../widgets/commons/WidgetCommonLoadingTable";
import { BsInfoCircle } from "react-icons/bs";
import WidgetCommonPagination from "../../widgets/commons/WidgetCommonPagination";
import WidgetCommonSearch from "../../widgets/commons/WidgetCommonSearch";
import WidgetCommonLimit from "../../widgets/commons/WidgetCommonLimit";

const PageCustomerList = () => {
  const navigate = useNavigate();
  const http = useHTTP();
  const jwt = useJWT();

  const message = useMessage();

  const [daftarCustomer, setDaftarCustomer] = useState([]);
  const [paginateCustomer, setPaginateCustomer] = useState(PaginationData);

  const onCustomerList = (page, search, limit = 2) => {
    const url = `${BASE_URL}/customer/`;
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
        setDaftarCustomer(results);
        setPaginateCustomer(paginate);
      })
      .catch((error) => {
        message.error(error);
      });
  };

  const onCustomerPaginate = (page) => {
    onCustomerList(page);
  };

  const onCustomerSearch = (search) => {
    onCustomerList(null, search);
  };

  const onCustomerLimit = (limit) => {
    onCustomerList(null, null, limit);
  };

  useEffect(() => {
    onCustomerList();
  }, []);

  return (
    <>
      <Outlet />
      <Container className="mb-4 mt-4">
        <Row className="mb-3">
          <Col>
            <h2>Kelola Customer</h2>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button onClick={() => navigate("create")}>Customer Baru</Button>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={5}>
            <WidgetCommonSearch callback={onCustomerSearch} />
          </Col>
          <Col md={3}>
            <WidgetCommonLimit callback={onCustomerLimit} />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <WidgetCommonLoadingTable>
              <Table responsive={true} bordered={true} striped={true}>
                <thead>
                  <tr>
                    <th>Nomor</th>
                    <th>Nama</th>
                    <th>Alamat</th>
                    <th>Telepon</th>
                    <th>#</th>
                  </tr>
                </thead>
                <tbody>
                  {daftarCustomer.map((customer) => (
                    <tr key={customer._id}>
                      <td>{customer.nomor}</td>
                      <td>{customer.nama}</td>
                      <td>{customer.alamat}</td>
                      <td>{customer.telepon}</td>
                      <td>
                        <Button
                          onClick={() =>
                            navigate("detail", { state: { _id: customer._id } })
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
              pagination={paginateCustomer}
              callback={onCustomerPaginate}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PageCustomerList;
