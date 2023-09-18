import React from "react";
import { Container } from "react-bootstrap";
import PageHeader from "./PageHeader";
import PageBody from "./PageBody";

const FormPage = ({
  headerText = "Faça agora o seu login",
  invite,
  ...rest
}) => {
  return (
    <>
      <Container>
        <Container fluid className="L">
          <Container>
            <>
              <PageHeader {...{ headerText }} />
              <PageBody {...rest} />
            </>
          </Container>
        </Container>
      </Container>
    </>
  );
};

export default FormPage;
