
namespace Backend.Features.Customers;

internal class CustomersListQueryHandler(BackendContext context) : IRequestHandler<CustomersListQuery, List<CustomersListQueryResponse>>
{
    private readonly BackendContext context = context;

    public async Task<List<CustomersListQueryResponse>> Handle(CustomersListQuery request, CancellationToken cancellationToken)
    {
        var customers = context.Customers.AsQueryable();

        if(!string.IsNullOrEmpty(request.Name))
            customers = customers.Where(c => c.Name.ToLower().Contains(request.Name.ToLower()));

        if(!string.IsNullOrEmpty(request.Email))
            customers = customers.Where(c => c.Email.ToLower().Contains(request.Email.ToLower()));

        var customersList = await customers.OrderBy(c => c.Name).ToListAsync(cancellationToken);

        var result = new List<CustomersListQueryResponse>();

        foreach(var customer in customersList)
        {
            var resultItem = new CustomersListQueryResponse
            {
                Id = customer.Id,
                Name = customer.Name,
                Address = customer.Address,
                Email = customer.Email,
                Phone = customer.Phone,
                Iban = customer.Iban
            };

            var category = await context.CustomerCategories.SingleOrDefaultAsync(cc => cc.Id == customer.CustomerCategoryId);

            if(category is not null)
            {
                resultItem.Category = new CustomersListQueryResponseCategory
                {
                    Code = category.Code,
                    Description = category.Description
                };
            }

            result.Add(resultItem);
        }

        return result;
    }
}