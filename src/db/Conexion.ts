import mongoose from "mongoose";

export class ConexionDb {
    private readonly url:string;
    constructor(url:string) {
        this.url = url
     }

    async connect() {

        try {
            await mongoose.connect(this.url);
            console.log('Conexión exitosa a la base de datos MongoDB');
        } catch (error) {
            console.error('Error al conectar a la base de datos MongoDB:', error);
        }
        const db = mongoose.connection;
        return db;
    }

    disconnect(): void {
        mongoose.disconnect();
        console.log('Desconexión exitosa de la base de datos MongoDB');
    }

}
