import { Paper, Table, TableContainer, TableHead, TableRow, Typography, styled, TableCell, tableCellClasses, TableBody } from "@mui/material"
import { useEffect, useState } from "react"
import CustomersFilterComp from "../components/CustomersFilterComp/CustomersFilterComp";
import { CustomerFilter } from "../components/CustomersFilterComp/CustomerFilter";

interface CustomerListQuery{
    id: number,
    name: string,
    address: string,
    email: string,
    phone: string,
    iban: string
}

const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
}));


export default function CustomerListPage() {
    const [customerList, setCustomerList] = useState<CustomerListQuery[]>([])
    const [customerFilter, setCustomerFilter] = useState<CustomerFilter>(new CustomerFilter("", ""))

    useEffect(() => {
        let url = "/api/customers/list"
        url = customerFilter.ApplyFilter(url)

        fetch(url)
        .then((response) => response.json())
        .then((data) => setCustomerList(data as CustomerListQuery[]))
    }, [customerFilter])

    const onFilter = (filter: CustomerFilter) => {
        setCustomerFilter(filter)
    }

    return <>
        <Typography variant="h4" sx={{ textAlign: "center", mt: 4, mb: 4}}>
            Customers
        </Typography>

        <CustomersFilterComp onFilter={onFilter}></CustomersFilterComp>

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
    </>
}