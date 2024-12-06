using carRental.API.Models.DTO.auth;
using carRental.API.Repository.token;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;

namespace carRental.API.Controllers
{
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [ApiVersion("1.0")]
    [ApiVersion("2.0")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly ITokenRepository tokenRepository;
        private readonly ILogger logger;
        private readonly IMapper mapper;

        public AuthController(UserManager<ApplicationUser> userManager, ITokenRepository tokenRepository, ILogger<AuthController> logger, IMapper mapper)
        {
            this.userManager = userManager;
            this.tokenRepository = tokenRepository;
            this.logger = logger;
            this.mapper = mapper;
        }

        [HttpPost]
        [Route("register")]
        [MapToApiVersion("1.0")]
        public async Task<IActionResult> RegisterV1([FromBody] RegisterDTO registerDTO)
        {
            var identityUser = new ApplicationUser
            {
                UserName = registerDTO.FullName,
                Email = registerDTO.Email,
                PhoneNumber = registerDTO.PhoneNumber,
                BirthDate = registerDTO.BirthDate,
            };

            var createResult = await userManager.CreateAsync(identityUser, registerDTO.Password);

            if (createResult.Succeeded)
            {
                if (registerDTO.roles != null && registerDTO.roles.Any())
                {
                    var addRolesResult = await userManager.AddToRolesAsync(identityUser, registerDTO.roles);
                    if (addRolesResult.Succeeded)
                    {
                        return Ok("Registration Succeeded");
                    }
                    else
                    {
                        // Return the errors if adding roles fails
                        return BadRequest(string.Join(", ", addRolesResult.Errors.Select(e => e.Description)));
                    }
                }
                return Ok("Registration succeeded without roles.");
            }

            return BadRequest(string.Join(", ", createResult.Errors.Select(e => e.Description)));
        }

        [HttpPost]
        [Route("login")]
        [MapToApiVersion("1.0")]
        public async Task<IActionResult> LoginV1([FromBody] LoginDTO loginDTO)
        {
            var user = await userManager.FindByEmailAsync(loginDTO.UserName);
            if (user == null)
            {
                return NotFound(new { message = "User not found." });
            }

            var isPasswordValid = await userManager.CheckPasswordAsync(user, loginDTO.Password);
            if (!isPasswordValid)
            {
                return Unauthorized(new { message = "Invalid password." });
            }

            var roles = await userManager.GetRolesAsync(user);

            // Here, ensure that GenerateJWTToken accepts ApplicationUser
            var token = tokenRepository.GenerateJWTToken(user, roles.ToList());
            if (string.IsNullOrEmpty(token))
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Failed to generate token." });
            }

            var response = new LoginResponseDTO
            {
                JwtToken = token,
                UserId = user.Id
            };

            return Ok(response);
        }
         /*
        [HttpGet]
        [Route("userInfo/{Id:Guid}")]
        [Authorize(Roles = "user, admin")]
        [MapToApiVersion("1.0")]
        public async Task<IActionResult> GetUserInfo([FromRoute] Guid Id)
        {
            var result = await tokenRepository.GetUserInfoByIdAsync(Id);

            if (result is null)
            {
                return NotFound();
            }

            var blogDTO = mapper.Map<UserInfoDTO>(result);
            return Ok(blogDTO);
        }
              */

        [HttpPost]
        [Route("register")]
        [MapToApiVersion("2.0")]
        public async Task<IActionResult> RegisterV2([FromBody] RegisterDTO registerDTO)
        {
            var identityUser = new ApplicationUser
            {
                UserName = registerDTO.FullName,
                Email = registerDTO.Email,
                PhoneNumber = registerDTO.PhoneNumber,
                BirthDate = registerDTO.BirthDate,
            };

            var createResult = await userManager.CreateAsync(identityUser, registerDTO.Password);

            if (createResult.Succeeded)
            {
                if (registerDTO.roles != null && registerDTO.roles.Any())
                {
                    var addRolesResult = await userManager.AddToRolesAsync(identityUser, registerDTO.roles);
                    if (addRolesResult.Succeeded)
                    {
                        return Ok("Registration Succeeded");
                    }
                    else
                    {
                        // Return the errors if adding roles fails
                        return BadRequest(string.Join(", ", addRolesResult.Errors.Select(e => e.Description)));
                    }
                }
                return Ok("Registration succeeded without roles.");
            }

            return BadRequest(string.Join(", ", createResult.Errors.Select(e => e.Description)));
        }

        [HttpPost]
        [Route("login")]
        [MapToApiVersion("2.0")]
        public async Task<IActionResult> LoginV2([FromBody] LoginDTO loginDTO)
        {
            // Check if the user exists
            var user = await userManager.FindByEmailAsync(loginDTO.UserName);
            if (user == null)
            {
                return NotFound(new { message = "User not found." });
            }

            // Verify the password
            var isPasswordValid = await userManager.CheckPasswordAsync(user, loginDTO.Password);
            if (!isPasswordValid)
            {
                return Unauthorized(new { message = "Invalid password." });
            }

            // Retrieve user roles
            var roles = await userManager.GetRolesAsync(user);

            // Generate token
            var token = tokenRepository.GenerateJWTToken(user, roles.ToList());
            if (string.IsNullOrEmpty(token))
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Failed to generate token." });
            }

            // Return the token and user ID in the response
            var response = new LoginResponseDTO
            {
                JwtToken = token,
                UserId = user.Id // Assign user ID here
            };

            return Ok(response);
        }  
                  
    }
}
