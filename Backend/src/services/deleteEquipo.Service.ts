import { IDeleteTaks } from "../repositories/DeleteTaks";




export class DeleteTaksService implements IDeleteTaks {
    constructor(private readonly deleteRepo: IDeleteTaks) { }

    async deleteTaks(id: any): Promise<void> {
        await this.deleteRepo.deleteTaks(id);
    }
}