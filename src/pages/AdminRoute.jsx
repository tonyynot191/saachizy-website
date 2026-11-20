
import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from '../supabase';

function AdminRoute({ children }) {
  const location = useLocation();
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let active = true;

    async function checkAccess() {
      try {
        const { data: { session }, error: sessionError } =
          await supabase.auth.getSession();

        if (sessionError) throw sessionError;

        if (!session) {
          if (active) setIsAdmin(false);
          return;
        }

        const { data: adminRecord, error: adminError } =
          await supabase
            .from('admin_users')
            .select('user_id')
            .eq('user_id', session.user.id)
            .maybeSingle();

        if (adminError) throw adminError;

        if (active) {
          setIsAdmin(Boolean(adminRecord));
        }
      } catch (error) {
        console.error('Admin access check failed:', error);

        if (active) setIsAdmin(false);
      } finally {
        if (active) setChecking(false);
      }
    }

    checkAccess();

    const { data: { subscription } } =
      supabase.auth.onAuthStateChange((event, session) => {
        if (!session || event === 'SIGNED_OUT') {
          if (active) {
            setIsAdmin(false);
            setChecking(false);
          }
        } else {
          window.setTimeout(() => {
            if (active) {
              setChecking(true);
              checkAccess();
            }
          }, 0);
        }
      });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  if (checking) {
    return (
      <div className="admin-loading">
        <p>Verifying administrator access...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return children;
}

export default AdminRoute;
