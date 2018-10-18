import { environment } from '../../environments/environment';

export class Pokemon {
    name: string;
    id: number;
    types = [];
    stats = [];

    constructor() { }

    capitalizeName() {
        return this.name ?
            this.name.charAt(0).toUpperCase() + this.name.slice(1) : '';
    }

    getImage() {
        return environment.urls.sprite + this.id + '.png';
    }
}
