import type { CustomerFilter } from './CustomerFilter'

export interface ICustomerFilterProps{
    onFilter: (f: CustomerFilter) => void
}