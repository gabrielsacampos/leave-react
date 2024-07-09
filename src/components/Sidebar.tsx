export function Sidebar(){
    return (
        <aside className=" bg-gray-200 w-64 h-screen fixed">
            <nav>
                <ul className="space-y-2">
                    <li className="p-2">Home</li>
                    <li className="p-2">About</li>
                    <li className="p-2">Contact</li>
                </ul>
            </nav>
        </aside>
    )
}