import Cookies from "js-cookie"
import fileDownload from "js-file-download"
import { reportsAPI } from "../../api/api"
import style from "./Home.module.css"
import { useState } from "react"
import Modal from "../Modal/Modal"
import { Button, TextField } from "@mui/material"
import { Filter } from "./Filter"
import { AddFile } from "./AddFile"
import { v4 as uuidv4 } from 'uuid';

export const Home = ({ reports, setAuth, setModalActive, setReportById, reportById }) => {
    const [parsedData, setParsedData] = useState([])
    const [modalActiveEdit, setModalActiveEdit] = useState(false);
    const [modalActiveAddFile, setModalActiveAddFile] = useState(false);
    const [filterBy, setFilterBy] = useState('All');
    const [filterValue, setFilterValue] = useState('');
    const [filteredReports, setFilteredReports] = useState([]);
    const [testReport, setTestReport] = useState({
        title: '',
        description: '',
        createdBy: '',
        reportType: 0,
    })

    const report = { ...reportById }

    const handleFile = (key) => (e) => {
        setTestReport(testReport => ({
            ...testReport,
            [key]: Number.isNaN(+e.target.value) ? e.target.value : +e.target.value,
        }))
    }

    const addFile = () => {
        const event = new Date()
        setTestReport(testReport => ({
            ...testReport,
            id: uuidv4(),
            createDate: event.toISOString().toString(),
        }))
        reportsAPI.addReport(testReport)
        window.location.reload()
    }

    const handleClick = () => {
        setAuth(false)
        Cookies.remove("user")
    }

    const downloadReport = (id) => {
        reportsAPI.downloadReport(id).then(response => {
            fileDownload(response.data, 'report.csv')
        })
    }

    const viewReport = (id) => {
        reportsAPI.getReportById(id).then(response => {
            setReportById(response.data)
        })
        setModalActive(true)
    }

    const editReport = (key) => (e) => {
        const event = new Date()
        setReportById(reportById => ({
            ...reportById,
            createDate: event.toISOString().toString(),
            [key]: e.target.value
        }))
    }

    const updateReport = () => {
        const { id } = reportById
        reportsAPI.changeReportById(id, reportById)
        window.location.reload()
    }

    const changeReport = (report) => {
        reportsAPI.getReportById(report.id).then(response => {
            setReportById(response.data)
        })

        // reportsAPI.changeReportById(report.id)
        setModalActiveEdit(true)
    }

    const deleteReport = (id) => {
        reportsAPI.deleteReport(id)
        window.location.reload()
    }

    const filterItems = filteredReports.length === 0 ? reports : filteredReports

    const reportsItems = filterItems.map(report => (
        <div
            key={report.id}
            className={style.reportItem}
        >
            <div>
                {report.title}
            </div>
            <div>
                {report.createdBy}
            </div>
            <div>
                {report.reportType}
            </div>
            <div className={style.itemButtons}>
                <button onClick={() => downloadReport(report.id)}>
                    download
                </button>
                <button onClick={() => viewReport(report.id)}>
                    info
                </button>
                <button onClick={() => changeReport(report)}>
                    edit
                </button>
                <button onClick={() => deleteReport(report.id)}>
                    delete
                </button>
            </div>
        </div>
    ))

    return (
        <div>
            <div className={style.title}>
                <Filter
                    filterBy={filterBy}
                    filterValue={filterValue}
                    setFilterBy={setFilterBy}
                    setFilterValue={setFilterValue}
                    setFilteredReports={setFilteredReports}
                />
                <Button variant="contained" className={style.titleButton} onClick={handleClick}>Logout</Button>
            </div>
            <div>
                <div className={style.header}>
                    <div>
                        Title
                    </div>
                    <div>
                        Created By
                    </div>
                    <div>
                        Type
                    </div>
                    <div>
                        Actions
                    </div>
                </div>
                {reportsItems}
                <AddFile
                    setModalActiveAddFile={setModalActiveAddFile}
                    setParsedData={setParsedData}
                />
            </div>
            <Modal active={modalActiveEdit} setActive={setModalActiveEdit}>
                {Object.entries(report)?.map((el) => (el[0] === "id" || el[0] === "createDate"
                    ? <div key={el[0]}></div>
                    : <div key={el[0]} className={style.itemList}>
                        <TextField
                            id="outlined-basic"
                            label={el[0]}
                            variant="outlined"
                            value={el[1]}
                            onChange={editReport(el[0])}
                        />
                    </div>
                ))}
                <Button variant="contained" onClick={updateReport}>
                    Edit
                </Button>
            </Modal>
            <Modal active={modalActiveAddFile} setActive={setModalActiveAddFile}>
                <form>
                    {Object.entries(testReport).map((el) => (
                        <div key={el[0]} className={style.itemList}>
                            <TextField
                                id="outlined-basic"
                                label={el[0]}
                                variant="outlined"
                                value={el[1]}
                                onChange={handleFile(el[0])}
                            />
                        </div>
                    ))}
                    <Button variant="contained" onClick={addFile}>
                        Add
                    </Button>
                </form>
            </Modal>
        </div>
    )
}