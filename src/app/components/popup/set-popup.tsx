'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid2';
import CloseIcon from '@mui/icons-material/Close';
import HelpIcon from '@mui/icons-material/Help';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import { Theme } from '@mui/material/styles';

const style = (theme: Theme) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: { xs: '100vh', sm: '87vh', md: '85vh' },
  width: { xs: '100vw', sm: '80vw', md: '75vw', lg: '45vw' },
  boxShadow: 24,
  p: 4,
  background: 'white',
  borderRadius: '10px',
  borderWidth: '1px',
  borderColor: '#D2D6DA',
});

const lightGray = '#D2D6DA';
const medGray = '#A3A7AA';
const medDarkGray = '#75787B';
const darkGray = '#495057';
const darkerGray = '#24282b';
const secondaryDark = '#344767';
const mainHeader = 'black';
const xIconSize = '18px';
const parcoDark = '#344767';

const retirementYears = [
  {
    value: 24,
    label: '24',
  },
  {
    value: 34,
    label: '34',
  },
];

const retirementIncome = [
  {
    value: 60,
    label: '60K',
  },
  {
    value: 100,
    label: '100K',
  },
];

const sliderStyle = {
  color: parcoDark,
  '& .MuiSlider-track': {
    border: 'none',
    background: 'linear-gradient(90deg, #918BE4, #D8ECF8)', // Track gradient
  },
  '& .MuiSlider-rail': {
    opacity: 0.5,
    background: 'linear-gradient(90deg, #918BE4, #D8ECF8)',
  },
  '& .MuiSlider-thumb': {
    height: 30,
    width: 30,
    backgroundColor: parcoDark,
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
    '&:focus, &:hover, &.Mui-active': {
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.4)',
    },
  },
  '& .MuiSlider-valueLabel': {
    backgroundColor: parcoDark, // Background color for the balloon
    borderRadius: '50%',
    marginBottom: '50px', // Makes the label circular
    padding: '0.5rem', // Space inside the label
    transform: 'translateY(-50%)', // Position adjustment
    top: '-40px', // Move the label higher (adjust as needed)
    '&::before': {
      content: '""',
      position: 'absolute',
      bottom: '-6px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '0',
      height: '0',
      borderStyle: 'solid',
      borderWidth: '12px 12px 0px 12px', // Tail dimensions
      borderColor: '#344767 white white white', // Match balloon color
    },
  },
  '& .MuiSlider-mark': {
    backgroundColor: parcoDark,
    height: 24,
    width: 8,
    BorderAllRounded: '100%',
  },

};


function valuetext(value: number) {
  return `$${value}K`;
}


function calculateSavingsForRetirement(yearsToRetirement: number, retirementIncome: number) {
  return Math.floor(((1000 * retirementIncome) * 0.25) / yearsToRetirement);
}

export default function SetPopup({ openModal, closeCallback, openRes, setRecommendedTSPContribution, setRetirementIncome, setRetirementYears }: any) {
  const [userYearsToRetirement, setUserYearsToRetirement] = React.useState(34);
  const [userRetirementIncome, setUserRetirementIncome] = React.useState(60);
  const [open, setOpen] = React.useState(openModal);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    closeCallback();
  };

  const handleCloseResOpen = () => {
    setOpen(false);
    setRecommendedTSPContribution(calculateSavingsForRetirement(userYearsToRetirement, userRetirementIncome));
    setRetirementIncome(userRetirementIncome);
    setRetirementYears(userYearsToRetirement);
    console.log('setRecommendedTSPContribution', recommendedTSPContribution);
    console.log('setRetirementIncome', retirementIncome);
    console.log('setRetirementYears', retirementYears);
    openRes();
  };

  React.useEffect(() => {
    console.log('setOpen', openModal);
    //console.log('setOpenRes', openRes);
    setOpen(openModal);
  }, [openModal]);

  const handleChangeYears = (event: Event, newValue: number | number[]) => {
    setUserYearsToRetirement(newValue as number);
  };

  const handleChangeIncome = (event: Event, newValue: number | number[]) => {
    setUserRetirementIncome(newValue as number);
  };

  const recommendedTSPContribution = calculateSavingsForRetirement(userYearsToRetirement, userRetirementIncome);

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Grid container spacing={0}>

            <Grid size={11}>
              <Typography id="modal-modal-title" variant="h5" color={mainHeader}>
                TSP Strategy: Update Your Contributions
              </Typography>
            </Grid>
            <Grid size={1} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Typography
                variant="h5"
                color={medDarkGray}
                onClick={handleClose}
                sx={{ cursor: 'pointer' }}
              >
                <CloseIcon fontSize="small" />
              </Typography>
            </Grid>

            <Grid size={12}>
              <Typography id="modal-modal-description" sx={{ mt: 2 }} color={darkGray}>
                To reach retirement at age 60 with an <strong>annual income of ${userRetirementIncome},000 in retirement</strong>, we estimate you would need to start contributing ${recommendedTSPContribution} per pay period to your TSP. You are currently contributing $150.
              </Typography>
            </Grid>

            <Grid container size={12} sx={{pr: 7, pl: 7}}>
              <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', }}>
                <Typography id="modal-modal-description" sx={{ mt: 3 }} color={darkerGray}>
                  Recommended TSP Contribution
                </Typography>
              </Grid>
              <Grid size={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography id="modal-modal-description" sx={{ }} variant='h5' color={darkerGray}>
                  <strong>${recommendedTSPContribution} Per Pay period</strong>
                </Typography>
                <HelpIcon sx={{ color: medGray, ml: 2, fontSize: xIconSize }}/>
              </Grid>
              <Grid container size={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', mb: 5,}}>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }} color={darkerGray}>
                    Years Until Retirement
                  </Typography>
                </Grid>
                <Grid size={12} sx={{ mt: 2 }}>
                  <Slider
                    aria-label="Always visible"
                    value={userYearsToRetirement}
                    getAriaValueText={valuetext}
                    min={1}
                    max={50}
                    step={1}
                    marks={retirementYears}
                    valueLabelDisplay="on"
                    onChange={handleChangeYears}
                    sx={sliderStyle}
                  />
                </Grid>
              </Grid>
              <Grid container size={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Grid size={12} sx={{ mb: 7, display: 'flex', justifyContent: 'center'}}>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }} color={darkerGray}>
                    Desired Annual Income In Retirement
                  </Typography>
                </Grid>
                <Grid size={12}>
                  <Slider
                    aria-label="Always visible"
                    value={userRetirementIncome}
                    getAriaValueText={valuetext}
                    min={20}
                    max={100}
                    step={5}
                    marks={retirementIncome}
                    valueLabelDisplay="on"
                    onChange={handleChangeIncome}
                    sx={sliderStyle}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid container size={12} sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, mb: 2 }}>
              <Button sx={{ color: parcoDark, fontSize: '1.2rem', padding: '0.5rem 1rem' }} onClick={handleClose}>BACK</Button>
              <Button variant="contained" sx={{ background: parcoDark, fontSize: '1.2rem', padding: '0.5rem 1rem' }} onClick={handleCloseResOpen}>SET THESE GOALS</Button>
            </Grid>

          </Grid>
        </Box>
      </Modal>
    </div>
  );
}

