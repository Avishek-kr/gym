import { Pagination, Box, Stack, Typography, Button } from '@mui/material'
import React, {useState, useEffect} from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { exerciseOptions, fetchData } from '../utils/fetchData'
import {Link} from "react-router-dom"


const Exercisess = () => {
  const [loading, setLoading] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 100;

  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise)


  const paginate=((e, value)=>{
    setCurrentPage(value)

    window.scrollTo({top:0, behaviour: "smooth"})
  })



  useEffect(()=>{
    const fetchExercisesData=async()=>{
        setLoading(true)
       const exercisesData = await fetchData(`https://exercisesdb.p.rapidapi.com/exercises`, exerciseOptions)
        setLoading(false)
      setExercises(exercisesData);
    }
    fetchExercisesData()
  },[])

console.log(exercises);

  return (
    <Box p="20px">
        <Typography textAlign="center" variant="h3" fontWeight="bold" sx={{ fontSize: { lg: '44px', xs: '30px' } }} mb="46px"  mt="46px">All Exercises</Typography>
        {loading ? 
          <Box justifyContent="center" display="flex">
            <CircularProgress color="inherit" /> 
          </Box> :
          <>
          <Stack direction="row" sx={{ gap: { lg: '107px', xs: '50px' } }} flexWrap="wrap" justifyContent="center">
            {currentExercises.map((exercise, index)=>(
                <Link className='exercise-card' to={`/exercise/${exercise.id}`}  key={exercise.id}>
                <div className='exercise-card'>
                    <img src={exercise.gifUrl} alt={exercise.name} loading="lazy" />
                    <Stack direction="row">
                    <Button sx={{ ml: '21px', color: '#fff', background: '#FFA9A9', fontSize: '14px', borderRadius: '20px', textTransform: 'capitalize' }}>
                        {exercise.bodyPart}
                    </Button>
                    <Button sx={{ ml: '21px', color: '#fff', background: '#FCC757', fontSize: '14px', borderRadius: '20px', textTransform: 'capitalize' }}>
                        {exercise.target}
                    </Button>
                    </Stack>
                    <Typography ml="21px" color="#000" fontWeight="bold" sx={{ fontSize: { lg: '24px', xs: '20px' } }} mt="11px" pb="10px" textTransform="capitalize">
                    {exercise.name}
                    </Typography>
                 </div>
                 </Link>
            ))}
          </Stack>
          <Stack mt="100px" alignItems="center">
            {exercises.length > 100 && (
                <Pagination color="standard"
                shape='rounded'
                defaultPage={1}
                count={Math.ceil(exercises.length / exercisesPerPage)}
                page={currentPage}
                onChange={paginate}
                size="large"
                />
            )}
      </Stack>
      </>
        }
    </Box>
  )
}

export default Exercisess