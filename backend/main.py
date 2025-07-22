from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Optional
import uuid
from datetime import datetime
import json
import os

app = FastAPI(title="Design Documentation API", version="1.0.0")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://localhost:5173"],  # Support both HTTP and HTTPS
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class RepoAnalysisRequest(BaseModel):
    repoUrl: str
    repoName: str
    fileExtension: str
    includeDiagrams: bool

class DocumentSection(BaseModel):
    id: str
    title: str
    content: str
    type: str  # 'text', 'code', 'diagram'
    language: Optional[str] = None
    diagramType: Optional[str] = None

class AnalysisResult(BaseModel):
    id: str
    repoName: str
    repoUrl: str
    analyzedAt: str
    sections: List[DocumentSection]
    diagrams: List[str]

# In-memory storage (in production, use a database)
analyzed_documents = {}

@app.post("/analyze", response_model=AnalysisResult)
async def analyze_repository(request: RepoAnalysisRequest):
    try:
        # Generate a unique ID for this analysis
        analysis_id = str(uuid.uuid4())
        
        # Mock analysis result (in production, integrate with your existing model)
        sections = [
            DocumentSection(
                id=str(uuid.uuid4()),
                title="Project Overview",
                content=f"This document provides a comprehensive design analysis of the {request.repoName} repository. The analysis covers architecture patterns, code structure, and design principles used throughout the project.",
                type="text"
            ),
            DocumentSection(
                id=str(uuid.uuid4()),
                title="Architecture Analysis",
                content="""The project follows a modular architecture with clear separation of concerns. Key components include:

• Controller Layer: Handles HTTP requests and responses
• Service Layer: Contains business logic and data processing
• Data Access Layer: Manages database interactions
• Model Layer: Defines data structures and entities

The architecture promotes maintainability, testability, and scalability through proper abstraction and dependency injection.""",
                type="text"
            ),
            DocumentSection(
                id=str(uuid.uuid4()),
                title="Code Structure Example",
                content="""class UserController:
    def __init__(self, user_service: UserService):
        self.user_service = user_service
    
    async def create_user(self, user_data: dict) -> dict:
        try:
            user = await self.user_service.create_user(user_data)
            return {"status": "success", "user": user}
        except ValidationError as e:
            return {"status": "error", "message": str(e)}
        except Exception as e:
            logger.error(f"Unexpected error: {e}")
            return {"status": "error", "message": "Internal server error"}""",
                type="code",
                language="python"
            ),
            DocumentSection(
                id=str(uuid.uuid4()),
                title="Design Patterns",
                content=f"""The {request.repoName} project implements several design patterns:

**Repository Pattern**: Abstracts data access logic and provides a more object-oriented view of the data layer.

**Dependency Injection**: Promotes loose coupling between components by injecting dependencies rather than creating them internally.

**Factory Pattern**: Used for creating objects without specifying the exact class to create.

**Observer Pattern**: Implements event-driven architecture for handling notifications and updates.

These patterns contribute to a clean, maintainable, and extensible codebase.""",
                type="text"
            )
        ]
        
        # Add diagram if requested
        if request.includeDiagrams:
            mermaid_diagram = """graph TD
    A[Client Request] --> B[Controller]
    B --> C[Service Layer]
    C --> D[Data Access Layer]
    D --> E[Database]
    C --> F[Business Logic]
    F --> G[Validation]
    G --> H[Response Processing]
    H --> I[Client Response]"""
            
            sections.append(
                DocumentSection(
                    id=str(uuid.uuid4()),
                    title="System Architecture Diagram",
                    content=mermaid_diagram,
                    type="diagram",
                    diagramType="mermaid"
                )
            )
        
        result = AnalysisResult(
            id=analysis_id,
            repoName=request.repoName,
            repoUrl=request.repoUrl,
            analyzedAt=datetime.now().isoformat(),
            sections=sections,
            diagrams=["architecture-flow"] if request.includeDiagrams else []
        )
        
        # Store the result
        analyzed_documents[analysis_id] = result
        
        return result
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@app.get("/documents", response_model=List[AnalysisResult])
async def get_analyzed_documents():
    return list(analyzed_documents.values())

@app.get("/documents/{document_id}", response_model=AnalysisResult)
async def get_document_by_id(document_id: str):
    if document_id not in analyzed_documents:
        raise HTTPException(status_code=404, detail="Document not found")
    return analyzed_documents[document_id]

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)