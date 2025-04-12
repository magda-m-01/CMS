# Stage 1: Build .NET application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy solution and project files
COPY RestaurantCMS.sln ./
COPY RestaurantCMS.Server/RestaurantCMS.Server.csproj RestaurantCMS.Server/
COPY RestaurantCMS.Database/RestaurantCMS.Database.csproj RestaurantCMS.Database/

# Restore dependencies
RUN dotnet restore

# Copy the full source
COPY . .

# Build and publish the .NET backend
WORKDIR /src/RestaurantCMS.Server
RUN dotnet publish -c Release -o /app/out

# Stage 2: Final image for .NET runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out .

EXPOSE 5000
ENTRYPOINT ["dotnet", "RestaurantCMS.Server.dll"]
