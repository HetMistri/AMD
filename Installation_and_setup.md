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
