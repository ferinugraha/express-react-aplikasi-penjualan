import { useState } from "react";
import useChangeListener from "../../libs/hooks/useChangeListener";
import useHTTP from "../../libs/hooks/useHTTP";
import useJWT from "../../libs/hooks/useJWT";
import { BarangInit } from "../../data/BarangData";
import {
  Button,
  Col,
  Container,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import { BASE_URL } from "../../libs/config/settings";
import { useNavigate } from "react-router-dom";
import useMessage from "../../libs/hooks/useMessage";

const PageBarangCreate = () => {
  const navigate = useNavigate();
  const http = useHTTP();
  const jwt = useJWT();
  const onChangeListener = useChangeListener();
  const message = useMessage();

  const [barang, setBarang] = useState(BarangInit);

  const onCreateBarang = () => {
    const url = `${BASE_URL}/barang/`;
    const config = {
      headers: {
        Authorization: jwt.get(),
      },
    };

    http.privateHTTP
      .post(url, barang, config)
      .then((response) => {
        message.success(response);
        navigate(-1);
      })
      .catch((error) => {
        // console.log(error);
        message.error(error);
      });
  };

  return (
    <Container className="mt-4 mb-4">
      <Row className="mb-3">
        <Col>
          <h2>Buat Barang</h2>
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
          <Button onClick={onCreateBarang}>Simpan</Button>
          <Button variant="outline-dark" onClick={() => navigate(-1)}>
            Batal
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default PageBarangCreate;
