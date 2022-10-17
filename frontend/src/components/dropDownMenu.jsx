import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';

const DropDownMenu = (props) => {
  return (
    <>
    <div x-placement="bottom-start" 
         aria-labelledby={props.dropDownId} 
         className="dropdown-menu" 
         data-popper-reference-hidden="false" 
         data-popper-escaped="false" 
         data-popper-placement="bottom-start" 
         >
      <a data-rr-ui-dropdown-item="" className="dropdown-item" role="button" tabIndex="0" href="#">Удалить</a>
      <a data-rr-ui-dropdown-item="" className="dropdown-item" role="button" tabIndex="0" href="#">Переименовать</a>
    </div>
    </>
  )
};

export default DropDownMenu;

/*
style="position: absolute; inset: 0px auto auto 0px; transform: translate(173px, 40px);

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';

function SplitBasicExample() {
  return (
    <Dropdown as={ButtonGroup}>
      <Button variant="success">Split Button</Button>

      <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default SplitBasicExample;
*/