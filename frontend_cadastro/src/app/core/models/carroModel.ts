import {Deserializable} from './Deserializable';

export class Carro implements Deserializable{
  carro_id: number;
  placa: string;
  chassi: string;
  renavam: string;
  modelo: string;
  marca: string;
  ano: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
