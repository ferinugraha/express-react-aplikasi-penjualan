import { useContext, useState } from "react";
import { ContextApplication } from "../../libs/config/contexts";
import { Button, Form, Modal } from "react-bootstrap";
import useJWT from "../../libs/hooks/useJWT";
import useHTTP from "../../libs/hooks/useHTTP";
import useMessage from "../../libs/hooks/useMessage";
import useChangeListener from "../../libs/hooks/useChangeListener";
import { UserInit, UserValidator } from "../../data/UserData";
import useValidator from "../../libs/hooks/useValidator";
import { BASE_URL } from "../../libs/config/settings";

const WidgetUserSignInModal = () => {
  const application = useContext(ContextApplication);
  const jwt = useJWT();
  const http = useHTTP();
  const message = useMessage();
  const changeListener = useChangeListener();

  const [user, setUser] = useState(UserInit);
  const userValidator = useValidator(UserValidator);

  const signIn = () => {
    userValidator.reset();

    const url = `${BASE_URL}/user/signin/`;

    http.publicHTTP
      .post(url, user)
      .then((response) => {
        jwt.set(response.data.token);
        application.setIsAuthenticated(true);
        console.log(response.data.token);
      })
      .catch((error) => {
        message.error(error);
        userValidator.except(error);
      });
  };

  return (
    <>
      <Modal
        show={!application.isAuthenticated}
        centered={true}
        onHide={() => {}}
        backdrop={"static"}
      >
        <Modal.Header closeButton>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              value={user.email}
              onChange={(e) => changeListener.onChangeText(e, user, setUser)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={user.password}
              onChange={(e) => changeListener.onChangeText(e, user, setUser)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={signIn}>
            Sign In
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default WidgetUserSignInModal;
