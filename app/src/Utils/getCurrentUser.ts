export const getCurrentUser = async () => {
    try {
        const checkCurrentUserRequest = await fetch("/api/check-session", {
            method: "GET"
        })

        const checkCurrentUserResponse = await checkCurrentUserRequest.json();

        if (checkCurrentUserResponse.user) {
            return { user: checkCurrentUserResponse?.user };
        }

        throw new Error("User isn't logged in! Nothing's accessible for now!")
    } catch (error) {
        console.error(error)
    }
}