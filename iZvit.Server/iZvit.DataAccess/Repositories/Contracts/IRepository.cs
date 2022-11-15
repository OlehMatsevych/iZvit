using iZvit.Core.Entities;
using System.Linq.Expressions;

namespace iZvit.DataAccess.Repositories.Contracts
{
    public interface IRepository<TEntity> where TEntity : BaseEntity
    {
        Task<TEntity> GetByIdAsync<T>(T id);
        Task AddAsync(TEntity entity);
        Task DeleteAsync(TEntity entity);
        Task UpdateAsync(TEntity entity);
        Task<IEnumerable<TEntity>> GetAllAsync();
        IQueryable<TEntity> GetWhere(Expression<Func<TEntity, bool>> predicate);
        IQueryable<TEntity> GetAll(params Expression<Func<TEntity, object>>[] includes);
    }
}
