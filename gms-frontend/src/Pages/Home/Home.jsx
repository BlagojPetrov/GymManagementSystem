import React from 'react';
import Login from '../../Components/Login/Login'
import SignUp from '../../Components/Signup/SignUp'

const Home = () => {
  return (
    <div className="w-full h-screen">
      {/* Header */}
      <div className="border-2 border-slate-800 bg-slate-800 text-white p-5 font-semibold text-xl">
        Добредојдовте во системот за управување со теретана
      </div>

      {/* Background + left-aligned login box */}
      <div className='w-full h-full bg-cover bg-center flex bg-[url("https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg")]'>
        <div className="w-full lg:flex gap-32">
          <Login />
          <SignUp />
        </div>
      </div>
    </div>
  );
};

export default Home;
