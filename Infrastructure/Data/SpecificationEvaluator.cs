using Core.Entities;
using Core.Specificaitons;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class SpecificationEvaluator<TEntity> where TEntity : BaseEntity
    {
        public static IQueryable<TEntity> GetQuery(IQueryable<TEntity> inputQuery, ISpecification<TEntity> spec)
        {
            var query = inputQuery;
            if(spec.Critera != null)
            {
                query = query.Where(spec.Critera);
            }
            query = spec.Includes.Aggregate(query,
                (current, include) => current.Include(include));
            return query;
        }
    }
}
