import AlertTW from "./AlertTW"
const isTheInputEmpty = (input) => {
    if (input.value.trim() === '') {
        new AlertTW('No puedes dejar campos vacíos', 'bg-red-300').show()
        return true
    }
    return false
}

export default isTheInputEmpty