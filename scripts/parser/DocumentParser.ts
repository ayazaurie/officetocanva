import OfficeParser from "officeparser";

const officeParser = require('officeparser');

export async function parseDocument(file: File) {
    try {
        const buffer = await file.arrayBuffer();
        const ast = await OfficeParser.parseOffice(new Uint8Array(buffer));
        return ast;
    }

    
}