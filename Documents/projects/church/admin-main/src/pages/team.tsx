  import { useState } from "react";
  import { MoreVertical, X } from "lucide-react";
  import { motion } from "framer-motion";
  import user from '../assets/img/icons/user.svg';
  import phone from '../assets/img/icons/phone.svg';
  import email from '../assets/img/icons/email.svg';
  import cloud from '../assets/img/icons/upload-cloud.svg';
  import upload from '../assets/img/icons/upload.svg';

  interface TeamMember {
    name: string;
    role: string;
    email: string;
    contact: string;
    avatar: string;
  }

  const initialMembers: TeamMember[] = [
    { name: "Wisdom Gbafa", role: "Admin", email: "w.gbafa@gmail.com", contact: "0244679801", avatar: "https://i.pravatar.cc/150?img=41" },
    { name: "Kwadwo Adarkwa", role: "Admin", email: "k.dj@gmail.com", contact: "0244679801", avatar: "https://i.pravatar.cc/150?img=2" },
    { name: "Stephen Emunah", role: "Admin", email: "s@gmail.com", contact: "0244679801", avatar: "https://i.pravatar.cc/150?img=12" },
    { name: "Alex Appiah", role: "Admin", email: "appiah@gmail.com", contact: "0244679801", avatar: "https://i.pravatar.cc/150?img=4" },
  ];

  const TeamMembers = () => {
    const [members, setMembers] = useState<TeamMember[]>(initialMembers);
    const [openMenu, setOpenMenu] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newMember, setNewMember] = useState<TeamMember>({ name: "", role: "", email: "", contact: "", avatar: "" });

    const addMember = () => {
      if (newMember.name && newMember.role && newMember.email && newMember.contact && newMember.avatar) {
        setMembers([...members, newMember]);
        setNewMember({ name: "", role: "", email: "", contact: "", avatar: "" });
        setIsModalOpen(false);
      }
    };

    const deleteMember = (index: number) => {
      setMembers(members.filter((_, i) => i !== index));
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setNewMember({ ...newMember, avatar: e.target.result as string });
          }
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    };

    return (
      <div className="w-[calc(100vw-16rem)] p-6 mb-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-[var(--purple)] underline underline-offset-4">
            Team Members
          </h1>
          <button onClick={() => setIsModalOpen(true)} className="flex gap-2 px-12 hover:cursor-pointer rounded bg-[#CC0066] shadow-lg w-max py-1 text-white">
            Add New Member
          </button>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {members.map((member, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }} 
              className="p-4 bg-white shadow-md rounded-xl flex flex-col relative"
            >
              {/* Profile Section */}
              <div className="flex flex-wrap gap-3">
                <img 
                  src={member.avatar} 
                  alt={member.name} 
                  className="w-14 h-14 rounded-full -mt-1 mb-2 object-cover border-2 border-gray-300" 
                />
                <div className="flex flex-col flex-wrap">
                  <h2 className="font-semibold text-gray-800">{member.name}</h2>
                  <p className="text-pink-800 text-sm font-bold">{member.role}</p>
                </div>
              </div>

              {/* Email & Contact */}
              <div className="flex justify-between gap-4 mt-2 flex-wrap">
                <div className="flex flex-col">
                  <label className="text-xs text-gray-500">Email</label>
                  <p className="text-sm">{member.email}</p>
                </div>
                <div className="flex flex-col">
                  <label className="text-xs text-gray-500">Contact</label>
                  <p className="text-sm">{member.contact}</p>
                </div>
              </div>
              
              {/* Meatball Menu Button */}
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 hover:cursor-pointer"
                onClick={() => setOpenMenu(openMenu === index ? null : index)}
              >
                <MoreVertical className="w-5 h-5" />
              </button>

              {/* Dropdown Menu */}
              {openMenu === index && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0, scale: 0.95 }} 
                  className="absolute top-10 right-2 bg-white shadow-lg rounded-md py-2 w-28"
                >
                  <button 
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 hover:cursor-pointer text-red-500"
                    onClick={() => deleteMember(index)}
                  >
                    🗑️ Delete
                  </button>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Add Member Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-[36rem] h-[40rem] drop-shadow-2xl p-6 rounded-2xl">
              <X onClick={() => setIsModalOpen(false)} className="size-5 ms-auto cursor-pointer" />
              <h2 className="text-lg font-semibold -mt-4 tracking-wider">Add New</h2>
            <div className="flex mt-6">
              <div className="user flex flex-col">
                <label htmlFor="name" className="text-xs font-semibold">Name</label>
                <div className="relative">
                  <input type="text" className="w-[95%] border-gray-300 border-1 py-2 px-12 rounded" placeholder="Enter name of user" value={newMember.name} onChange={(e) => setNewMember({ ...newMember, name: e.target.value })} />
                  <img src={user} className="-mt-5 ms-5 transform -translate-y-1/2 h-5 w-5 text-gray-400" alt="" />
                </div>
              </div>
              <div className="user flex flex-col">
                <label htmlFor="name" className="text-xs font-semibold">Role</label>
                <div className="relative">
                  <input type="text" placeholder="Role" className="w-[95%] border-gray-300 border-1 py-2 px-12 rounded" value={newMember.role} onChange={(e) => setNewMember({ ...newMember, role: e.target.value })} />
                  <img src={user} className="-mt-5 ms-5 transform -translate-y-1/2 h-5 w-5 text-gray-400" alt="" />
                </div>
              </div>
                
            </div>
            
          <div className="flex">
              <div className="contact flex flex-col mt-6">
              <label htmlFor="contact" className="text-xs font-semibold">Contact</label>
              <div className="relative">
                <input type="text" className="w-[95%] border-gray-300 border-1 py-2 px-12 rounded" placeholder="Enter contact of user" value={newMember.contact} onChange={(e) => setNewMember({ ...newMember, contact: e.target.value })}  />
                <img src={phone} className="-mt-5 ms-5 transform -translate-y-1/2 h-5 w-5 text-gray-400" alt="" />
              </div>
              </div>
              <div className="email flex flex-col mt-6">
              <label htmlFor="email" className="text-xs font-semibold">Email</label>
              <div className="relative">
                <input type="text" className="w-[100%] border-gray-300 border-1 py-2 px-12  rounded" placeholder="Enter e-mail of user" value={newMember.email} onChange={(e) => setNewMember({ ...newMember, email: e.target.value })} />
                <img src={email} className="-mt-5 ms-5 transform -translate-y-1/2 h-5 w-5 text-gray-400" alt="" />
              </div>
            </div>
          </div>
          <div className="upload-img mt-10">
          <label htmlFor="image-upload" className="text-xs font-semibold">Image</label>
          <div className="border border-gray-300 rounded-lg p-6 text-center w-full mx-auto">
            <div className="flex justify-center mb-4">
              <img src={cloud} alt="Upload Icon" />
            </div>
            {newMember.avatar && (
              <div className="flex justify-center mb-4">
                <img src={newMember.avatar} alt="Preview" className="w-24 h-24 rounded-full object-cover border-2 border-gray-300" />
              </div>
            )}
            <p className="text-gray-700">Drag and drop images here to upload</p>
            <p className="text-gray-500 text-sm my-2">OR</p>
            <label htmlFor="image-upload" className="bg-[#6801CB] shadow-lg text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 w-48 mx-auto cursor-pointer">
              Upload from device
              <img src={upload} alt="Upload Icon" />
            </label>
            <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </div>
        </div>
              <button onClick={addMember} className="bg-[#6801CB] text-white p-2 w-full mt-4 hover:cursor-pointer">Save</button>
            </div>
          </div>
        )}
      </div>
    );
  };

  export default TeamMembers;
