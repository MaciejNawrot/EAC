import { SneakersPair } from './user.service';

export interface User {
  uid: number;
  name: string;
  password: string;
  isLogged: boolean;
  sneakers: SneakersPair[];
  totalCost?: number;
}

export class User {
  constructor(
    public uid: number,
    public password: string,
    public name: string,
    public isLogged: boolean,
    public sneakers: SneakersPair[],
    public totalCost?: number,
    ) {}
}


