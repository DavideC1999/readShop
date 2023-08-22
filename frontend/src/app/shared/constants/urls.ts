const BASE_URL = 'http://localhost:5000'

export const BOOKS_URL = BASE_URL + '/api/books'
export const BOOKS_BY_SEARCH_URL = BOOKS_URL + '/search/'
export const BOOK_BY_ID_URL = BOOKS_URL + '/'
export const BOOK_ADD_NEW_URL = BOOKS_URL + '/addNewBook'

export const USER_LOGIN_URL = BASE_URL + '/api/users/login'
export const USER_REGISTER_URL = BASE_URL + '/api/users/register'

export const ORDERS_URL = BASE_URL + '/api/orders'
export const ORDER_CREATE_URL = ORDERS_URL + '/create'
export const ORDER_GET_ALL_URL = ORDERS_URL + '/getAllOrders'