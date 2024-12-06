using AutoMapper;
using carRental.API.CustomActionFilter;
using carRental.API.Models.Domain;
using carRental.API.Models.DTO.car;
using carRental.API.Repository.car;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace carRental.API.Controllers
{
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [ApiVersion("1.0")]
    [ApiVersion("2.0")]
    public class CarsController : ControllerBase
    {
        private readonly ICarRepository carRepository;
        private readonly IMapper mapper;
        private readonly ILogger logger;

        public CarsController(ICarRepository carRepository, IMapper mapper, ILogger<CarsController> logger)
        {
            this.carRepository = carRepository;
            this.mapper = mapper;
            this.logger = logger;
        }

        [HttpGet]
        [Route("get-all")]
        [Authorize(Roles = "user, admin")]
        [MapToApiVersion("1.0")]
        public async Task<IActionResult> GetAllV1([FromQuery] int pageParam = 1, [FromQuery] int pageSize = 10)
        {
            var result = await carRepository.GetAllAsync(pageParam, pageSize);

            var carDTO = mapper.Map<List<CarDTO>>(result);

            return Ok(carDTO);
        }

        [HttpGet]
        [Route("get-car-by-id/{Id:Guid}")]
        [Authorize(Roles = "user, admin")]
        [MapToApiVersion("1.0")]
        public async Task<IActionResult> GetByIDV1([FromRoute] Guid Id)
        {
            var result = await carRepository.GetByIdAsync(Id);

            if (result is null)
            {
                return NotFound();
            }

            var carDTO = mapper.Map<CarDTO>(result);
            return Ok(carDTO);
        }

        [HttpPost]
        [Route("save-car")]
        [ValidateModel]
        [Authorize(Roles = "admin")]
        [MapToApiVersion("1.0")]
        public async Task<IActionResult> CreateV1([FromBody] AddCarDTO addCarDTO)
        {
            var car = mapper.Map<Car>(addCarDTO);

            car = await carRepository.CreateAsync(car);

            var carDTO = mapper.Map<CarDTO>(car);

            return CreatedAtAction(nameof(GetByIDV1), new { id = carDTO.Id }, carDTO);

        }

        [HttpPut]
        [Route("update-car/{Id:Guid}")]
        [ValidateModel]
        [Authorize(Roles = "admin")]
        [MapToApiVersion("1.0")]
        public async Task<IActionResult> UpdateV1([FromRoute] Guid Id, [FromBody] UpdateCarDTO updateCarDTO)
        {
            var car = mapper.Map<Car>(updateCarDTO);

            car = await carRepository.UpdateAsync(Id, car);

            if (car is null)
            {
                return NotFound();
            }

            var carDTO = mapper.Map<CarDTO>(car);

            return Ok(carDTO);
        }

        [HttpDelete]
        [Route("delete-car/{Id:Guid}")]
        [Authorize(Roles = "admin")]
        [MapToApiVersion("1.0")]
        public async Task<IActionResult> DeleteV1([FromRoute] Guid Id)
        {

            var carExists = await carRepository.DeleteAsync(Id);

            if (carExists is null)
            {
                return NotFound();
            }

            var carDTO = mapper.Map<CarDTO>(carExists);

            return Ok(carDTO);
        }






        [HttpGet]
        [Route("get-all")]
        [Authorize(Roles = "user, admin")]
        [MapToApiVersion("2.0")]
        public async Task<IActionResult> GetAllV2([FromQuery] int pageParam = 1, [FromQuery] int pageSize = 10)
        {
            var result = await carRepository.GetAllAsync(pageParam, pageSize);

            var carDTO = mapper.Map<List<CarDTO>>(result);

            return Ok(carDTO);
        }

        [HttpGet]
        [Route("get-car-by-id/{Id:Guid}")]
        [Authorize(Roles = "user, admin")]
        [MapToApiVersion("2.0")]
        public async Task<IActionResult> GetByIDV2([FromRoute] Guid Id)
        {
            var result = await carRepository.GetByIdAsync(Id);

            if (result is null)
            {
                return NotFound();
            }

            var carDTO = mapper.Map<CarDTO>(result);
            return Ok(carDTO);
        }

        [HttpPost]
        [Route("save-car")]
        [ValidateModel]
        [Authorize(Roles = "admin")]
        [MapToApiVersion("2.0")]
        public async Task<IActionResult> CreateV2([FromBody] AddCarDTO addCarDTO)
        {
            var car = mapper.Map<Car>(addCarDTO);

            car = await carRepository.CreateAsync(car);

            var carDTO = mapper.Map<CarDTO>(car);

            return CreatedAtAction(nameof(GetByIDV2), new { id = carDTO.Id }, carDTO);

        }

        [HttpPut]
        [Route("update-car/{Id:Guid}")]
        [ValidateModel]
        [Authorize(Roles = "admin")]
        [MapToApiVersion("2.0")]
        public async Task<IActionResult> UpdateV2([FromRoute] Guid Id, [FromBody] UpdateCarDTO updateCarDTO)
        {
            var car = mapper.Map<Car>(updateCarDTO);

            car = await carRepository.UpdateAsync(Id, car);

            if (car is null)
            {
                return NotFound();
            }

            var carDTO = mapper.Map<CarDTO>(car);

            return Ok(carDTO);
        }

        [HttpDelete]
        [Route("delete-car/{Id:Guid}")]
        [Authorize(Roles = "admin")]
        [MapToApiVersion("2.0")]
        public async Task<IActionResult> DeleteV2([FromRoute] Guid Id)
        {

            var carExists = await carRepository.DeleteAsync(Id);

            if (carExists is null)
            {
                return NotFound();
            }

            var carDTO = mapper.Map<CarDTO>(carExists);

            return Ok(carDTO);
        }
    }
}
