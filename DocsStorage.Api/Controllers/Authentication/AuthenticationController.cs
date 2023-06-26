using Microsoft.AspNetCore.Mvc;

namespace DocsStorage.Api.Controllers.Authentication;

[ApiController]
[Route("api/[controller]")]
public class AuthenticationController : ControllerBase
{
    private readonly ILogger<AuthenticationController> _logger;

    public AuthenticationController(ILogger<AuthenticationController> logger)
    {
        _logger = logger;
    }

    [HttpPost(Name = "GetAuthentication")]
    public AuthenticationResponse Get(AuthenticationRequest req)
    {
        return new AuthenticationResponse(Guid.NewGuid().ToString());
    }
}
