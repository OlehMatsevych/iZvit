using iZvit.Core.Entities;
using iZvit.DataAccess.Persistence;
using iZvit.DataAccess.Repositories.Contracts;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace iZvit.DataAccess.Repositories
{
    public class BaseRepository<TEntity> : IRepository<TEntity> where TEntity : BaseEntity
    {
        private Context _context;
        public BaseRepository(Context context)
        {
            _context = context;
        }

        public Task AddAsync(TEntity entity)
        {
            _context.Set<TEntity>().AddAsync(entity);
            return _context.SaveChangesAsync();
        }

        public Task DeleteAsync(TEntity entity)
        {
            _context.Set<TEntity>().Remove(entity);
            return _context.SaveChangesAsync();
        }
        public Task UpdateAsync(TEntity entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
            return _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<TEntity>> GetAllAsync() =>
            await _context.Set<TEntity>().ToListAsync();

        public async Task<TEntity> GetByIdAsync<T>(T id)
        {
            if (id is Guid || id is int || id is string)
            {
                return await _context.Set<TEntity>().FindAsync(id);
            }
            throw new ArgumentException();
        }
        public IQueryable<TEntity> GetWhere(Expression<Func<TEntity, bool>> predicate) =>
             _context.Set<TEntity>().Where(predicate).AsQueryable();

        public IQueryable<TEntity> GetAll(params Expression<Func<TEntity, object>>[] includes)
        {
            var query = _context.Set<TEntity>().AsQueryable();
            return includes.Aggregate(query, (q, w) => q.Include(w));
        }
    }
}

