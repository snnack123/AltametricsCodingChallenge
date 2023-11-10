import { ReactNode } from "react";
import Navbar from "./Menu/Navbar";
import Sidebar from "./Menu/Sidebar";

interface AuthenticatedContentProps {
  readonly children: ReactNode;
}
export default function AuthenticatedContent({ children }: AuthenticatedContentProps) {
    return (
        <div className="flex">
        <Sidebar />
        <div className="w-full">
            <Navbar />
            {children}
        </div>
        </div>
    );
}
