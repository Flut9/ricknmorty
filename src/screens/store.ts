import { createStore, createEvent } from "effector"
import { persist, storage } from "effector-storage"
import { storageAdapter } from "./storage-adapter"

export type TUser = {
    id: string,
    name: string,
    mail: string,
    role: string
}

export type TWorker = TUser & {
    rating: number,
    reviews: TReview[]
}

export type TReview = {
    id: string,
    reviewer: string,
    title: string,
    description: string,
    rating: number
}

export type TCustomer = TUser & {
    rating: number,
    vacancies: TVacancy[],
    reviews: TReview[]
}

export type TVacancy = {
    id: string,
    title: string,
    description: string,
    tasks: TTask[],
    creator: string,
    creatorId: string,
    date: string
}

export type TTask = {
    id: string,
    title: string,
    description: string,
    salary: number,
}

export const $isAuth = createStore<boolean>(false)
export const $users = createStore<TUser[]>([])
export const $currentUser = createStore<TUser>({
    id: "",
    name: "",
    mail: "",
    role: ""
})
export const $customers = createStore<TCustomer[]>([])
export const $workers = createStore<TWorker[]>([])

export const addUser = createEvent<TUser>()
export const setCurrentUser = createEvent<TUser>()
export const addCustomer = createEvent<TCustomer>()
export const addWorker = createEvent<TWorker>()

export const addVacancyToCustomer = createEvent<{ id: string, vacancy: TVacancy }>()
$customers.on(addVacancyToCustomer, (state, payload) => {
    // const customer = state.find(customer => customer.id === payload.id)

    console.log("--------created-----------")
    const newCustomers = state.map(cust => {
        if (cust.id === payload.id) {
            const vacancies = [payload.vacancy, ...cust.vacancies]
            return {
                id: cust.id,
                name: cust.name,
                mail: cust.mail,
                rating: cust.rating,
                reviews: [...cust.reviews],
                role: cust.role,
                vacancies: [...vacancies]
            }
        }

        return {...cust}
    })
    console.log(state, "\n\n\n",newCustomers)
    return newCustomers
})

export const addReviewToCustomer = createEvent<{ id: string, review: TReview }>()
$customers.on(addReviewToCustomer, (state, payload) => {
    const updatedCustomer = state.find(cust => cust.id === payload.id)!
    updatedCustomer.reviews.push(payload.review)
    return [updatedCustomer, ...state]
})

export const updateWorker = createEvent<{ id: string, name: string, mail: string }>()
$workers.on(updateWorker, (state, payload) => {
    const worker = state.find(worker => worker.id === payload.id)!
    worker.name = payload.name
    worker.mail = payload.mail
    return [worker, ...state]
})

export const updateCustomer = createEvent<{ id: string, name: string, mail: string }>()
$customers.on(updateCustomer, (state, payload) => {
    const customer = state.find(customer => customer.id === payload.id)!
    customer.name = payload.name
    customer.mail = payload.mail
    return [customer, ...state]
})

export const deleteVacancyOfCustomer = createEvent<{ customerId: string, id: string }>()
$customers.on(deleteVacancyOfCustomer, (state, payload) => {
    const customer = state.find(customer => customer.id === payload.customerId)!
    customer.vacancies = customer.vacancies.filter(vacancy => vacancy.id !== payload.id)
    return [customer, ...state]
})

export const setIsAuth = createEvent<boolean>()
$isAuth.on(setIsAuth, (_, payload) => payload)

$users.on(addUser, (state, payload) => [...state, payload])
$currentUser.on(setCurrentUser, (_, payload) => payload)
$customers.on(addCustomer, (state, payload) => [payload, ...state])
$workers.on(addWorker, (state, payload) => [payload, ...state])

export const logout = createEvent()
$currentUser.reset(logout)
$isAuth.reset(logout)

// export const resetStore = createEvent()
// $users.reset(logout)
// $currentUser.reset(logout)
// $customers.reset(logout)
// $workers.reset(logout)

persist({
    store: $users,
    adapter: storageAdapter,
    key: "users"
})
persist({
    store: $customers,
    adapter: storageAdapter, 
    key: "customers"
})
persist({
    store: $workers,
    adapter: storageAdapter,
    key: "workers"
})
persist({
    store: $currentUser,
    adapter: storageAdapter,
    key: "currentUser"
})
persist({
    store: $isAuth,
    adapter: storageAdapter,
    key: "isAuth"
})