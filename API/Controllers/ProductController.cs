using Infrastructure.Data;
using Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Core.Entities;
using Core.Specificaitons;
using API.Dtos;
using AutoMapper;
using API.Helpers;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IGenericRepo<Product> _productRepo;
        private readonly IGenericRepo<ProductBrand> _prodcutBrandRepo;
        private readonly IGenericRepo<ProductType> _productTypeRepo;
        private readonly IMapper _mapper;
        public ProductController(
            IGenericRepo<Product> productRepo,
            IGenericRepo<ProductBrand> prodcutBrandRepo, 
            IGenericRepo<ProductType> productTypeRepo,
            IMapper mapper
         )
        {
            _productRepo = productRepo;
            _prodcutBrandRepo = prodcutBrandRepo;
            _productTypeRepo = productTypeRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts([FromQuery]ProductSpecParams productParams)
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(productParams);

            var countSpec = new ProductsWithFiltersForCountSpecification(productParams);
            var totalItem = await _productRepo.CountAsync(countSpec);

            var products = await _productRepo.ListAsync(spec);

            var data = _mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductDTO>>(products);

            return Ok(new Pagination<ProductDTO>(productParams.PageIndex, productParams.PageSize, totalItem, data));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProdcut(int id)
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(id);
            var products = await _productRepo.GetEntityWithSpec(spec);
            return Ok(_mapper.Map<Product, ProductDTO>(products));
        }

        [HttpGet("brands")]
        public async Task<IActionResult> GetProductBrands()
        {
            var productBrands = await _prodcutBrandRepo.ListAllAsync();
            return Ok(productBrands);
        }

        [HttpGet("types")]
        public async Task<IActionResult> GetProductTypes()
        {
            return Ok(await _productTypeRepo.ListAllAsync());
        }


    }
}
