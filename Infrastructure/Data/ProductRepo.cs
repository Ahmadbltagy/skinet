using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class ProductRepo : IProductRepo
    {
        private readonly StoreContext _context;
        public ProductRepo(StoreContext context)
        {
            _context = context;
        }
        public async Task<Product> GetProductIdAsync(int id)
        {
            return await _context.Products.AsNoTracking().
                Include(p => p.ProductType).
                Include(p => p.ProductBrand).FirstOrDefaultAsync(p=>p.Id == id);
        }

        public async Task<IReadOnlyList<Product>> GetProductsAsync()
        {
            return await _context.Products.AsNoTracking().Include(p=>p.ProductBrand).
                Include(p=>p.ProductType).ToListAsync();
        }

        public async Task<IReadOnlyList<ProductBrand>> GetProductsBrandAsync()
        {
            return await _context.ProductBrands.AsNoTracking().ToListAsync();
        }

        public async Task<IReadOnlyList<ProductType>> GetProductsTypeAsync()
        {
            return await _context.ProductTypes.AsNoTracking().ToListAsync();
        }
    }
}
