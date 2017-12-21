import _ from 'lodash';
var Faker = require('faker');

//Faker.setLocale("es")
const data = generateFakeData();
function generateFakeData(){
  var data = fakeDataRootObject(_.random(10,30));
  return _.mapValues(data, (o)=> GenerateFakeInvoicesFor(_.random(3,20),o.customerName));
}
function fakeDataRootObject(numberOfCustomers){
  var data =   _.times(numberOfCustomers, ()=>{
    return {
      customerAccount:Faker.finance.account(),
      customerName:Faker.company.companyName()
    }
  });
  return _.reduce(data, (a,i)=>{
      a[i.customerAccount]={
        customerName: i.customerName
      };
      return a;
  },{})
}
function GenerateFakeInvoicesFor(numberOfInvoices, customerName){
  return _.times(numberOfInvoices, ()=>{
    return {
      year: "2017",
      invoiceNumber: Faker.random.number(),
      customerName:customerName ,
      fechaFactura:Faker.date.past(),
      fechaVencimiento: Faker.date.past(),
      customerName:Faker.company.companyName(),
      diasPago:Faker.random.number(),
      importeNoReembolsado: Faker.commerce.price(),
      tipo:11,
      vendedorAsignadoUno:"364",
      vendedorAsignadoDos:"0",
      state:_.random(1,3),
      reclamaciones:[]
    }
  });
}
const Unpayments = {
  fetchAll:()=>{
    return new Promise(function(resolve,reject){
      window.setTimeout(()=>{
        resolve(data);
      },1000);
    })
  }
}


export default Unpayments
