export const createUserValidationSchema = {
    username: { //field that gonna be checked
        isLength: {  //what to check
            options: {
                min: 5,
                max: 32
            },
            errorMessage: "Username must be at least 5 characters with a max of 32 characters"
        },
        notEmpty: {
            errorMessage: "Username cannot be empty"
        },
        isString: {
            errorMessage: "Username must be a string"
        }
    },
    displayName: {
        notEmpty: true
    },
    password: {
        notEmpty: true,
        isString: {
            errorMessage: "Username must be a string"
        }
    }
}

export const createAuthSchema = {
    username: {
        isLength: {
            min: 5,
            max: 32
        },
        errorMessage: "Username must be at least 5 characters"
    },
    notEmpty: {
        errorMessage: "Username cannot be empty"
    },
    isString: {
        errorMessage: "Username must be a string"
    },
    password: {
        isString: {
            errorMessage: "password must be a string"
        },
        notEmpty: {
            errorMessage: "Username cannot be empty"
        },
        isLength: {  //what to check
            options: {
                min: 5,
                max: 32
            },
            errorMessage: "Password must be at least 5 characters with a max of 32 characters"
        },
    }
}

export const createCartSchema = {
    name: {
        notEmpty: {
            errorMessage: "item name should not be empty"
        }
    },
    price: {
        isFloat: {
            min: 0
        },
        errorMessage: "Price must be a positive number"
    },
    quantity: {
        isInt: {
            min: 1
        },
        errorMessage: "Quantity must be at least 1"
    }
}