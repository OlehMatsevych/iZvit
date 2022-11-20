import style from "./Home.module.css"
import Papa from "papaparse"
import { Button } from "@mui/material"
import { reportsAPI } from "../../api/api"
import { useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid';

export const AddFile = ({ setModalActiveAddFile }) => {
    const [parsedData, setParsedData] = useState(null)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if (parsedData !== null && !loaded) {
            reportsAPI.addReport(parsedData)
            setLoaded(true)
            window.location.reload()
        }
    }, [parsedData, loaded])

    const addFile = () => {
        setModalActiveAddFile(true)
    }

    const changeHandler = (event) => {
        Papa.parse(event.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                setParsedData(results.data[0])
                const event = new Date()
                setParsedData(parsedData => ({
                    ...parsedData,
                    Id: uuidv4(),
                    CreateDate: event.toISOString().toString(),
                }))
            },
        });
    }

    return (
        <div className={style.addFileContainer}>
            <Button sx={{ backgroundColor: '#30a54a' }} variant="contained" className={style.addButton} onClick={addFile}>Add report</Button>
            <label className={style.addInput} htmlFor="add-report">
                LOAD REPORT
                <input style={{ display: 'none' }}
                    id="add-report"
                    name="add-report"
                    onChange={changeHandler}
                    accept=".csv"
                    type="file" />
            </label>
        </div>
    )
}