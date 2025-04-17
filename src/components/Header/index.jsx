import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function Header() {
  const { isAuthenticated, logoutUser } = useAuth();
  // const navigate = useNavigate();
  
  const handleLogout = async () => {
   logoutUser();
  };
  
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            Blog Web
          </Link>
        </Typography>
        <Box>
          {isAuthenticated ? (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/my-post"
              >
                Minha Postagem
              </Button>
              <Button 
                color="inherit" 
                component={Link} 
                to="/create-post"
              >
                Nova Postagem
              </Button>
              <Button 
                color="inherit" 
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button 
                color="inherit" 
                component={Link} 
                to="/login"
              >
                Login
              </Button>
              <Button 
                color="inherit" 
                component={Link} 
                to="/register"
              >
                Registro
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}