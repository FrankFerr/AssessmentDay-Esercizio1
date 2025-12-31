import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import type { ICustomerFilterProps } from './ICustomerFilterProps'
import { CustomerFilter } from "./CustomerFilter";

export default function CustomersFilterComp({ onFilter }: ICustomerFilterProps){
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch(e.target.name){
            case "name": setName(e.target.value)
                         break
            case "email": setEmail(e.target.value)
                          break
        }
    }

    const onButtonClicked = () => {
        const customerFilter = new CustomerFilter(name, email)

        onFilter(customerFilter)
    }

    return (
        <Box sx={{ display: 'flex', gap: '1rem', mb: 2 }}>
            <TextField 
                name="name" 
                onChange={handleInputChange} 
                value={name}
                placeholder="Name"
                size="small"
            />
            <TextField 
                name="email"  
                onChange={handleInputChange} 
                value={email}
                type="email"
                placeholder="Email"
                size="small"
            />
            <Button variant="outlined" color="info" onClick={onButtonClicked}>Filtra</Button>
        </Box>
    )
}