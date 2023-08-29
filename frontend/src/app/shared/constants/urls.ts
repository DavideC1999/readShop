const BASE_URL = 'http://localhost:5000'

export const BOOKS_URL = BASE_URL + '/api/books'
export const BOOK_BY_ID_URL = BOOKS_URL + '/'
export const BOOKS_BY_SEARCH_URL = BOOKS_URL + '/search/'
export const BOOK_ADD_NEW_URL = BOOKS_URL + '/addNewBook'

export const USERS_URL = BASE_URL + '/api/users'
export const USER_LOGIN_URL = USERS_URL + '/login'
export const USER_REGISTER_URL = USERS_URL + '/register'

export const ORDERS_URL = BASE_URL + '/api/orders'
export const ORDER_GET_ALL_URL = ORDERS_URL + '/'
export const ORDER_CREATE_URL = ORDERS_URL + '/create'
export const ORDER_DELETE_URL = ORDERS_URL + '/deleteOrder'