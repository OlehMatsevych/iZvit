using iZvit.Core.Entities;
using iZvit.DataAccess.Persistence;
using iZvit.DataAccess.Repositories.Contracts;

namespace iZvit.DataAccess.Repositories
{
    public class ReportRepository : BaseRepository<Report>, IReportRepository
    {
        public ReportRepository(Context context) : base(context)
        { }
    }
}
