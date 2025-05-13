import { cn } from "@/lib/utils"
import { Link, NavLink } from "react-router"
import { buttonVariants } from "./ui/button"

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between py-3 border-b">
            <Link to={'/'}>
                <h1 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight first:mt-0">
                    Tasks
                </h1>
            </Link>
            <div className="flex items-center gap-5">
                <NavLink to={'/'} className={({ isActive }) => cn({
                    "underline font-semibold": isActive
                })}>
                    Tasks
                </NavLink>
                <NavLink to={'/add-task'} className={({ isActive }) => cn({
                    "underline font-semibold": isActive
                })}>
                    Create Task
                </NavLink>
            </div>
        </nav>
    )
}

export default Navbar