import '@styles/global.css';
import { NavBar } from '@components/NavBar.jsx';
import { Provider } from '@components/Provider.jsx';

export const metadata = {
  title: 'AI Clue',
  description: 'Discover & Share AI Promts',
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>

          <div className="app">
            <NavBar />
            {children}
          </div>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
