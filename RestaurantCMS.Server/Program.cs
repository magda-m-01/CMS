using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using RestaurantCMS.Database;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.UseUrls("http://*:5000");
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<DataContext>(options => 
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddAuthorization();
// Program.cs
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddIdentityApiEndpoints<IdentityUser>()
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<DataContext>();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<DataContext>();
        context.Database.Migrate();  // Apply migrations
        await SeedDataAsync(services, builder);  // Seed data
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "Migration/seeding failed");
    }
}

app.UseDefaultFiles();
app.UseStaticFiles();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapIdentityApi<IdentityUser>();
//app.UseHttpsRedirection();
app.UseCors("AllowFrontend");
app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    await SeedDataAsync(services, builder);
}
app.Run();
static async Task SeedDataAsync(IServiceProvider serviceProvider, WebApplicationBuilder builder)
{
    var roleManager = serviceProvider.GetRequiredService<Microsoft.AspNetCore.Identity.RoleManager<IdentityRole>>();
    var userManager = serviceProvider.GetRequiredService<Microsoft.AspNetCore.Identity.UserManager<IdentityUser>>();

    string[] roles = { "Administrator", "User" };

    foreach (var role in roles)
    {
        if (!await roleManager.RoleExistsAsync(role))
        {
            await roleManager.CreateAsync(new IdentityRole(role));
        }
    }

    var adminEmail = builder.Configuration["AdminCredentials:Email"];
    var adminPassword = builder.Configuration["AdminCredentials:Password"];

    var adminUser = await userManager.FindByEmailAsync(adminEmail);
    if (adminUser == null)
    {
        adminUser = new IdentityUser
        {
            UserName = adminEmail,
            Email = adminEmail,
            EmailConfirmed = true
        };

        var createUserResult = await userManager.CreateAsync(adminUser, adminPassword);
        if (!createUserResult.Succeeded)
        {
            throw new Exception($"Failed to create admin user: {string.Join(", ", createUserResult.Errors.Select(e => e.Description))}");
        }
    }

    if (!await userManager.IsInRoleAsync(adminUser, "Administrator"))
    {
        await userManager.AddToRoleAsync(adminUser, "Administrator");
    }
}