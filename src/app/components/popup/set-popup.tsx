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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '42vw',
  boxShadow: 24,
  p: 4,
  background: 'white',
  borderRadius: '10px',
  borderWidth: '1px',
  borderColor: '#D2D6DA',
};

const lightGray = '#D2D6DA'
const medGray = '#A3A7AA';
const medDarkGray = '#75787B';
const darkGray = '#495057';
const darkerGray = '#24282b';
const secondaryDark = '#344767';
const mainHeader = 'black'
const xIconSize = '18px';
const parcoDark = '#344767'

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
}

function valuetext(value: number) {
  return `$${value}K`;
}


function calculateSavingsForRetirement(yearsToRetirement: number, retirementIncome: number) {
  return Math.floor(((1000 * retirementIncome) * 0.25) / yearsToRetirement);
}

export default function ModalPopup({openModal, closeCallback}:any) {
  const [userYearsToRetirement, setUserYearsToRetirement] = React.useState(34);
  const [userRetirementIncome, setUserRetirementIncome] = React.useState(60);
  const [open, setOpen] = React.useState(openModal);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    closeCallback();
  }

  React.useEffect(()=>{
    console.log('opne modal', openModal);
    setOpen(openModal);
  },[openModal]);

  const handleChangeYears = (event: Event, newValue: number | number[]) => {
    setUserYearsToRetirement(newValue as number);
  };

  const handleChangeIncome = (event: Event, newValue: number | number[]) => {
    setUserRetirementIncome(newValue as number);
  };

  const recommendedTSPContribution = calculateSavingsForRetirement(userYearsToRetirement, userRetirementIncome);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <Grid container spacing={0}>

            <Grid size={11}>
              <Typography id="modal-modal-title" variant="h5" color={mainHeader}>
                TSP Strategy: Update Your Contributions
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }} color={darkGray}>
                To reach retirement at age 60 with an <strong>annual income of ${userRetirementIncome} in retirement</strong>, we estimate you would need to start contributing ${recommendedTSPContribution} per pay period to your TSP. You are currently contributing $150.
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

            <Grid container size={12} sx={{pr: 7, pl: 7}}>
              <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', border: '1px solid', borderColor: lightGray }}>
                <Typography id="modal-modal-description" sx={{ mt: 3 }} color={darkerGray}>
                  Recommended TSP Contribution
                </Typography>
              </Grid>
              <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', border: '1px solid' }}>
                <Typography id="modal-modal-description" sx={{ }} variant='h5' color={darkerGray}>
                  <strong>${recommendedTSPContribution} Per Pay period</strong>
                </Typography>
                <HelpIcon sx={{ color: medGray, ml: 2, fontSize: xIconSize }}/>
              </Grid>
              <Grid container size={12} sx={{ display: 'flex', justifyContent: 'center', border: '1px solid' }}>
                <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', mb: 5,}}>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }} color={darkerGray}>
                    Years Until Retirement
                  </Typography>
                </Grid>
                <Grid size={12}>
                  <Slider
                    aria-label="Always visible"
                    value={userYearsToRetirement}
                    getAriaValueText={valuetext}
                    step={1}
                    marks={retirementYears}
                    valueLabelDisplay="on"
                    onChange={handleChangeYears}
                    sx={sliderStyle}
                  />
                </Grid>
              </Grid>
              <Grid container size={12} sx={{ display: 'flex', justifyContent: 'center', border: '1px solid' }}>
                <Grid size={12} sx={{ mb: 5, display: 'flex', justifyContent: 'center'}}>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }} color={darkerGray}>
                    Desired Annual Income In Retirement
                  </Typography>
                </Grid>
                <Grid size={12}>
                  <Slider
                    aria-label="Always visible"
                    value={userRetirementIncome}
                    getAriaValueText={valuetext}
                    step={5}
                    marks={retirementIncome}
                    valueLabelDisplay="on"
                    onChange={handleChangeIncome}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid container size={12} sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button sx={{ color: parcoDark, fontSize: '1.2rem', padding: '0.5rem 1rem' }}>BACK</Button>
              <Button variant="contained" sx={{ background: parcoDark, fontSize: '1.2rem', padding: '0.5rem 1rem' }}>SET THESE GOALS</Button>
            </Grid>

          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
