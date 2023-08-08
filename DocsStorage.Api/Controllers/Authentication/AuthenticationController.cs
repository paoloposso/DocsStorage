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

    [HttpPost(Name = "PostAuthentication")]
    public AuthenticationResponse Post(AuthenticationRequest req)
    {
        return new AuthenticationResponse(Guid.NewGuid().ToString());
    }

    [HttpPost(Name = "GetAuthentication")]
    public string Get(AuthenticationRequest req)
    {
        return "OK";
    }
}
