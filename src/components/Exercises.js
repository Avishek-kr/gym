import { Pagination, Box, Stack, Typography } from '@mui/material'
import React, {useState, useEffect} from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { exerciseOptions, fetchData } from '../utils/fetchData'
import ExercisesCard from './ExercisesCard'


const Exercises = ({setExercises, exercises, bodyPart}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const exercisesPerPage = 9;

  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise)


  const paginate=((e, value)=>{
    setCurrentPage(value)

    window.scrollTo({top:1800, behaviour: "smooth"})
  })

  useEffect(()=>{
    const fetchExercisesData=async()=>{
      let exercisesData = [];

      if(bodyPart === 'all'){
        setLoading(true)
        exercisesData = await fetchData(`https://exercisesdb.p.rapidapi.com/exercises`, exerciseOptions)
        setLoading(false)
      }else{
        setLoading(true)
        exercisesData = await fetchData(`https://exercisesdb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, exerciseOptions)
        setLoading(false)
      }
      setExercises(exercisesData);
    }
    fetchExercisesData()
  },[bodyPart])

  console.log(exercises);

  return (
    <Box id="exercises"
       sx={{ mt: { lg: '109px' } }} mt="50px" p="20px">
        <Typography variant="h4" fontWeight="bold" sx={{ fontSize: { lg: '44px', xs: '30px' } }} mb="46px">Showing Results</Typography>
        {loading ? 
          <Box justifyContent="center" display="flex">
            <CircularProgress color="inherit" /> 
          </Box> :
          <Stack direction="row" sx={{ gap: { lg: '107px', xs: '50px' } }} flexWrap="wrap" justifyContent="center">
            {currentExercises.map((exercise, index)=>(
              <ExercisesCard key={index} exercise={exercise} />
            ))}
          </Stack>
        }
      <Stack mt="100px" alignItems="center">
      {exercises.length > 9 && (
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
    </Box>
  )
}

export default Exercises