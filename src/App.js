import React, { Component } from 'react';
import logo from './logoelektra.png';
import AppFilters from './components/appFilters';
import SearchResult from './components/searchResult';
import Unpayments from './repositories/unpayments';
import './App.css';
import { Sidebar, Button, Icon, Segment } from 'semantic-ui-react'

let toggleFiltersVisibilityCb = ()=>{};
class App extends Component {
  constructor(props){
    super(props);
    this.state = {searchResultData:[], searching:false, selectedInvoice:{}}
    this.toggleFiltersVisibility = this.toggleFiltersVisibility.bind(this);
    this.searchData = this.searchData.bind(this);
    this.setDataState = this.setDataState.bind(this);
    this.setSelectedInvoice = this.setSelectedInvoice.bind(this);
  }
  setDataState(data){
    this.setState({searchResultData:data, searching:false});
  }
  searchData(){
    this.setState({searching:true});
    Unpayments
      .fetchAll()
      .then(this.setDataState);
  }
  toggleFiltersVisibility= ()=> toggleFiltersVisibilityCb();
  registerToggleFiltersVisibilityCb=(cb)=> toggleFiltersVisibilityCb = cb;
  setSelectedInvoice(invoice){
    this.setState({selectedInvoice:invoice});
  }
  render() {
    return <div className="App">
        <header className="App-header">
         <img src={logo} className="App-logo" alt="logo" />
         <h1 className="App-title">Impagos de clientes</h1>
         <div className="header-toolbox">
             <Icon name='exchange'  onClick={this.toggleFiltersVisibility}/>
         </div>
       </header>
        <Sidebar.Pushable as={Segment}  style={{clear:"both"}}>
            <AppFilters registerToggleFiltersVisibility = {this.registerToggleFiltersVisibilityCb} searchData= {this.searchData}/>
            <Sidebar.Pusher>
              <SearchResult
                data={this.state.searchResultData}
                searching={this.state.searching}
                setSelectedInvoice={this.setSelectedInvoice}
                selectedInvoice={this.state.selectedInvoice}/>
            </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
  }
}

export default App;
