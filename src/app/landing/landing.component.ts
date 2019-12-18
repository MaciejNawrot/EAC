import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
    carDataForm: FormGroup;
    carAccompanyingFees: Comparsion;

    fuelCostsForm: FormGroup;
    fuelCostsComparsion: Comparsion;

    totalReduction;

    constructor() {
    }

    ngOnInit() {
        this.carDataForm = new FormGroup({
            carCost: new FormControl(null, [
                Validators.required,
            ]),
            isOver2L: new FormControl(false),
        });

        this.fuelCostsForm = new FormGroup({
            kilometers: new FormControl(null, [
                Validators.required,
            ]),
            fuelPrice: new FormControl(null, [
                Validators.required,
            ]),
            averageCombustion: new FormControl(null, [
                Validators.required,
            ]),
        });
    }

    setCarAccompanyingFees() {
        console.log(this.carDataForm);
        const carCost = this.carDataForm.controls.carCost.value;
        const isOver2L = this.carDataForm.controls.isOver2L.value;
        const carCostModifier = isOver2L ? 1.44 : 1.32;
        this.carAccompanyingFees = {
            eac: this.calculateSafe(carCost * carCostModifier + 600, 2),
            normal: this.calculateSafe(carCost * (carCostModifier + 0.13) + 1100, 2),
        };
        this.calculateTotalReduction();
        console.log(this.carAccompanyingFees);
    }

    setFuelCostsComparsion() {
        console.log(this.fuelCostsForm);
        const kilometers = this.fuelCostsForm.controls.kilometers.value;
        const fuelPrice = this.fuelCostsForm.controls.fuelPrice.value;
        const averageCombustion = this.fuelCostsForm.controls.averageCombustion.value;

        this.fuelCostsComparsion = {
            eac: this.calculateSafe((kilometers / 100) * (fuelPrice * 0.9) * averageCombustion, 2),
            normal: this.calculateSafe((kilometers / 100) * fuelPrice * averageCombustion, 2),
        };

        this.calculateTotalReduction();
        console.log(this.fuelCostsComparsion);
    }

    calculateTotalReduction() {
        const carFeesReduction = this.carAccompanyingFees ? this.carAccompanyingFees.eac : 0;
        const fuelReduction = this.fuelCostsComparsion ? this.fuelCostsComparsion.eac : 0;
        this.totalReduction = carFeesReduction + fuelReduction;
    }

    calculateSafe(value: number, precision = 2): number {
        return parseFloat(value.toFixed(precision));
    }

}

interface Comparsion {
    eac: number;
    normal: number;
}
