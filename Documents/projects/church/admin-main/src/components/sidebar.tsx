import { Link, useNavigate } from "react-router-dom";
import { signOutUser } from "../firebase/auth";
import announce from "../assets/img/icons/announce.png";
import events from "../assets/img/icons/events.png";
import testimony from "../assets/img/icons/testimony.png";
import branches from "../assets/img/icons/branches.png";
import gallery from "../assets/img/icons/gallery.png";
import books from "../assets/img/icons/books.png";
import developer from "../assets/img/icons/developer.png";
import worker from "../assets/img/icons/worker.png";
import team from "../assets/img/icons/team.png";
import out from "../assets/img/icons/out.png";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { error } = await signOutUser();
      if (error) {
        console.error("Logout error:", error);
        return;
      }
      // Redirect to sign-in page after successful logout
      navigate("/sign-in");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="w-64 bg-white drop-shadow-xl max-h-screen">
      <div className="content place-self-center">
        <h1 className="bg-gradient-to-b from-[#6801CB] to-[#CA0268] bg-clip-text text-transparent mt-8 text-center tracking-widest font-bold">
          LBC Website Admin Panel
        </h1>
        <ol className="flex flex-col gap-8 text-gray-500 mt-8 text-base">
          <li className="flex gap-2 mt-12 hover:text-[#6801CB] transition duration-200">
            <img src={events} className="size-3 place-self-center" alt="Upcoming Events" />
            <Link to="/events">Upcoming Events</Link>
          </li>
          <li className="flex gap-2 hover:text-[#6801CB] transition duration-200">
            <img src={testimony} className="size-3 place-self-center" alt="Testimony Reels" />
            <Link to="/testimony">Testimony Reels</Link>
          </li>
          <li className="flex gap-2 hover:text-[#6801CB] transition duration-200">
            <img src={branches} className="size-3 place-self-center" alt="Branches" />
            <Link to="/branches">Branches</Link>
          </li>
          <li className="flex gap-2 hover:text-[#6801CB] transition duration-200">
            <img src={gallery} className="size-3 place-self-center" alt="Gallery" />
            <Link to="/gallery">Gallery</Link>
          </li>
          <li className="flex gap-2 hover:text-[#6801CB] transition duration-200">
            <img src={books} className="size-3 place-self-center" alt="Books" />
            <Link to="/books">Books</Link>
          </li>
          <li className="flex gap-2 hover:text-[#6801CB] transition duration-200">
            <img src={team} className="size-3 place-self-center" alt="Website Team" />
            <Link to="/team">Website Team</Link>
          </li>
        </ol>

        <div
          onClick={handleLogout}
          className="flex mt-64 gap-2 cursor-pointer hover:text-red-500 transition duration-200"
        >
          <img src={out} className="size-4 place-self-center tracking-wider" alt="Logout" />
          <span className="text-gray-500 text-base">Log out</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;