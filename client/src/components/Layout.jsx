import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { useNavigate } from 'react-router-dom';

export function Layout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
            <Header onLogout={handleLogout} />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
