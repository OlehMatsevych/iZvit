import axios from "axios";

const instance = axios.create({
    baseURL: "https://localhost:7053/",
})

export const reportsAPI = {
    getReports() {
        return instance.get('api/report')
    },
    getReportById(reportId) {
        return instance.get(`api/report/${reportId}`)
    },
    addReport(data) {
        return instance.post('api/report', data)
    },
    changeReportById(reportId, data) {
        return instance.put(`api/report/${reportId}`, data)
    },
    downloadReport(reportId) {
        // return instance.get(`api/report/download/${reportId}`)
        return instance({
            url: `api/report/download/${reportId}`,
            method: 'GET',
            responseType: 'blob'
        })
    },
    filterReports(data) {
        return instance.post('filter', data)
    },
    deleteReport(reportId) {
        return instance.delete(`api/report/${reportId}`)
    }
}

