// We are trying to create a in memory database just to store simple information of users in a key, value pair format.

// Let us say the kind of data we are trying to store is in this format
// key: string
// value: { fname, lname, email, contact: { mobile }, address: { street, pincode, country } }
// Now over here the key is a simple string and we can say the map about its type but what about the value
// Now here comes interface which helps us to define how our value is going to look like - a custom type


type userId = string

interface User {
    id: userId,
    fname: string,
    lname?: string,
    email: string,
    contact: {
        mobile: string
    },
    address: {
        street: number,
        pincode: number,
        country: string
    }
}

class InMemoryDB {

    private _db: Map<userId, User>

    constructor() {

    }
    // Here since the isertion operation can be DB operation we chose async and we wanted the function to return a promise
    // And in the promise it returns the inserted userid
    /*    
        public async insertUser(data: User): Promise<userId>{
    
            if(this._db.has(data.id)){
                throw new Error(`User with id:${data.id} already exists`)
            }
    
            this._db.set(data.id, data) 
            return data.id
        }
    */
    public insertUser(data: User): userId {

        if (this._db.has(data.id)) {
            throw new Error(`User with id:${data.id} already exists`)
        }

        this._db.set(data.id, data)
        return data.id
    }
    
    // Here Omit is used, since while updating the entire user data is incoming but we should not allow the id to be updated 
    // Omitting it makes the updateUser method not to accept the incoming data with id

    public updateUser(id: userId, updateData: Omit<User,'id'>): boolean{

        if(!this._db.has(id)){
            throw new Error(`User with id: ${id} does not exist`);
        }
    // over here we again destruct the incoming data object and add id field so that we can access the user data while querying via id    
        this._db.set(id,{...updateData, id});
        return true;
    }

    public getUserById(id: userId): User{
        if(!this._db.has(id)){
            throw new Error(`User with id: ${id} does not exist`);
        }

        return this._db.get(id)!;
    }
}

const myDB = new InMemoryDB();

myDB.insertUser({
    id: '0001',
    fname: 'Surya',
    // lname: 'Prakash',
    email:'surya@example.com',
    contact:{mobile: '1234567890'},
    address:{
        street: 10,
        pincode: 535002,
        country: 'India'
    }
})

myDB.updateUser('1',{
    fname: 'Surya',
    email:'surya@gmail.com',
    contact:{mobile: '1234567890'},
    address:{
        street: 10,
        pincode: 535002,
        country: 'India'
    }
})