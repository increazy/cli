let user = null

module.exports = {
    get() {
        return user
    },

    set(_user) {
        user = _user
    },

    logged() {
        return user !== null
    }
}