import { Paper, Table, TableContainer, TableHead, TableRow, Typography, TableCell, TableBody, Box } from "@mui/material"
import { useEffect, useState } from "react"
import CustomersFilterComp from "../components/CustomersFilterComp/CustomersFilterComp";
import { CustomerFilter } from "../components/CustomersFilterComp/CustomerFilter";
import ExportXmlComp from "../components/ExportXmlComp/ExportXmlComp";
import { ElementCompact } from "xml-js";
import { StyledTableHeadCell } from '../utility/StyledComponents'

interface CustomerListQuery{
    id: number,
    name: string,
    address: string,
    email: string,
    phone: string,
    iban: string
}

export default function CustomerListPage() {
    const [customerList, setCustomerList] = useState<CustomerListQuery[]>([])
    const [customerFilter, setCustomerFilter] = useState<CustomerFilter>(new CustomerFilter("", ""))
    const [isLoading, setLoadingState] = useState<boolean>(true)

    useEffect(() => {
        let url = "/api/customers/list"
        url = customerFilter.ApplyFilter(url)

        fetch(url)
        .then((response) => response.json())
        .then((data) => setCustomerList(data as CustomerListQuery[]))
        .finally(() => setLoadingState(false))
    }, [customerFilter])

    const onFilter = (filter: CustomerFilter) => {
        setCustomerFilter(filter)
    }

    const onExportXml = () => {
        const xmlData: ElementCompact = {
            _declaration: { _attributes: { version: '1.0', encoding: 'utf-8' } },
            customers: {
                customer: customerList.map((customer) => ({
                    name: { _text: customer.name },
                    address: { _text: customer.address },
                    email: { _text: customer.email },
                    phone: { _text: customer.phone },
                    iban: { _text: customer.iban }
                }))
            }
        }

        return xmlData
    }

    return <>
        <Typography variant="h4" sx={{ textAlign: "center", mt: 4, mb: 4}}>
            Customers
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: "1rem" }}>
            <CustomersFilterComp onFilter={onFilter}></CustomersFilterComp>
            <ExportXmlComp getXmlData={onExportXml} filename="customers.xml"></ExportXmlComp>
        </Box>

        {
            isLoading ?
            <Typography variant="h3" sx={{ textAlign: "center", mt: 8}}>Loading data...</Typography> :
            <TableContainer component={Paper} sx={{ maxHeight: '70vh' }}>
                <Table sx={{ minWidth: 650 }} aria-label="customers table" stickyHeader>
                    <TableHead>
                        <TableRow>
                            <StyledTableHeadCell>Name</StyledTableHeadCell>
                            <StyledTableHeadCell>Address</StyledTableHeadCell>
                            <StyledTableHeadCell>Email</StyledTableHeadCell>
                            <StyledTableHeadCell>Phone</StyledTableHeadCell>
                            <StyledTableHeadCell>Iban</StyledTableHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customerList.map((customer) => 
                            <TableRow key={customer.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                <TableCell>{customer.name}</TableCell>
                                <TableCell>{customer.address}</TableCell>
                                <TableCell>{customer.email}</TableCell>
                                <TableCell>{customer.phone}</TableCell>
                                <TableCell>{customer.iban}</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        }
    </>
}