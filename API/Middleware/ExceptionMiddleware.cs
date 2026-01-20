using FluentValidation;
using Microsoft.AspNetCore.Mvc;
namespace API.Middleware;

public class ExceptionMiddleware : IMiddleware
{
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try
        {
            await next(context);
        }
        catch (ValidationException ex)
        {
            await HandleExceptionAsync(context, ex);
            // context.Response.ContentType = "application/json";
            // context.Response.StatusCode = 400;
            // var errors = ex.Errors.Select(e => new { e.PropertyName, e.ErrorMessage });
            // await context.Response.WriteAsync(new
            // {
            //     StatusCode = context.Response.StatusCode,
            //     Errors = errors
            // }.ToString());
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            // _logger.LogError(ex, "An error occurred");
            // await HandleExceptionAsync(context, ex);
        }
    }

    private static async Task HandleExceptionAsync(HttpContext context, ValidationException ex)
    {
        var validationErrors = new Dictionary<string, string[]>();

        if (ex.Errors is not null)
        {
            foreach (var error in ex.Errors)
            {
                if (validationErrors.TryGetValue(error.PropertyName, out var existingErrors))
                {
                    validationErrors[error.PropertyName] = existingErrors.Append(error.ErrorMessage).ToArray();
                }
                else
                {
                    validationErrors[error.PropertyName] = [error.ErrorMessage];
                }
            }
        }
        context.Response.StatusCode = StatusCodes.Status400BadRequest;
        // context.Response.ContentType = "application/json";
        var validationProblemDetails = new ValidationProblemDetails(validationErrors)
        {
            Status = context.Response.StatusCode,
            Type = "ValidationFailure",
            Title = "Validation Error",
            Detail = "One or more validation errors occurred."
        };
        await context.Response.WriteAsJsonAsync(validationProblemDetails);
    }
}