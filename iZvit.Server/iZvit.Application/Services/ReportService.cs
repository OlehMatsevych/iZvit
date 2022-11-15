using AutoMapper;
using iZvit.Application.FilterModels;
using iZvit.Application.Models;
using iZvit.Application.Responses;
using iZvit.Application.Services.Contracts;
using iZvit.Core.Entities;
using iZvit.DataAccess.Repositories.Contracts;

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
            var updatedReport = _repository.GetWhere(x=>x.Id == id);

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
            var reports = _repository.GetAll(q => q).AsParallel().ToList();
            if (reports == null)
            {
                throw new Exception("Reports not found");
            }
            return _mapper.Map<IEnumerable<ReportModel>>(reports);
        }
        public Task<IEnumerable<ReportModel>> GetFilteredReportsAsync(GetReportsFilter getReportsFilter)
        {
            throw new NotImplementedException();
        }
    }
}
