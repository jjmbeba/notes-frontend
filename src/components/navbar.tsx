import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { Link, NavLink } from "react-router"
import { Button } from "./ui/button"

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <nav className="flex items-center justify-between py-3 px-4 md:px-6 lg:px-8 border-b relative">
            <Link to={'/'}>
                <h1 className="scroll-m-20 pb-2 text-xl md:text-2xl font-semibold tracking-tight first:mt-0">
                    Tasks
                </h1>
            </Link>
            
            {/* Mobile menu button */}
            <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-5">
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

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-background border-b md:hidden">
                    <div className="flex flex-col px-4 py-2 space-y-2">
                        <NavLink 
                            to={'/'} 
                            className={({ isActive }) => cn(
                                "py-2 px-4 rounded-md hover:bg-accent",
                                { "bg-accent font-semibold": isActive }
                            )}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Tasks
                        </NavLink>
                        <NavLink 
                            to={'/add-task'} 
                            className={({ isActive }) => cn(
                                "py-2 px-4 rounded-md hover:bg-accent",
                                { "bg-accent font-semibold": isActive }
                            )}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Create Task
                        </NavLink>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar