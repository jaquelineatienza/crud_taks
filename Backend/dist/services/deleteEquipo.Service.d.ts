import { IDeleteTaks } from "../repositories/DeleteTaks";
export declare class DeleteTaksService implements IDeleteTaks {
    private readonly deleteRepo;
    constructor(deleteRepo: IDeleteTaks);
    deleteTaks(id: any): Promise<void>;
}
//# sourceMappingURL=deleteEquipo.Service.d.ts.map