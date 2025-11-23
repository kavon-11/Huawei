import { redirect } from "react-router-dom";

export function checkAuthLoader() {
    const token = localStorage.getItem("token");

    if (!token) {
        return redirect("/auth");
        
    }

    return null;
}