import { Container, Box, Typography, makeStyles, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import RangeSlider from './components/rangerSlider/rangeSlider';
import EastIcon from '@mui/icons-material/East';


const medGray = '#75787B';

export default function Home() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: '43vh',
        width: '37vw',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'white',
        borderRadius: '10px',
        borderWidth: '1px',
        borderColor: '#D2D6DA',
      }}
    >
      <Grid container spacing={0} sx={{ width: '90%', border: '1px solid red', marginTop: '3vh', marginRight: '5px', marginLeft: '5px' }}>

        <Grid size={12} style={{ border: '1px solid black'}}>
          <p style={{ color: '#75787B', fontSize: '18px', fontWeight: 'bold', border: '1px dashed blue' }}>Recommended TSP Strategy</p>
        </Grid>

        <Grid size={12} container spacing={2} justifyContent="center" alignItems="center" style={{ border: '1px solid blue'}}>
          <Grid>
            <RangeSlider value={44} width={125} isActive={true}/>
          </Grid>
          <Grid>
            <EastIcon sx={{ fontSize: '50px', color: medGray, backgroundColor: 'red' }}/>
          </Grid>
          <Grid>
            <RangeSlider value={94} width={125} isActive={false}/>
          </Grid>
        </Grid>

        <Grid size={12} container spacing={1}>

          <Grid size={12}>
            <p style={{ background: 'red'}}>With just a few actions you could be setting yourself up for your dream retirement</p>
          </Grid>

          <Grid size={12}>
            <h1 style={{ background: 'red'}}>The closer to retirement you get, the more money it's going to cost to reach these same goals. Don't wait! Click below.</h1>
          </Grid>

          <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Button variant="contained" sx={{ width: '100%', height: '50px'}}>View Strategy</Button>
          </Grid>
        
        </Grid>
      </Grid>
    </Box>
  );
}
