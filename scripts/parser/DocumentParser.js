import { OfficeParser } from "officeparser/slim";

export async function parseDocument(arrayBuffer) {
  const ast = await OfficeParser.parseOffice(new Uint8Array(arrayBuffer));
  const textContent = JSON.stringify(ast)
  const parseData = JSON.parse(textContent);
  return parseData;
}

