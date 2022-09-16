import { useContext } from 'react';
import PrivacyContext from './PrivacyContext';

function Privacy() {
  const { onLogout } = useContext(PrivacyContext);

  return (
    <div className="main-privacy">
      <div className="logout">
        <button className="logout-button" type="submit" onClick={onLogout}>Logout</button>
      </div>
      <h3>PRIVACY POLICY</h3>
      <section className="privacy-content">
        <p><b className="warning">Warning:</b> I am sorry to put you through this boring policy, but hey, you chose it!</p>
        <p>This policy ensures that my work is my work and cannot be copied in part or whole by anyone who does not have the permissions to do so.</p>
        <p>Your data is your data and I promise that there is nothing hidden and I am not hiding any cookies in your system to track you.</p>
        <p>You may find it hard to believe but I respect people's privacy.</p>
        <p>So rest assured, this is your safe space and you are not tracked by any application so please stay as long as you like and get to know me better!</p>
      </section>
    </div>
  );
}

export default Privacy;