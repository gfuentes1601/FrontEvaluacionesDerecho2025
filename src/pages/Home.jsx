import { useState } from 'react';

const Home = () => {
  const [profileData, setProfileData] = useState(null);

  const handleGetProfile = async () => {
    console.log('Obtener perfil');
  };

  return (
    <div className="home-container">
      <h1>Página de Inicio</h1>
      
      <button onClick={handleGetProfile} className="profile-button">
        Obtener Perfil
      </button>

      {profileData && (
        <div className="profile-data">
          <pre>{JSON.stringify(profileData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Home;
