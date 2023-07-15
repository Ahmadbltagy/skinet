using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specificaitons
{
    public class BaseSpecification<T> : ISpecification<T>
    {
        public BaseSpecification()
        {
        }
        public BaseSpecification(Expression<Func<T, bool>> critera)
        {
            Critera = critera;
        }

        public Expression<Func<T, bool>> Critera { get; }

        public List<Expression<Func<T, object>>> Includes { get; } = new();
        protected void AddInclude(Expression<Func<T, object>> includeExpression) 
        { 
            Includes.Add(includeExpression);
        }
    }
}
