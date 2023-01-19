import GitHubIcon from '@mui/icons-material/GitHub';
import InfoIcon from '@mui/icons-material/Info';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import HomeIcon from '@mui/icons-material/Home';
import { Box, Grid, IconButton, Link, Typography } from '@mui/material';

export const Footer = () => {
  const routes = [
    { name: 'Home', link: '/' },
    { name: 'About Me', link: '/aboutMe' },
  ];
  const socialIcon = [
    { color: 'white', name: 'home', icon: <HomeIcon />, link: '/' },
    { color: 'white', name: 'linkedin', icon: <LinkedInIcon />, link: 'https://www.linkedin.com/in/charry07/' },
    { color: 'white', name: 'github', icon: <GitHubIcon />, link: 'https://github.com/charry07/' },
    { color: 'white', name: 'aboutMe', icon: <InfoIcon />, link: '/AboutMe' },
  ];
  return (
    <Grid container bgcolor='primary.main' direction='column' justifyContent='center' alignItems='center' sx={{ pt: 3, pb: 1, mt: 'auto' }}>
      <Grid container spacing={3} justifyContent='center'>
        {routes.map(({ name, link }) => (
          <Grid item key={link}>
            <Link href={link}>
              <Typography
                sx={{
                  fontWeight: `${location.pathname === link && 'bold'}`,
                  borderBottom: `${location.pathname === link && '2px solid white'}`,
                  color: 'white',
                }}>
                {name}
              </Typography>
            </Link>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={1} justifyContent='center'>
        {socialIcon.map(({ name, color, icon, link }: any) => (
          <Grid item key={link}>
            <IconButton sx={{ color: `${color}` }} href={link} role='button'>
              {icon}
            </IconButton>
          </Grid>
        ))}
      </Grid>

      <Grid item>
        ©<a href='mailto:charry072013@gmail.com'> Anderson Charry</a>
      </Grid>
    </Grid>
  );
};
