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
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  DropdownMenu,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";

const SHOW = "bg-primary fade toast d-inline-block m-1 show";
const HIDE = "bg-primary fade toast d-inline-block m-1 hide";

const ITA_ORG = 'ita2';
const FULL_ORG = 'stfull';
const EIGYOU2_ORG = 'eigyou2';
const EIGYOU3_ORG = 'eigyou3';

function App() {
  const [inputBranch, setInputBranch] = useState("");
  const [inputFrom, setInputFrom] = useState("");
  const [inputTo, setInputTo] = useState("");
  const [inputpackage, setInputpackage] = useState("");
  const [inputDeloy, setInputDeloy] = useState("");
  const [toastClass, setToastClass] = useState(HIDE);
  const [selectedOrg, setSelectedOrg] = useState(ITA_ORG);
  const [dropdownOpen, setDropdownOpen] = useState(false);


  useEffect(()=>{
    genHandel();
  },[selectedOrg])

  //選択リストの表示切り替え
  const toggle = () => {
    setDropdownOpen(prevState => !prevState);
  }

  const handleInput = (e) => {
    switch (e.target.id) {
      case "branch": {
        setInputBranch(e.target.value);
        break;
      }
      case "from": {
        setInputFrom(e.target.value);
        break;
      }
      case "to": {
        setInputTo(e.target.value);
        break;
      }
      default:
    }
  };

  const genHandel = () => {
    setInputDeloy(
      `sfdx force:source:deploy -x deploy_scripts/${inputBranch}/package/package.xml -u nam.nguyen@sunbridge.com.${selectedOrg} --postdestructivechanges deploy_scripts/${inputBranch}/destructiveChanges/destructiveChanges.xml --ignorewarnings`
    );
    setInputpackage(
      `mkdir deploy_scripts/${inputBranch} &&  sfdx sgd:source:delta --to ${inputTo} --from ${inputFrom} --output deploy_scripts/${inputBranch}`
    );
  };

  const copyToClipboard = (e) => {
    navigator.clipboard.writeText(e.target.value);
    setToastClass(SHOW);

    setTimeout(() => {
      setToastClass(HIDE);
    }, 2000);
  };

  const handleChageValuePickList = (e) =>{
    const selectedValue = e.target.innerHTML;
    setSelectedOrg(selectedValue);
  }

  return (
    <div style={{ marginTop: "1.5rem" }}>
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
                <Input
                  id="to"
                  name="to"
                  placeholder="To Commit"
                  type="text"
                  onChange={handleInput}
                />
              </FormGroup>
              <Button
                block
                className="mt-2"
                color="danger"
                outline
                onClick={genHandel}
              >
                Submit
              </Button>
            </Form>
          </Col>
          <Col xs="4">
            <UncontrolledDropdown className="me-2 org-selection" direction="down" isOpen={dropdownOpen} toggle={toggle} >
              <DropdownToggle caret color="primary">
                {selectedOrg}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={handleChageValuePickList}>{ITA_ORG}</DropdownItem>
                <DropdownItem onClick={handleChageValuePickList}>{FULL_ORG}</DropdownItem>
                <DropdownItem onClick={handleChageValuePickList}>{EIGYOU2_ORG}</DropdownItem>
                <DropdownItem onClick={handleChageValuePickList}>{EIGYOU3_ORG}</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Col>
        </Row>
        <Row>
          <Col xs="4"></Col>
          <Col xs="4">
            <Label for="gen">Gen Package.xml script</Label>
            <Input
              id="gen"
              name="text"
              type="textarea"
              value={inputpackage}
              readOnly
              onClick={copyToClipboard}
            />
          </Col>
        </Row>
        <Row>
          <Col xs="4"></Col>
          <Col xs="4">
            <Label for="deloy">Deloy script</Label>
            <Input
              id="deloy"
              name="text"
              type="textarea"
              value={inputDeloy}
              readOnly
              onClick={copyToClipboard}
            />
          </Col>
        </Row>
        <div
          className={toastClass}
          style={{
            position: "fixed",
            left: "50%",
            top: "10%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="toast-header">
            <strong className="mr-auto">コピー</strong>
          </div>
          <div className="toast-body">テキストをコピーしました。</div>
        </div>
      </Container>
    </div>
  );
}

export default App;
