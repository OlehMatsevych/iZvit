using iZvit.Application.FilterModels;
using iZvit.Application.Models;
using iZvit.Application.Services.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace iZvit.API.Controllers
{
    [ApiController]
    [Route("api/report")]
    public class ReportController : ControllerBase
    {
        private readonly IReportService _reportService;

        public ReportController(IReportService reportService)
        {
            _reportService = reportService;
        }

        [HttpGet]
        [Route("")]
        public IActionResult GetReports()
        {
            try
            {
                var apartments = _reportService.GetReports();
                return Ok(apartments);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("{id}")]
        public IActionResult GetReportById(Guid id)
        {
            try
            {
                var report = _reportService.GetReportById(id);
                return Ok(report);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("")]
        public async Task<IActionResult> AddReport(ReportModel model)
        {
            try
            {
                var report = await _reportService.AddReportAsync(model);
                return Ok(report);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateReport(Guid id, ReportModel model)
        {
            try
            {
                var updatedReport = await _reportService.UpdateReportAsync(id, model);
                return Ok(updatedReport);
            }
            catch (Exception ex) 
            { 
                return BadRequest(ex.Message); 
            }
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReportById(Guid id)
        {
            try
            {
                var status = await _reportService.DeleteReportAsync(id);
                return Ok(status);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("/filter")]
        public IActionResult GetFilteredReports(GetReportsFilter filter)
        {
            try
            {
                var reports = _reportService.GetFilteredReports(filter);
                return Ok(reports);
            }   
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("download/{id}")]
        public IActionResult DownloadReportById(Guid id)
        {
            try
            {
                var file = _reportService.DownloadReport(id);

                return File(new MemoryStream(file), "application/octet-stream", $"report-{id}.csv");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
