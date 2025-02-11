import Left from "./left"
import Right from "./right"

export default function Main(){
    return(
        <div className="flex flex-col lg:flex-row min-h-screen overflow-x-hidden px-4 lg:px-0">
            <Left />
            <Right />
        </div>
    )
}