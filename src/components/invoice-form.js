import React, { Component } from 'react'
import { Modal, Form, Checkbox,  Button} from 'semantic-ui-react'

class InvoiceForm extends Component {
  constructor(props){
    super(props);
    this.state = {invoice:props.invoice||{}, modalOpened:true}
    this.close = this.close.bind(this);
  }
  close(){
    this.props.invoice = {}
    this.setState({modalOpened:false});
  }
  render() {
    if(!this.props.invoice || !this.props.invoice.invoiceNumber) return <div></div>
    return (
      <Modal dimmer='blurring' open={true} onClose={this.close}>
         <Modal.Header>Edición factura {this.props.invoice.invoiceNumber} del cliente {this.props.invoice.customerName}</Modal.Header>

         <Modal.Content>
           <Form>
            <Form.Field>
              <label>Fecha Factura</label>
              <input placeholder='Fecha de la factura' />
            </Form.Field>
            <Form.Field>
              <label>Fecha Vencimiento</label>
              <input placeholder='Fecha del vencimiento' />
            </Form.Field>
            <Form.Field>
              <Checkbox label='I agree to the Terms and Conditions' />
            </Form.Field>
          </Form>
         </Modal.Content>
         <Modal.Actions>
           <Button color='black' onClick={this.close}> Cancelar</Button>
           <Button positive icon='checkmark' labelPosition='right' content="Guardar" onClick={this.close} />
         </Modal.Actions>
       </Modal>
    )
  }
}

export default InvoiceForm;
