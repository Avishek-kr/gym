import React from 'react'
import { Box, Typography, Stack } from '@mui/material'
import Loader from './Loader'
import HorizontalScrollbar from "./HorizontalScrollbar"


const SimilarExercise = ({equipemntVideos, targetVideos}) => {
  console.log(equipemntVideos);
  return (
    <Box sx={{ mt: { lg: '10px', xs: '0px' } }}>
    <Typography sx={{ fontSize: { lg: '44px', xs: '25px' }, ml: '20px' }} fontWeight={700} color="#000" mb="33px">
      Similar <span style={{ color: '#FF2625', textTransform: 'capitalize' }}>Target Muscle</span> exercises
    </Typography>
    <Stack direction="row" sx={{ p: 2, position: 'relative' }}>
      {targetVideos.length !== 0 ? <HorizontalScrollbar data={targetVideos} /> : <Loader />}
    </Stack>
    <Typography sx={{ fontSize: { lg: '44px', xs: '25px' }, ml: '20px', mt: { lg: '100px', xs: '60px' } }} fontWeight={700} color="#000" mb="33px">
      Similar <span style={{ color: '#FF2625', textTransform: 'capitalize' }}>Equipment</span> exercises
    </Typography>
    <Stack direction="row" sx={{ p: 2, position: 'relative' }}>
      {equipemntVideos.length !== 0 ? <HorizontalScrollbar data={equipemntVideos} /> : <Loader />}
    </Stack>
    </Box>
  )
}

export default SimilarExercise