import { useLocation, useNavigate } from "react-router-dom";
import useHTTP from "../../libs/hooks/useHTTP";
import useJWT from "../../libs/hooks/useJWT";
import useMessage from "../../libs/hooks/useMessage";
import useChangeListener from "../../libs/hooks/useChangeListener";
import { useEffect, useState } from "react";
import { CustomerInit } from "../../data/CustomerData";
import { BASE_URL } from "../../libs/config/settings";
import {
  Button,
  Col,
  Container,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";

const PageCustomerDetail = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();
  const onChangeListener = useChangeListener();

  const [customer, setCustomer] = useState(CustomerInit);

  const onCustomerDetail = () => {
    const url = `${BASE_URL}/customer/${state._id}`;
    const config = {
      headers: {
        Authorization: jwt.get(),
      },
    };

    http.privateHTTP
      .get(url, config)
      .then((response) => {
        setCustomer(response.data);
      })
      .catch((error) => {
        message.error(error);
        navigate(-1);
      });
  };

  const onCustomerUpdate = () => {
    const url = `${BASE_URL}/customer/${state._id}`;
    const config = {
      headers: {
        Authorization: jwt.get(),
      },
    };

    http.privateHTTP
      .put(url, customer, config)
      .then((response) => {
        message.success(response);
        navigate(-1);
      })
      .catch((error) => {
        message.error(error);
      });
  };

  const onCustomerDelete = () => {
    message.confirmRemove(() => {
      const url = `${BASE_URL}/customer/${state._id}`;
      const config = {
        headers: {
          Authorization: jwt.get(),
        },
      };

      http.privateHTTP
        .delete(url, config)
        .then((response) => {
          message.success(response);
          navigate(-1);
        })
        .catch((error) => {
          message.error(error);
        });
    });
  };

  useEffect(() => {
    onCustomerDetail();
  }, [state._id]);

  return (
    <Container className="mt-4 mb-4">
      <Row className="mb-3">
        <Col>
          <h2>Customer Update</h2>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3}>
          <FormGroup>
            <FormLabel>Nomor</FormLabel>
            <FormControl
              name="nomor"
              value={customer.nomor}
              onChange={(e) =>
                onChangeListener.onChangeText(e, customer, setCustomer)
              }
            />
            <small className="form-text">
              Pastikan nomor unik mengikut format PRFXXXX.
            </small>
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <FormLabel>Nama</FormLabel>
            <FormControl
              name="nama"
              value={customer.nama}
              onChange={(e) =>
                onChangeListener.onChangeText(e, customer, setCustomer)
              }
            />
          </FormGroup>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <FormGroup>
            <FormLabel>Alamat</FormLabel>
            <FormControl
              name="alamat"
              as={"textarea"}
              value={customer.alamat}
              onChange={(e) =>
                onChangeListener.onChangeText(e, customer, setCustomer)
              }
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <FormLabel>Telepon</FormLabel>
            <FormControl
              name="telepon"
              value={customer.telepon}
              onChange={(e) =>
                onChangeListener.onChangeText(e, customer, setCustomer)
              }
            />
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col className="d-flex gap-3">
          <Button onClick={onCustomerUpdate}>Simpan</Button>
          <Button variant="outline-danger" onClick={onCustomerDelete}>
            Hapus
          </Button>
          <Button variant="outline-dark" onClick={() => navigate("/customer")}>
            Batal
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default PageCustomerDetail;
