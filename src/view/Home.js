import {
  Flex,
  Box,
  Grid,
  GridItem,
  Container,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import HomeLayout from '../layout/HomeLayout';
import Navbar from '../layout/HomeLayout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import banner from '../assets/images/banner.jpg';

const url = "http://localhost:4000"


export default function SimpleCard() {
  const navigate = useNavigate();
  const [errcheck, setErrcheck] = useState('');
  const [logIndata, setLogIndata] = useState({ email: '', password: '' });

  const handleSubmit = ((e) => {
    if (!logIndata.email || !logIndata.password) {
      setErrcheck("Kindly fill in all fields.")
    }
    else {
      console.log(logIndata)
      axios.post(`${url}/api/v1/login`, logIndata)
        .then((res) => {
          console.log(res);
          localStorage.setItem('profile', JSON.stringify({ token: res?.data.token, id: res.data.user._id }))
          if (res.data.user.role === "user") {
            navigate('/home')
          }
          else {
            navigate('/')
          }
        })
        .catch((err) => {

          setErrcheck("Username or password incorrect");
        })
    }
  })

  const handleChange = (e) => {
    setLogIndata({ ...logIndata, [e.target.name]: e.target.value })
  }

  return (
    <React.Fragment>
      <HomeLayout>
        <Container maxW='2Xl'
          style={{ height: "100vh" }} bg='green.400' color='#262626' centerContent backgroundImage={banner} backgroundRepeat={"no-repeat"} backgroundSize={"cover"}>
          <Box style={{ margin: "auto" }}>
            <Text fontSize={"3rem"} fontWeight="bold" color={"white"}> An app for aqua farmers which lets them enhance the yield and profits.</Text>
          </Box>
        </Container>
        <Container maxW='2Xl'
          style={{marginTop:"50px", marginBottom:"50px", color:"black" }}   centerContent >
          <Box style={{ margin: "auto" }}>
            <Text fontSize={"3rem"} fontWeight="bold" color={"black"}>About</Text>
          </Box>
        </Container>
       
        <Container maxW='container.sm' style={{marginBottom:"100px"}}>
          <Grid templateColumns='repeat(2, 1fr)' gap={2}>
            <GridItem colSpan={2} w='100%' h='500' bg='tomato' />
            <GridItem colStart={4} w='100%' colEnd={6} h='10'  >
              <Text fontSize={"1rem" } style={{marginBottom:"40px"}}>farmers engaged in aquaculture enhance their yield and quality. With the use of this mobile app, farmers can reach the manufacturers of feed, medicines and supplies directly, eliminating the middlemen in transactions and bringing more transparency to the pricing and business. The platform brings even more value to the farmer by tracking the weather, providing relevant advice as per changing weather conditions based on the latest advancements in aquaculture, helping track the aqua conditions and the health of the fish.</Text>
              <Text fontSize={"1rem" } style ={{marginBottom:"50px"}}>farmers engaged in aquaculture enhance their yield and quality. With the use of this mobile app, farmers can reach the manufacturers of feed, medicines and supplies directly, eliminating the middlemen in transactions and bringing more transparency to the pricing and business. The platform brings even more value to the farmer by tracking the weather, providing relevant advice as per changing weather conditions based on the latest advancements in aquaculture, helping track the aqua conditions and the health of the fish.</Text>
             
              </GridItem>
          </Grid>
        </Container>

      </HomeLayout>
    </React.Fragment>
  );
}