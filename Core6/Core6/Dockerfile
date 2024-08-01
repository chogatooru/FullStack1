FROM mcr.microsoft.com/dotnet/aspnet:6.0-nanoserver-1809 AS base
WORKDIR /app
EXPOSE 1433

ENV ASPNETCORE_URLS=http://+:1433

FROM mcr.microsoft.com/dotnet/sdk:6.0-nanoserver-1809 AS build
ARG configuration=Release
WORKDIR /src
COPY ["Core6/Core6.csproj", "Core6/"]
RUN dotnet restore "Core6\Core6.csproj"
COPY . .
WORKDIR "/src/Core6"
RUN dotnet build "Core6.csproj" -c $configuration -o /app/build

FROM build AS publish
ARG configuration=Release
RUN dotnet publish "Core6.csproj" -c $configuration -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Core6.dll"]
