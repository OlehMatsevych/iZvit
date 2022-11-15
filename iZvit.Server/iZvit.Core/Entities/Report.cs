using iZvit.Core.Enums;

namespace iZvit.Core.Entities
{
    public class Report: BaseEntity
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? CreateDate { get; set; }
        public ReportType? ReportType { get; set; }
    }
}
