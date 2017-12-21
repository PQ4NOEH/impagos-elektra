import React, { Component } from 'react';
import _ from 'lodash';
import { Segment, Header, Image, Dimmer, Loader, Table, Icon } from 'semantic-ui-react';
import InvoiceForm from './invoice-form';
const renderEmptyGrid=()=> <Image centered src='http://2.bp.blogspot.com/-8V4pm7zIuZg/Uqmzaa9XNBI/AAAAAAAAAE0/L8N_tev5O6g/s1600/cobro-tus-deudas.jpg' />
const tableButtons=(i, props)=>{
  if(i.state != 2){
    return <Table.Cell>
      <Icon name="write" color="blue" onClick={function(){props.setSelectedInvoice(i)}}/>
      <Icon name="archive" color="blue" />
    </Table.Cell>
  }
  else{
    return <Table.Cell>
      <Icon name="folder open outline" color="blue" />
    </Table.Cell>
  }
}
const renderSearching=()=> {
    return <Dimmer active>
        <Loader size='large'>Buscando</Loader>
      </Dimmer>
  }
const invoiceClass=(invoiceState)=>{
  if(invoiceState === 1) return "invoice-warning";
  else if(invoiceState === 2) return "invoice-pending";
  return "invoice-archived";
}
const customerInvoices=(invoices, props)=>{
  return invoices.map(i=>{
    return <Table.Row className={invoiceClass(i.state)}>
        <Table.Cell textAlign='center'>{ i.year }</Table.Cell>
        <Table.Cell textAlign='center'>{ i.invoiceNumber }</Table.Cell>
        <Table.Cell textAlign='center'>{ i.fechaFactura.toDateString() }</Table.Cell>
        <Table.Cell textAlign='center'>{ i.fechaVencimiento.toDateString() }</Table.Cell>
        <Table.Cell textAlign='center'>{ i.diasPago }</Table.Cell>
        <Table.Cell textAlign='center'>{ i.importeNoReembolsado }</Table.Cell>
        <Table.Cell textAlign='center'>{ i.tipo }</Table.Cell>
        <Table.Cell textAlign='center'>{ i.vendedorAsignadoUno }</Table.Cell>
        <Table.Cell textAlign='center'>{ i.vendedorAsignadoDos }</Table.Cell>
        <Table.Cell textAlign='center'>{ i.reclamaciones.length }</Table.Cell>
        {tableButtons(i, props)}
      </Table.Row>
  })
}
const customerTableHeader=()=>{
  return <Table.Header>
    <Table.Row>
      <Table.HeaderCell>Año</Table.HeaderCell>
      <Table.HeaderCell>Nº factura</Table.HeaderCell>
      <Table.HeaderCell>Fecha factura</Table.HeaderCell>
      <Table.HeaderCell>Fecha Vencimiento</Table.HeaderCell>
      <Table.HeaderCell>Dias de pago</Table.HeaderCell>
      <Table.HeaderCell>Importe pendiente</Table.HeaderCell>
      <Table.HeaderCell>Tipo</Table.HeaderCell>
      <Table.HeaderCell>Vendedor asignado uno</Table.HeaderCell>
      <Table.HeaderCell>Vendedor asignado dos</Table.HeaderCell>
      <Table.HeaderCell>Reclamaciones</Table.HeaderCell>
      <Table.HeaderCell></Table.HeaderCell>
    </Table.Row>
  </Table.Header>
}
const renderGrid=(props)=>{
  return _.toPairs(props.data).map((pair)=>{
    return <div>
        <Header as='h3' textAlign='left'>{pair[1][0].customerName}</Header>
        <Table celled inverted selectable>
          { customerTableHeader() }
          <Table.Body>
            {customerInvoices(pair[1],props)}
          </Table.Body>
        </Table>
      </div>
  })
}
const searchResultBody=(props)=>{
  return <div>
    <InvoiceForm invoice={props.selectedInvoice}/>
    {renderGrid(props)}
  </div>
}
const renderData=(props)=>{
    if(props.searching) return renderSearching();
    else if(props.data.length==0) return renderEmptyGrid();
    else return searchResultBody(props);
  }
const SearchResults=(props)=>{
  return <Segment basic>
    { renderData(props) }
  </Segment>
}
export default SearchResults;
