import { OfficeParser } from "officeparser/slim";

export async function parseDocument(arrayBuffer: ArrayBuffer) {
  
    const ast = await OfficeParser.parseOffice(new Uint8Array(arrayBuffer));
    return ast;
 
}
