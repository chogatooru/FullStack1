# 基础镜像
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

# 构建镜像
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# 复制 csproj 文件并恢复依赖
COPY ["RecipeBook/RecipeBook.csproj", "RecipeBook/"]
RUN dotnet restore "RecipeBook/RecipeBook.csproj"

# 复制其他项目文件
COPY . .

# 构建项目
WORKDIR "/src/RecipeBook"
RUN dotnet build "RecipeBook.csproj" -c $BUILD_CONFIGURATION -o /app/build

# 发布项目
FROM build AS publish
RUN dotnet publish "RecipeBook.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# 最终镜像
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "RecipeBook.dll"]
