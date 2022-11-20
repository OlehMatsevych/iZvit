import style from "./Home.module.css"
import Papa from "papaparse"
import { Button } from "@mui/material"

export const AddFile = ({ setModalActiveAddFile, setParsedData }) => {

    const addFile = () => {
        setModalActiveAddFile(true)
    }

    const changeHandler = (event) => {
        Papa.parse(event.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                const rowsArray = [];
                const valuesArray = [];

                results.data.forEach((d) => {
                    rowsArray.push(Object.keys(d));
                    valuesArray.push(Object.values(d));
                });
                setParsedData(results);
            },
        });
    }

    return (
        <div className={style.addFileContainer}>
            <Button sx={{ backgroundColor: '#30a54a' }} variant="contained" className={style.addButton} onClick={addFile}>Add file</Button>
            <label className={style.addInput} htmlFor="add-report">
                LOAD FILE
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