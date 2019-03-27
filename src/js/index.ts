import axios, { AxiosResponse, AxiosError } from '../../node_modules/axios/index';
import { ICar } from './ICar';

let contentElement: HTMLDivElement = <HTMLDivElement>document.getElementById('content');

function showAllCars(): void {
    axios.get<ICar[]>('https://webapicar20190326034339.azurewebsites.net/api/cars')
        .then(function(response: AxiosResponse<ICar[]>): void {
            console.log(response.data)
        })
        .catch(function(error: AxiosError): void {
            console.error(error)
        });
}

showAllCars();