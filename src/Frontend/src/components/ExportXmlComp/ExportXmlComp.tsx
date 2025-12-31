import { ElementCompact, js2xml } from "xml-js"
import { IExportXmlProps } from "./IExportXmlProps"
import { Button } from "@mui/material"

export default function ExportXmlComp({ getXmlData, filename }: IExportXmlProps){

    const onClickExport = () => {
        const xmlData: ElementCompact = getXmlData()

        const xml = js2xml(xmlData, { compact: true, spaces: 2 })

        const file = new Blob([xml], { type: 'application/xml' })
        
        const url = URL.createObjectURL(file)

        const link = document.createElement('a')
        link.href = url
        
        if(!filename.endsWith(".xml")){
            filename += ".xml"
        }
        
        link.download = filename
        link.click()

        URL.revokeObjectURL(url)
    }

    return <Button variant="contained" color="primary" onClick={onClickExport}>XML</Button>
}