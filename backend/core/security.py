class Security():
    # Define public routes that do not require auth
    PRIVATE_PATHS = [
                     "/api/v1/user/profile",
                     "/api/v1/user/student/profile",
                     "/api/v1/user/tpo/profile",
                     "/api/v1/drives",
                     "/api/v1/drive-management",
                    ]
    
security = Security()