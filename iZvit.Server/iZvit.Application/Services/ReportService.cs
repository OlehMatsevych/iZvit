using AutoMapper;
using CsvHelper;
using CsvHelper.TypeConversion;
using iZvit.Application.FilterModels;
using iZvit.Application.Models;
using iZvit.Application.Responses;
using iZvit.Application.Services.Contracts;
using iZvit.Core.Entities;
using iZvit.DataAccess.Repositories.Contracts;
using System.Globalization;
using System.Text;

namespace iZvit.Application.Services
{
    public class ReportService : IReportService
    {
        private readonly IReportRepository _repository;
        private readonly IMapper _mapper;

        public ReportService(IReportRepository repository, IMapper mapper)
        {
            _mapper = mapper;
            _repository = repository;
        }

        public async Task<ReportModel> AddReportAsync(ReportModel report)
        {
            var entity = _mapper.Map<Report>(report);
            if (entity == null)
            {
                throw new ArgumentNullException();
            }
            await _repository.AddAsync(entity);
            return _mapper.Map<ReportModel>(entity);
        }

        public async Task<OperationStatus> DeleteReportAsync(Guid id)
        {
            var entity = _repository.GetWhere(x => x.Id == id).FirstOrDefault();
            if (entity == null)
            {
                throw new ArgumentNullException();
            }
            await _repository.DeleteAsync(entity);

            return new OperationStatus() { IsSuccesed = true, Message = "OK 200" };
        }
        public async Task<ReportModel> UpdateReportAsync(Guid id, ReportModel report)
        {
            var entity = _mapper.Map<Report>(report);

            await _repository.UpdateAsync(entity);
            var updatedReport = _repository.GetWhere(x=>x.Id == id).FirstOrDefault();

            return _mapper.Map<ReportModel>(updatedReport);
        }

        public ReportModel GetReportById(Guid id)
        {
            var report = _repository.GetWhere(x => x.Id == id).FirstOrDefault();
            if (report == null)
            {
                throw new Exception("Report with this id not found");
            }
            return _mapper.Map<ReportModel>(report);
        }

        public IEnumerable<ReportModel> GetReports()
        {
            var reports = _repository.GetAll().AsParallel().ToList();
            if (reports == null)
            {
                throw new Exception("Reports not found");
            }
            return _mapper.Map<IEnumerable<ReportModel>>(reports);
        }
        public IEnumerable<ReportModel> GetFilteredReports(GetReportsFilter getReportsFilter)
            => _mapper.Map<IEnumerable<ReportModel>>(
                getReportsFilter.FilterBy switch
                {
                    "Title" => _repository.GetWhere(x => x.Title == getReportsFilter.FilterValue).ToList(),
                    "CreatedBy" => _repository.GetWhere(x => x.CreatedBy == getReportsFilter.FilterValue).ToList(),
                    "CreateDate" => _repository.GetWhere(x => x.CreateDate == DateTime.Parse(getReportsFilter.FilterValue)).ToList(),
                    "Type" => _repository.GetWhere(x => (int)x.ReportType == int.Parse(getReportsFilter.FilterValue)).ToList(),
                    _ => _repository.GetAll().AsParallel().ToList()
                });     
        public byte[] DownloadReport(Guid id)
        {
            var entity = _repository.GetWhere(x => x.Id == id).FirstOrDefault();
            List<Report> reports = new List<Report>();
            reports.Add(entity);

            using (MemoryStream stream = new MemoryStream())
            {
                using (TextWriter textWriter = new StreamWriter(stream))
                using (CsvWriter csv = new CsvWriter(textWriter, CultureInfo.InvariantCulture))
                {
                    csv.WriteRecords(reports);
                }
                return stream.ToArray();
            }
        }
    }
}
