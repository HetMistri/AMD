## Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm (comes with Node.js)
- Python 3.8+
- pip (Python package manager)

### Quick Start

1. **Clone and navigate to project:**

```bash
git clone <your-repo-url>
cd AMD_git_test
```

2. **Install dependencies:**

```bash
cd frontend
npm install
cd ..
pip install -r requirements.txt
```

3. **Run the project:**

```bash
start_project.bat
```

The script will automatically:

- Start Django backend (`http://localhost:8000`)
- Start Vite frontend (`http://localhost:5173`)
- Start virtual meter feeder (demo data)
- Open dashboard at `http://localhost:5173/dashboard`

### Access Points

- **User Dashboard:** http://localhost:5173/dashboard
- **Admin Dashboard:** http://localhost:5173/admin
- **Backend API:** http://localhost:8000/api/v1/

### Docker (Production Runtime)

1. Prepare environment files:

```bash
cp backend/.env.example backend/.env
cp .env.docker.example .env.docker
```

2. Build and run all services:

```bash
docker compose --env-file .env.docker up --build -d
```

3. Open apps:

- Frontend: http://localhost:5173
- Standalone Admin Console: http://localhost:5174
- Backend API: http://localhost:8000/api/v1/
- ML Gateway Docs: http://localhost:8001/docs

4. Stop services:

```bash
docker compose down
```

For full details, see `DOCKER_SETUP.md`.

Note: `VITE_*` variables are build-time values for frontend/admin static bundles. Re-run with `--build` after changing them.

### Troubleshooting

**"Site can't be reached"**

- Ensure `npm install` was run in the `frontend` folder
- Wait 10-15 seconds for services to initialize
- Check logs in the `logs/` folder

**Port conflicts**

- Frontend: Modify `frontend/vite.config.js`
- Backend: Modify Django settings

**Clean reinstall**

```bash
cd frontend
rm -r node_modules package-lock.json
npm install
cd ..
```
