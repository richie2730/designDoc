# Design Documentation UI

A responsive, clean, and minimal design documentation UI built with React.js, TypeScript, Tailwind CSS, and FastAPI backend.

## Features

- **Clean Interface**: Minimal design with white/light background and blue/gray accents
- **Repository Analysis**: Analyze GitHub repositories and generate design documentation
- **Responsive Design**: Mobile-friendly with collapsible sidebar
- **Export Options**: Export documentation to Markdown, PDF, and Word formats
- **Diagram Support**: Generate Mermaid diagrams when requested
- **Document History**: Navigate between previously analyzed documents

## Tech Stack

### Frontend
- React.js with TypeScript
- Tailwind CSS for styling
- Lucide React for icons
- Mermaid for diagram rendering
- html2pdf.js for PDF export
- file-saver for downloads

### Backend
- FastAPI (Python)
- Pydantic for data validation
- CORS enabled for frontend communication

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Python (v3.8 or higher)
- npm or yarn

### Installation

1. **Install Frontend Dependencies**
   ```bash
   npm install
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   python main.py
   ```
   The API will be available at `http://localhost:8000`

2. **Start the Frontend Development Server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

## Usage

1. **Analyze a Repository**
   - Enter the GitHub repository URL
   - Provide a repository name
   - Select the file extension to analyze
   - Optionally enable "Include Diagrams"
   - Click "Analyze Repository"

2. **View Documentation**
   - The generated documentation will appear in the main content area
   - Navigate between sections using the sidebar
   - View generated diagrams (if enabled)

3. **Export Documentation**
   - Use the export buttons at the bottom to save documentation
   - Available formats: Markdown (.md), PDF, and Word (.docx)

4. **Access Previous Analysis**
   - Use the sidebar to navigate between previously analyzed repositories
   - Documents are automatically saved and can be accessed anytime

## API Endpoints

- `POST /analyze` - Analyze a repository
- `GET /documents` - Get all analyzed documents
- `GET /documents/{id}` - Get a specific document
- `GET /health` - Health check endpoint

## Customization

### Adding New File Extensions
Update the file extension options in `src/components/AnalysisForm.tsx`

### Modifying Export Formats
Customize export functionality in `src/components/ExportButtons.tsx`

### Styling Changes
All styles are managed through Tailwind CSS classes. Modify components or extend the Tailwind configuration.

## Production Deployment

### Frontend
Build the frontend for production:
```bash
npm run build
```

### Backend
Deploy the FastAPI backend using services like:
- Heroku
- AWS Lambda
- Docker containers
- Traditional VPS

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.#   n e w _ u i  
 