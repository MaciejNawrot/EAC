import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
    menuOpen = false;
    mode: 'business' | 'normal' | '' = '';
    comparsionOpen = true;
    carDataForm: FormGroup;
    carAccompanyingFees: Comparsion = {
        eac: 0,
        normal: 0
    };

    fuelCostsForm: FormGroup;
    fuelCostsComparsion: Comparsion = {
        eac: 0,
        normal: 0
    };

    carCost: number;
    totalReduction;

    constructor() {
    }

    ngOnInit() {
        this.carDataForm = new FormGroup({
            carCost: new FormControl(10000, [
                Validators.required,
            ]),
            isOver2L: new FormControl(false),
        });

        this.fuelCostsForm = new FormGroup({
            kilometers: new FormControl(1000, [
                Validators.required,
            ]),
            fuelPrice: new FormControl(4.91, [
                Validators.required,
            ]),
            averageCombustion: new FormControl(6.2, [
                Validators.required,
            ]),
        });
        this.setCarAccompanyingFees();
        this.setFuelCostsComparsion();
    }

    setMode(mode: 'business' | 'normal' | '', target) {
        this.mode = mode;
        this.menuOpen = false;
        this.setCarAccompanyingFees();
        this.setFuelCostsComparsion();
        setTimeout(() => {
            target.scrollIntoView({behavior: 'smooth'});
        }, 10);
    }

    scrollTop(target) {
        target.scrollIntoView({behavior: 'smooth'});
    }

    toggleMenu() {
        this.menuOpen = !this.menuOpen;
    }

    toggleComparsion() {
        this.comparsionOpen = !this.comparsionOpen;
    }

    onSubmitCarData() {
        this.setCarAccompanyingFees();
    }

    onSubmitFuelCosts() {
        this.setFuelCostsComparsion();
    }

    setCarAccompanyingFees() {
        console.log(this.carDataForm);
        this.carCost = this.carDataForm.controls.carCost.value;
        const isOver2L = this.carDataForm.controls.isOver2L.value;
        const eacCarCostModifier = this.generateCacCarCostModifier(isOver2L);
        const inPolandCarCostModifier = this.generateNormalCarCostModifier(isOver2L);
        const eacBaseFee = 150;
        const inPolandBaseFee = 400;
        this.carAccompanyingFees = {
            eac: this.calculateSafe(this.carCost * eacCarCostModifier + eacBaseFee, 2),
            normal: this.calculateSafe(this.carCost * (inPolandCarCostModifier ) + inPolandBaseFee, 2),
        };
        this.calculateTotalReduction();
        console.log(this.carAccompanyingFees);
    }

    setFuelCostsComparsion() {
        if (this.mode === 'business') {
            this.fuelCostsComparsion = {
                eac: 0,
                normal: 0,
            };
            return;
        }

        const kilometers = this.fuelCostsForm.controls.kilometers.value;
        const fuelPrice = this.fuelCostsForm.controls.fuelPrice.value;
        const averageCombustion = this.fuelCostsForm.controls.averageCombustion.value;

        this.fuelCostsComparsion = {
            eac: this.calculateSafe((kilometers / 100) * (fuelPrice * 0.9) * averageCombustion, 2),
            normal: this.calculateSafe((kilometers / 100) * fuelPrice * averageCombustion, 2),
        };

        this.calculateTotalReduction();
    }

    calculateTotalReduction() {
        const carFeesReduction = this.carAccompanyingFees ? this.carAccompanyingFees.eac : 0;
        const fuelReduction = this.fuelCostsComparsion ? this.fuelCostsComparsion.eac : 0;
        this.totalReduction = carFeesReduction + fuelReduction;
    }

    calculateSafe(value: number, precision = 2): number {
        return parseFloat(value.toFixed(precision));
    }

    generateCacCarCostModifier(isOver2L: boolean): number {
        let modifier = 1;

        if (!this.mode || this.mode === 'normal') {
            modifier = isOver2L ? 1.08 : 1.015;
        }

        if (this.mode === 'business') {
            modifier = isOver2L ? 1.035 : 1;
        }

        return modifier;
    }

    generateNormalCarCostModifier(isOver2L: boolean): number {
        return isOver2L ? 1.186 : 1.031;
    }

}

interface Comparsion {
    eac: number;
    normal: number;
}


