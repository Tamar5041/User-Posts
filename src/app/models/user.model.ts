
export class User {

    id: number = 0;
    name: string = "";
    username: string = "";
    email: string = "";
    address = {
        street: "",
        suite: "",
        city: "",
        zipcode: "",
        geo: {
            lat: 0,
            lng: 0
        }
    };
    phone: string = "";
    website: string = "";
    company = {
        name: "",
        catchPhrase: "",
        bs: ""
    };
    
}
