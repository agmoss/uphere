import * as dotenv from "dotenv";
import { UpHere } from "../index";


describe(UpHere.name, () => {

    const fileName = 'filename'

    beforeAll(async () => {
        dotenv.config();
    });

    it('should upload file', async () => {

        const accountName = process.env.ACCOUNT_NAME || "";
        const accountSas = process.env.ACCOUNT_SAS || "";
        const containerName = process.env.CONTAINER_NAME || "";

        const upHere = new UpHere(accountName, accountSas, containerName);

        const result = await upHere.uploadToAzure(new File([""], fileName));

        expect(result._tag).toBe("Right")

    })

    it('should delete blob', async () => {

        const accountName = process.env.ACCOUNT_NAME || "";
        const accountSas = process.env.ACCOUNT_SAS || "";
        const containerName = process.env.CONTAINER_NAME || "";

        const upHere = new UpHere(accountName, accountSas, containerName);

        const result = await upHere.deleteBlob(fileName)

        expect(result.errorCode).toEqual(undefined)

    })

})