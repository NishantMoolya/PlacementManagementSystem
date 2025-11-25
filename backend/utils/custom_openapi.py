from fastapi import FastAPI
from fastapi.openapi.utils import get_openapi
from core.security import security

# If you want to override OpenAPI docs metadata
def add_jwt_auth_to_openapi(app: FastAPI):
    def custom_openapi():
        if app.openapi_schema:
            return app.openapi_schema

        openapi_schema = get_openapi(
            title="Placement Mangement System API",
            version="1.0.0",
            description="Placement Mangement System for college",
            routes=app.routes,
        )

        openapi_schema["components"]["securitySchemes"] = {
            "BearerAuth": {
                "type": "http",
                "scheme": "bearer",
                "bearerFormat": "JWT",
            }
        }

        for path in openapi_schema["paths"]:
            for method in openapi_schema["paths"][path]:
                if any(path.startswith(prefix) for prefix in security.PRIVATE_PATHS):  # Add security only for private paths
                    openapi_schema["paths"][path][method]["security"] = [{"BearerAuth": []}]

        app.openapi_schema = openapi_schema
        return app.openapi_schema

    app.openapi = custom_openapi
