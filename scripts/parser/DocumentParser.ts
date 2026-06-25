import {OfficeParser} from "officeparser";



export async function parseDocument(arrayBuffer: ArrayBuffer) {
    try {
        const ast = await OfficeParser.parseOffice(new Uint8Array(arrayBuffer));
        return ast;
    }
     catch (error) {
        console.error("Parsing failed:", error);
        throw error;
    }

    
}