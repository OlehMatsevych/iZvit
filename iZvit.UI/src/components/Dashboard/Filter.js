import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { reportsAPI } from "../../api/api"
import style from './Home.module.css'

export const Filter = ({ filterBy, filterValue, setFilterBy, setFilterValue, setFilteredReports }) => {

    const filterChange = (e) => {
        setFilterValue(e.target.value)
    }


    const handleFilter = (e) => {
        setFilterBy(e.target.value)
    }

    const filterReports = () => {
        const data = {
            filterBy: filterBy,
            filterValue: filterValue
        }
        if (filterBy === 'All') {
            setFilteredReports([])
        } else {
            reportsAPI.filterReports(data).then(response => {
                setFilteredReports(response.data);
            })
        }
    }

    return (
        <div>
            <div className={style.filterContainer}>
                <FormControl>
                    <InputLabel sx={{ boxShadow: 'none', '#demo-simple-select-labele': { 
                            color: "white"
                        } }} 
                        id="demo-simple-select-label">Filter By</InputLabel>
                    <Select
                        sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { 
                            borderRight: 0, 
                            borderRadius: '3px 0 0 3px'
                        } }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={filterBy}
                        label="Filter By"
                        onChange={handleFilter}
                    >
                        <MenuItem value={'All'}>All</MenuItem>
                        <MenuItem value={'Title'}>Title</MenuItem>
                        <MenuItem value={'CreatedBy'}>Created by</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    sx={{ 
                        '.MuiOutlinedInput-notchedOutline': {
                        borderRadius: 0,
                        color: "white"
                    } }}
                    id="outlined-basic"
                    label="Filter value"
                    variant="outlined"
                    disabled={filterBy === 'All'}
                    value={filterValue}
                    onChange={filterChange} />
                <Button
                    sx={{ borderRadius: '0 3px 3px 0' }}
                    className={style.filterBtn} variant="contained" onClick={filterReports}>
                    Filter
                </Button>
            </div>
        </div>
    )
}