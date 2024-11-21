"use client"
import { Container, Box, Typography, makeStyles, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import RangeSlider from './components/rangerSlider/rangeSlider';
import EastIcon from '@mui/icons-material/East';
import { useState } from 'react';
import SetPopup from './components/popup/set-popup';
import ResPopup from './components/popup/res-popup';

const lightGray = '#D2D6DA'
const medGray = '#75787B';
const darkGray = '#495057';
const secondaryDark = '#344767';



export function Home() {
  const [recommendedTSPContribution, setRecommendedTSPContribution] = useState(0);
  const [retirementIncome, setRetirementIncome] = useState(60);
  const [retirementYears, setRetirementYears] = useState(34);

  const [isSetPopupOpen, setOpenSetPopup] = useState(false);
  const [isResPopupOpen, setOpenResPopup] = useState(false);
  const [shouldOpenResPopup, setShouldOpenResPopup] = useState(false);
    const handleOpenSetPopup = () => {
      setOpenSetPopup(true);
    }

    const handleSetPopupClose = () => {
      setOpenSetPopup(false);
    }

    const handleResPopupClose = () => {
      setOpenResPopup(false);
    }

    const handleCloseSetOpenRes = () => {
      setOpenSetPopup(false);
      setOpenResPopup(true);
    }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: { xs: '45vh', sm: '43vh', md: '43vh' },
        width: { xs: '90vw', sm: '80vw', md: '36vw' },
        maxWidth: '600px',
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
      <Grid container spacing={0} sx={{ width: '90%', marginTop: '3vh', marginRight: '8px', marginLeft: '8px' }}>

        <Grid size={12}>
          <Typography style={{ color: '#75787B', fontSize: '18px', fontWeight: 'bold' }}>Recommended TSP Strategy</Typography>
        </Grid>

        <Grid size={12} container spacing={2} justifyContent="center" alignItems="center">
          <Grid>
            <RangeSlider id={"0"} value={44} width={125} isActive={true}/>
          </Grid>
          <Grid>
            <EastIcon sx={{ fontSize: '40px', color: lightGray }}/>
          </Grid>
          <Grid>
            <RangeSlider id={"1"} value={94} width={125} isActive={false}/>
          </Grid>
        </Grid>

        <Grid size={12} container spacing={1.5}>

          <Grid size={12}>
            <Typography style={{ color: darkGray}}>With just a few actions you could be setting yourself up for your dream retirement.</Typography>
          </Grid>

          <Grid size={12}>
            <Typography style={{ color: darkGray }}>The closer to retirement you get, the more money it's going to cost to reach these same goals. Don't wait! Click below.</Typography>
          </Grid>

          <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Button variant="contained" sx={{ width: '100%', height: '50px', backgroundColor: secondaryDark, fontWeight: 'bold', fontSize: '18px', alignItems: 'center', justifyContent: 'center'}} onClick={handleOpenSetPopup}>View Strategy</Button>
            <SetPopup openModal={isSetPopupOpen} closeCallback={handleSetPopupClose} openRes={handleCloseSetOpenRes} setRecommendedTSPContribution={setRecommendedTSPContribution} setRetirementIncome={setRetirementIncome} setRetirementYears={setRetirementYears}/> 
            <ResPopup openModal={isResPopupOpen} closeCallback={handleResPopupClose} setRecommendedTSPContribution={recommendedTSPContribution} setRetirementIncome={retirementIncome} setRetirementYears={retirementYears}/>
          </Grid>
        
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;