# Svelte AR Viewer PWA

A Progressive Web Application for immersive AR experiences built with Svelte and Three.js.

## 🌟 Features

- Progressive Web App (PWA) capabilities
- 3D model viewing in AR
- Responsive design
- Admin dashboard for model management
- User authentication system
- Dark/Light theme support
- Role-based access control
- Real-time statistics

## 🛠️ Tech Stack

### Frontend
- **Framework**: Svelte, SvelteKit
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **3D Rendering**: Three.js
- **AR**: WebXR
- **State Management**: Svelte stores
- **Build Tool**: Vite

### Backend
- **Framework**: ASP.NET Core 8
- **Language**: C#
- **Database**: SQL Server
- **ORM**: Entity Framework Core
- **Authentication**: JWT
- **API Documentation**: Swagger/OpenAPI

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/alipolat-js/Svelte-Ar-Viewer-PWA.git
   cd Svelte-Ar-Viewer-PWA
   ```

2. Set up the backend:
   ```bash
   cd backend/src/ArViewer.API
   dotnet restore
   dotnet run
   ```
   The API will be available at `https://localhost:7203`

3. Set up the frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

4. Access the admin dashboard:
   - URL: `http://localhost:5173/admin`
   - Default admin credentials:
     - Email: `admin@arviewer.com`
     - Password: `Password123!`

## 📁 Project Structure

See [project-structure.md](docs/project-structure.md) for detailed information about the project organization.

## 🌿 Branch Structure

- `main` - Production-ready code
- `develop` - Development branch
- Feature branches - `feature/*`
- Hotfix branches - `hotfix/*`
- Release branches - `release/*`

See [branching-strategy.md](docs/branching-strategy.md) for more details.

## 📝 Documentation

- [Project Development Report](docs/pdr.md)
- [API Documentation](https://localhost:7203/swagger)
- [Project Structure](docs/project-structure.md)
- [Branching Strategy](docs/branching-strategy.md)

## 🔒 Security

- JWT-based authentication
- Role-based access control
- Secure password hashing
- HTTPS enforcement
- XSS protection
- CORS configuration

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

MIT License - see the [LICENSE](LICENSE) file for details.