import React, { useState } from 'react';
import { Slider, Tooltip } from '@mui/material';
import { styled } from '@mui/system';

type CustomSliderProps = {
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
};

// Tooltip for slider
function ValueLabelComponent(props: any) {
  const { children, value } = props;

  return (
    <Tooltip
      open
      enterTouchDelay={0}
      placement="top"
      title={value}
      arrow
    >
      {children}
    </Tooltip>
  );
}

// Styled Slider
const CustomSlider = styled(Slider)(({ theme }) => ({
  color: 'linear-gradient(90deg, #918BE4, #D8ECF8)', // Gradient
  height: 8,
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#2B3A59', // Thumb color
    border: '2px solid white',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
    '&:focus, &:hover, &.Mui-active': {
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.4)',
    },
  },
  '& .MuiSlider-track': {
    border: 'none',
    background: 'linear-gradient(90deg, #918BE4, #D8ECF8)', // Track gradient
  },
  '& .MuiSlider-rail': {
    opacity: 0.3,
    backgroundColor: '#D8ECF8',
  },
  '& .MuiSlider-mark': {
    backgroundColor: '#2B3A59',
    height: 12,
    width: 12,
    borderRadius: '50%',
  },
}));

const CustomSliderComponent: React.FC<CustomSliderProps> = ({
  defaultValue = 30,
  min = 0,
  max = 100,
  step = 1,
}) => {
  const [value, setValue] = useState<number>(defaultValue);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  return (
    <div style={{ width: '80%', margin: '2rem auto' }}>
      <CustomSlider
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
        marks={[
          { value: 20, label: '<>' },
          { value: 40, label: '<>' },
          { value: 60, label: '<>' },
        ]}
        valueLabelDisplay="on"
        components={{ ValueLabel: ValueLabelComponent }}
      />
    </div>
  );
};

export default CustomSliderComponent;
