import { useContext } from 'react';
import HomeContext from './HomeContext';

function Home() {

  const { onLogout } = useContext(HomeContext);

  return (
    <div className="main-home">
      <div className="logout">
        <button className="logout-button" type="submit" onClick={onLogout}>Logout</button>
      </div>
      <p>Welcome to your job tracker website! Feel free to poke around!</p>
      <p>My academic related project pages and more interesting content are going to be launched soon, if you like my website, please do visit again!</p>
    </div>
  );
}

export default Home;