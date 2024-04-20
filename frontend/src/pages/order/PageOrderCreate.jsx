import { useNavigate } from "react-router-dom";
import useHTTP from "../../libs/hooks/useHTTP";
import useJWT from "../../libs/hooks/useJWT";
import useChangeListener from "../../libs/hooks/useChangeListener";
import useMessage from "../../libs/hooks/useMessage";
import { OrderInit } from "../../data/OrderData";
import { BASE_URL } from "../../libs/config/settings";
import { useEffect, useMemo, useRef, useState } from "react";
import { CustomerInit } from "../../data/CustomerData";
import {
  Button,
  Col,
  Container,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Table,
} from "react-bootstrap";
import WidgetCommonLoadingTable from "../../widgets/commons/WidgetCommonLoadingTable";
import useFormatter from "../../libs/hooks/useFormatter";
import { FaSave, FaTrash } from "react-icons/fa";

const PageOrderCreate = () => {
  const navigate = useNavigate();
  const http = useHTTP();
  const jwt = useJWT();
  const onChangeListener = useChangeListener();
  const message = useMessage();
  const formatter = useFormatter();

  const [order, setOrder] = useState(OrderInit);
  const [customer, setCustomer] = useState(CustomerInit);
  const [items, setItems] = useState([]);
  const nomorCustomer = useRef({ value: "" });
  const nomorBarang = useRef({ value: "" });

  const totalKalkulasi = useMemo(() => {
    let total = 0;
    for (let item of items) {
      total += item.subtotal;
    }

    setOrder({ ...order, total });
    return total;
  }, [items]);

  // useEffect(() => {
  //   let total = 0;
  //   for (let item of items) {
  //     total += item.subtotal
  //   }

  //   setOrder({...order, total})
  // }, [items])

  const onCreateOrder = () => {
    const url = `${BASE_URL}/order`;
    const config = {
      headers: {
        Authorization: jwt.get(),
      },
    };

    const payload = {
      ...order,
      customer,
      items,
    };

    http.privateHTTP
      .post(url, payload, config)
      .then((response) => {
        message.success(response);
        navigate(-1);
      })
      .catch((error) => {
        message.error(error);
      });
  };

  const onDetailCustomerByNumber = (e) => {
    if (e.key === "Enter") {
      const url = `${BASE_URL}/customer/by-nomor/${nomorCustomer.current.value}`;
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
        });
    }
  };

  const isDuplicateItem = (barang) => {
    for (let item of items) {
      if (barang._id === item._id) {
        return true;
      }
    }

    return false;
  };

  const onDetailBarangByNumber = (e) => {
    if (e.key === "Enter") {
      const url = `${BASE_URL}/barang/by-nomor/${nomorBarang.current.value}`;
      const config = {
        headers: {
          Authorization: jwt.get(),
        },
      };

      http.privateHTTP
        .get(url, config)
        .then((response) => {
          const barang = response.data;
          const itemCopy = [...items];

          if (isDuplicateItem(barang)) {
            itemCopy.map((item) => {
              if (item._id === barang._id) {
                console.log(2);
                item.qty += 1;
                item.subtotal = barang.hargaJual * item.qty;
              }
              return item;
            });
          } else {
            itemCopy.push({
              ...barang,
              qty: 1,
              subtotal: barang.hargaJual,
            });
          }
          setItems(itemCopy);
        })
        .catch((error) => {
          message.error(error);
        });
    }
  };

  const onItemDelete = (index) => {
    const itemsCopy = [...items];
    itemsCopy.splice(index, 1);

    setItems(itemsCopy);
  };

  return (
    <Container className="mt-4 mb-4">
      <Row className="mb-3">
        <Col>
          <h2>Buat Order</h2>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <FormGroup>
            <FormLabel>Nomor</FormLabel>
            <FormControl
              name="nomor"
              value={order.nomor}
              onChange={(e) =>
                onChangeListener.onChangeText(e, order, setOrder)
              }
            />
            <small className="form-text">
              Pastikan nomor unik mengikut format PRFXXXX.
            </small>
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <FormLabel>Tanggal</FormLabel>
            <FormControl
              name="tanggal"
              value={order.tanggal}
              type="date"
              onChange={(e) =>
                onChangeListener.onChangeText(e, order, setOrder)
              }
            />
          </FormGroup>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <h4>Detil Customer</h4>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={5}>
          <FormGroup>
            <FormLabel>Nomor Customer</FormLabel>
            <FormControl
              ref={nomorCustomer}
              onKeyUp={onDetailCustomerByNumber}
            />
            <small className="form-text">
              Tekan enter untuk mendapatkan customer.
            </small>
          </FormGroup>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3}>
          <FormGroup>
            <FormLabel>Nomor</FormLabel>
            <FormControl
              name="nomor"
              value={customer.nomor}
              readOnly
              disabled
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <FormLabel>Nama</FormLabel>
            <FormControl name="nama" value={customer.nama} readOnly disabled />
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
              readOnly
              disabled
              value={customer.alamat}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <FormLabel>Telepon</FormLabel>
            <FormControl
              name="telepon"
              value={customer.telepon}
              readOnly
              disabled
            />
          </FormGroup>
        </Col>
      </Row>

      {/* ITEMS */}
      <Row className="mb-3">
        <Col>
          <h4>Item Pembelian</h4>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={5}>
          <FormGroup>
            <FormLabel>Nomor Barang</FormLabel>
            <FormControl ref={nomorBarang} onKeyUp={onDetailBarangByNumber} />
            <small className="form-text">
              Tekan enter untuk nmenambahkan item.
            </small>
          </FormGroup>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <WidgetCommonLoadingTable>
            <Table responsive={true} bordered={true} striped={true}>
              <thead>
                <tr>
                  <th>Nomor</th>
                  <th>Nama</th>
                  <th>Satuan</th>
                  <th>Harga Jual</th>
                  <th>Stok</th>
                  <th>Qty</th>
                  <th>Subtotal</th>
                  <th>#</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr key={item._id}>
                    <td>{item.nomor}</td>
                    <td>{item.nama}</td>
                    <td>{item.satuan}</td>
                    <td>{item.hargaJual}</td>
                    <td>{item.stok}</td>
                    <td>{item.qty}</td>
                    <td>{item.subtotal}</td>
                    <td>
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => onItemDelete(i)}
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </WidgetCommonLoadingTable>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={4}>
          <Table>
            <thead>
              <tr>
                <th>Total</th>
                <td>
                  <h5>{formatter.formatCurrency(totalKalkulasi)}</h5>
                </td>
              </tr>
              <tr>
                <th>Total</th>
                <td>
                  <FormControl
                    name="dibayar"
                    value={order.dibayar}
                    onChange={(e) =>
                      onChangeListener.onChangeNumber(e, order, setOrder)
                    }
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <Button onClick={onCreateOrder}>
                    <FaSave /> Simpan
                  </Button>
                </td>
              </tr>
            </thead>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default PageOrderCreate;
