import { InitPostgresOptions, initPostgres } from "./postgresql"

export interface InitDataSourcesOptions {
    postgres?: InitPostgresOptions,
}

let dbInstace: any;
export const initDataSources = async ({
    postgres
}: InitDataSourcesOptions) => {
    if(postgres){
        const db =await initPostgres(postgres);
        dbInstace = db;
    }
}






export default dbInstace;