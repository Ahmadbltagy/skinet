using Core.Entities;
using Core.Interfaces;
using Core.Specificaitons;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class GenericRepo<T> : IGenericRepo<T> where T : BaseEntity
    {
        private readonly StoreContext _cotnext;
        public GenericRepo(StoreContext context)
        {
            _cotnext = context;
        }

      

        public async Task<T> GetByIdAsync(int id)
        {
            return await _cotnext.Set<T>().FindAsync(id);
        }

        public async Task<T> GetEntityWithSpec(ISpecification<T> spec)
        {
            return await ApplySpecificaion(spec).FirstOrDefaultAsync();
        }

        public async Task<IReadOnlyList<T>> ListAllAsync()
        {
            return await _cotnext.Set<T>().ToListAsync();
        }

        public async Task<IReadOnlyList<T>> ListAsync(ISpecification<T> spec)
        {
            return await ApplySpecificaion(spec).ToListAsync();
        }
        public async Task<int> CountAsync(ISpecification<T> spec)
        {
            return await ApplySpecificaion(spec).CountAsync();
        }
        private IQueryable<T> ApplySpecificaion(ISpecification<T> spec)
        {
            return SpecificationEvaluator<T>.GetQuery(_cotnext.Set<T>().AsQueryable(), spec);
        }
    }
}
