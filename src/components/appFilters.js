import React, { Component } from 'react'
import { Sidebar, Accordion, Button, Input, Icon, Menu } from 'semantic-ui-react'

class AppFilters extends Component {
  constructor(props){
    super(props);
    props.registerToggleFiltersVisibility(this.toggleVisibility.bind(this));
    this.state = { activeIndex: 0, visible:true };
    this.searchData = this.searchData.bind(this);
    this.searchDataParent = props.searchData;
  }
  toggleVisibility = () => this.setState({ visible: !this.state.visible })
  activateContent= (index) => this.setState({ activeIndex:index });
  searchData(evt){
    evt.preventDefault();
    this.searchDataParent()
  }
  render() {
    return (
      <Sidebar as={Menu} animation='push' width='wide' visible={this.state.visible} icon='labeled' vertical >
        <Accordion styled>
          <Accordion.Title index={0} onClick={function(){ this.activateContent(0)}.bind(this)}>
            <Icon name='file text outline' color='blue'/>Factura
          </Accordion.Title>
          <Accordion.Content active={ this.state.activeIndex === 0} >
            <form onSubmit={this.searchData}>
              <Input focus placeholder='Nº de factura...' />
              <Button icon>
                <Icon name='search' />
              </Button>
            </form>
          </Accordion.Content>
          <Accordion.Title index={1} onClick={function(){ this.activateContent(1)}.bind(this)}>
            <Icon name='credit card' color='blue'/>Cuenta/Cliente
          </Accordion.Title>
          <Accordion.Content active={ this.state.activeIndex === 1} >
            <form onSubmit={this.searchData}>
              <Input focus placeholder='Nº cuenta' />
              <Button icon>
                <Icon name='search' />
              </Button>
            </form>
          </Accordion.Content>
        </Accordion>
      </Sidebar>
    )
  }
}

export default AppFilters;
