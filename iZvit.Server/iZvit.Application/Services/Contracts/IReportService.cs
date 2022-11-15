using iZvit.Application.FilterModels;
using iZvit.Application.Models;
using iZvit.Application.Responses;

namespace iZvit.Application.Services.Contracts
{
    public interface IReportService
    {
        IEnumerable<ReportModel> GetReports();
        ReportModel GetReportById(Guid id);
        Task<ReportModel> UpdateReportAsync(Guid id, ReportModel report);
        Task<OperationStatus> DeleteReportAsync(Guid id);
        Task<ReportModel> AddReportAsync(ReportModel report);
        Task<IEnumerable<ReportModel>> GetFilteredReportsAsync(GetReportsFilter getReportsFilter);
    }
}
