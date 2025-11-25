export const getRoute = (role) => {
    if(role === "tpo") return "/tpo"
    else if(role === "student") return "/student/profile"
    else return "/"
}