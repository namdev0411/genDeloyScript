import "./App.css";
import * as React from "react";
import { useState } from "react";
import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [inputBranch, setInputBranch] = useState('');
  const [inputFrom, setInputFrom] = useState('');
  const [inputTo, setInputTo] = useState('');
  const [inputpackage, setInputpackage] = useState('');
  const [inputDeloy, setInputDeloy] = useState('');


  const handleInput = (e)=>{
    switch(e.target.id){
      case 'branch': {
        setInputBranch(e.target.value);
        break;
      }
      case 'from': {
        setInputFrom(e.target.value);
        break;
      }
      case 'to': {
        setInputTo(e.target.value);
        break;
      }
      default:
    }
  }

  const genHandel = ()=>{
    setInputDeloy(`sfdx force:source:deploy -x deploy_scripts/${inputBranch}/package/package.xml -u nam.nguyen@sunbridge.com.eigyou1 --postdestructivechanges deploy_scripts/${inputBranch}/destructiveChanges/destructiveChanges.xml --ignorewarnings`);
    setInputpackage(`mkdir deploy_scripts/${inputBranch} &&  sfdx sgd:source:delta --to ${inputTo} --from ${inputFrom} --output deploy_scripts/${inputBranch}`)
  }
  return (
    <Container>
      <Row>
        <Col xs="4"></Col>
        <Col xs="4">
          <Form inline>
            <FormGroup className="mb-2 me-sm-2 mb-sm-0">
              <Label className="me-sm-2" for="exampleEmail">
                Branch
              </Label>
              <Input
                id="branch"
                name="branch"
                placeholder="TEC_FEIT-1750"
                type="text"
                onChange={handleInput}
              />
            </FormGroup>
            <FormGroup className="mb-2 me-sm-2 mb-sm-0">
              <Label className="me-sm-2" for="examplePassword">
                From
              </Label>
              <Input
                id="from"
                name="from"
                placeholder="From Commit"
                type="text"
                onChange={handleInput}
              />
            </FormGroup>
            <FormGroup className="mb-2 me-sm-2 mb-sm-0">
              <Label className="me-sm-2" for="examplePassword">
                To
              </Label>
              <Input id="to" name="to" placeholder="To Commit" type="text"  onChange={handleInput}/>
            </FormGroup>
            <Button block className="mt-2" color="danger" outline onClick={genHandel}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col xs="4"></Col>
        <Col xs="4">
          <Label for="gen">Gen Package.xml script</Label>
          <Input id="gen" name="text" type="textarea" value={inputpackage} readOnly/>
        </Col>
      </Row>
      <Row>
          <Col xs="4"></Col>
          <Col xs="4">
            <Label for="deloy">Deloy script</Label>
            <Input id="deloy" name="text" type="textarea" value={inputDeloy} readOnly/>
          </Col>
        </Row>
    </Container>
  );
}

export default App;
