export const patch = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "properties": {
        "id": { "type": "string" }, // Assuming 'id' can be part of the payload
        "email": {
            "type": "string",
            "format": "email",
            "minLength": 5
        },
        "fullname": {
            "type": "string",
            "minLength": 1
        },
        "role": {
            "type": "string",
            "enum": ["Admin", "Faculty", "Adviser"]
        },
        "status": {
            "type": "string",
            "enum": ["Active", "Inactive"]
        },
        "username": {
            "type": "string",
            "minLength": 3
        },
        "imageUrl": { 
            "type": "string" 
        },
        "password": {
            "type": "string",
            "minLength": 8,
            "errorMessage": {
                "minLength": "Password should be at least 8 characters long"
            }
        }
    },
    "additionalProperties": false
};
