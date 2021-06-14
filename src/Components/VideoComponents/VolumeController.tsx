import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';

const useStyles = makeStyles({
    root: {
      width: 200,
    },
  });

  interface VolumeControllerProps{
      currentVolume: (vol: number) => void;
  }

const VolumeController : React.FunctionComponent<VolumeControllerProps> = (props) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(30);
  
    const handleChange = (event: any, newValue: any) => {
      setValue(newValue);
      props.currentVolume(newValue);    
    };
  
    return (
      <div className={classes.root}>
        <Typography id="continuous-slider" gutterBottom>
          Volume
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <VolumeDown />
          </Grid>
          <Grid item xs>
            <Slider value={value} onChange={handleChange} aria-labelledby="continuous-slider" />
          </Grid>
          <Grid item>
            <VolumeUp />
          </Grid>
        </Grid>
        <Typography>
            {value}
        </Typography>
      </div>
    );
}

export default VolumeController
