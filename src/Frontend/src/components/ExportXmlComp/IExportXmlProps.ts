import { ElementCompact } from "xml-js"

export interface IExportXmlProps{
    getXmlData: () => ElementCompact
    filename: string
}