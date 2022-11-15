using iZvit.Core.Enums;
using System.Text.Json.Serialization;

namespace iZvit.Application.Models
{
    public class ReportModel
    {
        public Guid Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? CreateDate { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public ReportType? ReportType { get; set; }
    }
}
