'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid2';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import RangeSlider from '../rangerSlider/rangeSlider';
import EastIcon from '@mui/icons-material/East';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

const lightGray = '#D2D6DA'
const medGray = '#A3A7AA';
const medDarkGray = '#75787B';
const darkGray = '#495057';
const darkerGray = '#24282b';
const secondaryDark = '#344767';
const mainHeader = 'black'
const parcoDark = '#344767'

export default function ResPopup({openModal, closeCallback, recommendedTSPContribution, retirementIncome, retirementYears}:any) {
  const [open, setOpen] = React.useState(openModal);
  const [isActive1, setIsActive1] = React.useState(true);
  const [isActive2, setIsActive2] = React.useState(lightGray);
  const [isActive3, setIsActive3] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    closeCallback();
  }

  // for the fading effect, decides which part gets faded or activated
  React.useEffect(()=>{
    console.log('resOpen', openModal);
    setOpen(openModal);
    if (openModal) {
      setTimeout(() => {
        setIsActive1(false);
        setIsActive2(medGray);
        setIsActive3(true);
      }, 700);
    } 
    else {
      setIsActive1(true);
      setIsActive2(lightGray);
      setIsActive3(false);
    }
  },[openModal]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                width: '100vw',
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
            <Grid container spacing={2} sx={{ width: '90%', marginTop: '3vh', marginRight: '8px', marginLeft: '8px' }}>

                <Grid size={11}>
                    <Typography id="modal-modal-title" variant="h5" color={mainHeader}>
                        Your goals have been set!
                    </Typography>
                    <Typography id="modal-modal-title" variant="h5" color={mainHeader}>
                        Now let's change your TSP Contribution
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

                <Grid size={12} container spacing={2} justifyContent="center" alignItems="center">
                <Grid>
                    <RangeSlider id={"2"}value={44} width={125} isActive={isActive1}/>
                </Grid>
                <Grid>
                    <EastIcon sx={{ fontSize: '40px', color: isActive2 }}/>
                </Grid>
                <Grid>
                    <RangeSlider id={"3"} value={94} width={125} isActive={isActive3}/>
                </Grid>
                </Grid>

                <Grid size={12}>
                    <Typography style={{ color: darkGray }}>Making this change from $150 to ${recommendedTSPContribution} will boost your Retirement Readiness Score from a 44 to a 94. Putting you on track to retire making ${retirementIncome},000 annually by {new Date().getFullYear() + retirementYears}.</Typography>
                </Grid>

                <Grid size={12} container spacing={1.5}>

                    <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4 }}>
                        <Button variant="contained" sx={{ width: '100%', height: '50px', backgroundColor: secondaryDark, fontWeight: 'bold', fontSize: '18px', alignItems: 'center'}} onClick={closeCallback}>
                            <RocketLaunchIcon sx={{ fontSize: '25px', marginRight: '5px' }} />
                            Update TSP Contribution
                        </Button>
                    </Grid>
                </Grid>

            </Grid>
        </Box>
      </Modal>
    </div>
  );
}

