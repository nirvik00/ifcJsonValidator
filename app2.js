var Ajv = require('ajv');
var schemaValidator = new Ajv();

var innerSchema = {
    "type": "object",
    "properties": {
        "c": {
            "type": "string"
        },
        "d": {
            "type": "number"
        }
    },
    "required": ["c"]
}

var innerArraySchema = {
    "type": "array",
    "items": {
        "#ref": innerSchema
    }
}

var schema = {
    "type": "object",
    "properties": {
        "a": {
            "type": "string"
        },
        "b": {
            "type": "string"
        },
        "obj": innerArraySchema
    },
    "required": ["a"]
}

var testSchemaValidator = schemaValidator.compile(schema);

var data = {
    "a": "123", "b": "abc", "obj": [{
        "d": "ankit"
    }]
}


var valid = testSchemaValidator(data);

console.log(valid);

if (!valid) {
    console.log(testSchemaValidator.errors);
}