using AutoMapper;
using iZvit.Application.Models;
using iZvit.Core.Entities;

namespace iZvit.Application.MappingProfiles
{
    public class ReportProfile: Profile
    {
        public ReportProfile()
        {
            CreateMap<Report, ReportModel>();
            CreateMap<ReportModel, Report>();
        }
    }
}
