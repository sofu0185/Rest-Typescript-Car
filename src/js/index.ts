import axios, { AxiosResponse, AxiosError } from '../../node_modules/axios/index';
import { ICar } from './ICar';

let contentElement: HTMLDivElement = <HTMLDivElement>document.getElementById('content');

function showAllCars(): void {
    axios.get<ICar[]>('https://webapicar20190326034339.azurewebsites.net/api/cars')
        .then(function(response: AxiosResponse<ICar[]>): void {
            contentElement.innerHTML = '<ul>';

            for(let i = 0; i < response.data.length; i++){
                let element: ICar = response.data[i];
                contentElement.innerHTML += `<li>Id: ${element.id}; Model: ${element.model}; Price: ${element.price}; Vendor: ${element.vendor}</li>`
            }
            contentElement.innerHTML += '</ul>'
        })
        .catch(function(error: AxiosError): void {
            console.error(error)
        });
}

function postCar(): void {
    //let car: ICar = { id: 0, model: 'y', price: 100, vendor: "Tesla"}
    let carModel: string = (<HTMLInputElement>document.getElementById('modelInput')).value;
    let carVendor: string = (<HTMLInputElement>document.getElementById('vendorInput')).value;
    let carPrice: number = +(<HTMLInputElement>document.getElementById('priceInput')).value;

    let car: ICar = {id: 0, model: carModel, vendor: carVendor, price: carPrice}
    axios.post('https://webapicar20190326034339.azurewebsites.net/api/cars', car)
    .then(function(response: AxiosResponse): void {
        console.log(response.statusText);
    });
}

function deleteCars(): void {
    axios.get<ICar[]>('https://webapicar20190326034339.azurewebsites.net/api/cars')
        .then(function(response: AxiosResponse<ICar[]>): void {
            for(let i = 1; i <= response.data.length; i++){
                let id: number = i + response.data[0].id;
                axios.delete('https://webapicar20190326034339.azurewebsites.net/api/cars/'+ id);
            }
        })
}
function deleteCar(): void {
    let id: number = +(<HTMLInputElement>document.getElementById('deleteId')).value
    axios.delete('https://webapicar20190326034339.azurewebsites.net/api/cars/' + id)
}

document.getElementById('getAllBtn').addEventListener('click', showAllCars);
document.getElementById('postBtn').addEventListener('click', postCar);
document.getElementById('deleteAllBtn').addEventListener('click', deleteCars);
document.getElementById('deleteBtn').addEventListener('click', deleteCar);

//showAllCars();