import { Button } from 'react-bootstrap';

const CancelButton = (props) => {
  const { text, onClick } = props;
  return (
    <Button variant="secondary" onClick={onClick}>
      { text }
    </Button>
  )
};

export default CancelButton;