namespace WebApi.Services
{
    public interface IService<T>
    {
        /*         
            Task<T> GetByIdAsync(int id);
            Task AddAsync(T entity);
            Task UpdateAsync(T entity);
            Task DeleteAsync(int id); 
        */
        Task<List<T>> GetAllAsync();
    }

}
