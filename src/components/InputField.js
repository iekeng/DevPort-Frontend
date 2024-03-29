import Form from 'react-bootstrap/Form';

export default function InputField(
  { name, label, type, placeholder, error, value , onChange, rows, as}
  ){
  return (
    <Form.Group controlId={name} className="InputField">
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        name={name}
        type={type || 'text'}
        placeholder={placeholder}
        rows={rows}
        value={value}
        onChange={onChange} 
        as={as}
      />
      <Form.Text className="text-danger">{error}</Form.Text>
    </Form.Group>
  );
}