import { Button, FormControl, MenuItem, Select, TextField } from "@mui/material"
import { reportsAPI } from "../../api/api"
import style from "../../Pages/Home.module.css"

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
                    <Select
                        sx={{
                            width: '130px',
                            color: "#fff",
                            boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': {
                                borderRight: 0,
                                borderRadius: '3px 0 0 3px',
                                border: '1px solid #FFF !important',
                                color: '#FFF'
                            },
                            "& .MuiSvgIcon-root": {
                                color: "white",
                            },
                        }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={filterBy}
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
                            border: '1px solid #FFF !important',
                        },
                        '& .MuiInputBase-root': {
                            color: 'white',
                        },
                        "& .MuiFormLabel-root": {
                            color: 'white'
                        },
                        "& .MuiFormLabel-root.Mui-focused": {
                            color: 'white'
                        },
                        "& .MuiFormLabel-root.Mui-disabled": {
                            color: 'silver'
                        }
                    }}
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