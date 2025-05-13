import { cn } from "@/lib/utils"
import { Link } from "react-router"
import { buttonVariants } from "./ui/button"

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between py-3 border-b">
            <Link to={'/'}>
                <h1 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight first:mt-0">
                    Notes
                </h1>
            </Link>
            <Link to={'/add-note'} className={cn(buttonVariants({
                variant: 'outline'
            }))}>
                Create note
            </Link>
        </nav>
    )
}

export default Navbar