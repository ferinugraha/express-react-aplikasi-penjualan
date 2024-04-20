import { useLocation, useNavigate } from "react-router-dom";
import useHTTP from "../../libs/hooks/useHTTP";
import useJWT from "../../libs/hooks/useJWT";
import useMessage from "../../libs/hooks/useMessage";
import useChangeListener from "../../libs/hooks/useChangeListener";
import { useEffect, useState } from "react";
import { BarangInit } from "../../data/BarangData";
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

const PageBarangDetail = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();
  const onChangeListener = useChangeListener();

  const [barang, setBarang] = useState(BarangInit);

  const onBarangDetail = () => {
    const url = `${BASE_URL}/barang/${state._id}`;
    const config = {
      headers: {
        Authorization: jwt.get(),
      },
    };

    http.privateHTTP
      .get(url, config)
      .then((response) => {
        setBarang(response.data);
      })
      .catch((error) => {
        message.error(error);
        navigate(-1);
      });
  };

  const onBarangUpdate = () => {
    const url = `${BASE_URL}/barang/${state._id}`;
    const config = {
      headers: {
        Authorization: jwt.get(),
      },
    };

    http.privateHTTP
      .put(url, barang, config)
      .then((response) => {
        message.success(response);
        navigate(-1);
      })
      .catch((error) => {
        message.error(error);
      });
  };

  const onBarangDelete = () => {
    message.confirmRemove(() => {
      const url = `${BASE_URL}/barang/${state._id}`;
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
    onBarangDetail();
  }, []);

  return (
    <Container className="mt-4 mb-4">
      <Row className="mb-3">
        <Col>
          <h2>Barang Update</h2>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3}>
          <FormGroup>
            <FormLabel>Nomor</FormLabel>
            <FormControl
              name="nomor"
              value={barang.nomor}
              onChange={(e) =>
                onChangeListener.onChangeText(e, barang, setBarang)
              }
            />
          </FormGroup>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <FormGroup>
            <FormLabel>Nama</FormLabel>
            <FormControl
              name="nama"
              value={barang.nama}
              onChange={(e) =>
                onChangeListener.onChangeText(e, barang, setBarang)
              }
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <FormLabel>Satuan</FormLabel>
            <FormControl
              name="satuan"
              value={barang.satuan}
              onChange={(e) =>
                onChangeListener.onChangeText(e, barang, setBarang)
              }
            />
          </FormGroup>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <FormGroup>
            <FormLabel>Harga Jual</FormLabel>
            <FormControl
              name="hargaJual"
              value={barang.hargaJual}
              type="number"
              onChange={(e) =>
                onChangeListener.onChangeNumber(e, barang, setBarang)
              }
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <FormLabel>Stok</FormLabel>
            <FormControl
              name="stok"
              value={barang.stok}
              type="number"
              onChange={(e) =>
                onChangeListener.onChangeNumber(e, barang, setBarang)
              }
            />
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col className="d-flex gap-3">
          <Button onClick={onBarangUpdate}>Simpan</Button>
          <Button variant="outline-danger" onClick={onBarangDelete}>
            Hapus
          </Button>
          <Button variant="outline-dark" onClick={() => navigate(-1)}>
            Batal
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default PageBarangDetail;
