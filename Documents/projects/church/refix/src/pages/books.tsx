
import Books from '../components/books/home'
import Devotionals from "../components/books/devotionals.jsx";

function BooksByFounder (){
    return (
            <div className="bg-gradient-to-b from-[#295264] to-[#152745] overflow-x-hidden font-instrument">
                <Books />
                {/*<Devotionals />*/}
            </div>
    );
}

export default BooksByFounder;