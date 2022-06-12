import { Box } from '@mui/material'
import React,{useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Detail from '../components/Detail'
import ExerciseVideos from '../components/ExerciseVideos'
import SimilarExercise from '../components/SimilarExercise'

import { exerciseOptions, fetchData, youtubeOptions } from '../utils/fetchData'

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [targetVideos, setTargetVideos] = useState([]);
  const [equipemntVideos, setEquipmentVideos] = useState([]);
  const {id} = useParams();

  useEffect(()=>{
    const fetchExerciseData = async()=>{
      const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com';
      const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';

      const exerciseDetailsData = await fetchData(`${exerciseDbUrl}/exercises/exercise/${id}`, exerciseOptions)
      setExerciseDetail(exerciseDetailsData)

      const exerciseVideoData = await fetchData(`${youtubeSearchUrl}/search?query=${exerciseDetailsData.name}`, youtubeOptions)
      setExerciseVideos(exerciseVideoData.contents)

      const targetMuscleExerciseData  = await fetchData(`${exerciseDbUrl}/exercises/target/${exerciseDetailsData.target}`, exerciseOptions)
      setTargetVideos(targetMuscleExerciseData)

      const equipmentExerciseData  = await fetchData(`${exerciseDbUrl}/exercises/equipment/${exerciseDetailsData.equipment}`, exerciseOptions)
      setEquipmentVideos(equipmentExerciseData)

    }
    fetchExerciseData()
  },[id])

  return (
    <Box>
      <Detail exerciseDetail={exerciseDetail} />
      <ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseDetail.name} />
      <SimilarExercise targetVideos={targetVideos} equipemntVideos={equipemntVideos} />
    </Box>
  )
}

export default ExerciseDetail