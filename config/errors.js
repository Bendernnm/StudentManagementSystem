module.exports = {
    DataBaseError: {
        status: 500,
        message: 'Data base error.'
    },
    FindUserError: {
        status: 400,
        message: 'User not found.'
    },
    DuplicationOfDataError: {
        status: 500,
        message: 'Dublicate data'
    },
    AuthError: {
        status: 401,
        message: 'User don\'t authorized.'
    },
    AccessError: {
        status: 403,
        message: 'Denied access.'
    }
};