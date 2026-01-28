import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    useEffect(() => {
        if (!isAdmin) {
            navigate('/admin/login');
        }
    }, [isAdmin, navigate]);

    return isAdmin ? <>{children}</> : null;
};

export default AdminRoute;
