import { useAuth } from '../contexts/AuthContext';
import notif from '../assets/img/icons/notif.svg';
import profile from '../assets/img/profile.png';

export default function Profile() {
  const { currentUser } = useAuth();

  // If no user is logged in, you might want to handle this case
  if (!currentUser) {
    return null;
  }

  return (
    <div>
      <div className="profile text-white">
        <div className="content place-self-end">
          <div className="profile w-[17rem] rounded-full flex mt-2 py-2 me-6 bg-[var(--purple)]">
            <img src={notif} className="w-6 ms-2" alt="" />
            <img 
              src={currentUser.photoURL || profile} 
              className="w-9 h-9 ms-2 rounded-full" 
              alt="Profile" 
            />
            <div className="text flex flex-col ms-2">
              <h2 className='text-sm font-bold'>
                {currentUser.displayName || 'User'}
              </h2>
              <p className="text-xs">{currentUser.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}