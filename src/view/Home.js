import {
  Flex,
  Box,
  Grid,
  GridItem,
  Container,
  FormControl,
  FormLabel,
  Spacer,
  Input,
  Checkbox,
  Center,
  Stack,
  Link,
  Button,
  Heading,
  Image,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import HomeLayout from '../layout/HomeLayout';
import Navbar from '../layout/HomeLayout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import item1 from '../assets/images/item1.jpg';
import item2 from '../assets/images/item5.jpg';
import item3 from '../assets/images/item4.jpg';
import item6 from '../assets/images/item6.png';
import banner from '../assets/images/banner.jpg';
import banner2 from '../assets/images/banner3.jpg';
const url = "https://ecommerce-project-sumit.herokuapp.com"


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
          style={{ height: "100vh" }} bg='white' backgroundImage={banner} color='#262626' centerContent backgroundSize={"cover"}>
          <Box style={{ margin: "auto" }}>
            <Flex>
              <Box pl='4' m={"auto"} w={"50%"} color={"white"}>
                <Center m={"auto"}>
                  <Text fontWeight={"bold"} fontSize="5rem">AGZONE</Text> </Center>
                  <Text fontWeight={"bold"} fontSize="3rem"> ONE OF INDIA'S LEADING MANUFACTURERS AND EXPORTERS OF AGRO PRODUCTS</Text>
                
                <Text>Food is one of the most basic human rights and needs: without adequate, nutritious food, people are unable to work and, in some cases, live. Almost a billion people in the world today are chronically undernourished, and many more are food insecure, meaning that they do not know where their next meal will come from. About three-quarters of those in Africa that live off of $1 a day are subsistence farmers.  </Text>
                <Center mt={"100px"}>
                  <Flex w={"50%"}>
                    <Spacer />
                    <Box>
                      <Button
                        as={'a'}
                        w="250px"

                        display={{ base: 'none', md: 'inline-flex' }}
                        fontSize={'sm'}
                        fontWeight={600}
                        color={'white'}
                        bg={'brand.700'}
                        href={'/signup'}
                      >
                        Sign Up Now
                      </Button>

                    </Box>
                  </Flex>
                </Center>
              </Box>
              <Box w="50%">
                <Image w={"100%"} src={item6} />
              </Box>

            </Flex>

          </Box>
        </Container>
        <Center h='auto' bg='white' backgroundColor={"#3ee66b"}>
          <Box
            minH={'100vh'}
            w={"75%"}
            backgroundColor={"#3ee66b"}

          >

            <Flex minH={'30vh'}
              align={'center'}
              justify={'center'}
              backgroundColor={"#3ee66b"}
            >
              <Flex>


                <Text fontFamily={"bold"} fontWeight="bold" fontSize={"2rem"}> How we are helping farmers</Text>
              </Flex>

            </Flex>
            <Container maxW='100%'   >
              <Box padding={2} color='black' maxW='100%' backgroundColor={"#3ee66b"}>
                <Flex>
                  <Box w="50%">
                    <Image w={"100%"} src={item2} />
                  </Box>
                  <Box pl='4' w={"50%"}>
                    <Center>
                      <Text fontWeight={"bol"} fontSize="2rem">Protect and preserve the natural environment</Text> </Center>
                    <Text>Without a healthy natural environment where native flora and fauna live productively, long-term sustainable agricultural practices will fail. Farms must be developed in conjunction and cooperation with local ecology, not at its expense.</Text>
                  </Box>
                </Flex>
                <Flex>
                  <Box pl='4' w={"50%"}>
                    <Center>
                      <Text fontWeight={"bol"} fontSize="2rem"> Implement community – specific programs</Text> </Center>
                    <Text> Every region has unique characteristics and therefore unique needs. Individualized programs that meet the needs of specific regions are more likely to succeed. This is the approach used by the Millennium Villages Project </Text>
                  </Box>
                  <Box w="50%">
                    <Image w={"100%"} src={item3} />
                  </Box>

                </Flex>
                <Flex>
                  <Box w="50%">
                    <Image w={"100%"} src={item2} />
                  </Box>
                  <Box pl='4' w={"50%"}>
                    <Center>
                      <Text fontWeight={"bol"} fontSize="2rem">Teach and implement sustainable farming techniques</Text> </Center>
                    <Text>Farming techniques such as agroforestry, organic agriculture, and permaculture are more sustainable and practical on a small, rural scale. Poor farmers need to learn about these techniques and have access to the resources they need in order to implement them. </Text>
                  </Box>
                </Flex>
              </Box>
            </Container>
            
          </Box>
        </Center>
        <Center
        backgroundImage= {banner2}
        backgroundRepeat={'no-repeat'}
        backgroundSize={"cover"}
        >

        <Box
              color={"white"}
              width={"100vh"}
            >
               
              <Container maxW='2Xl'
                style={{ marginTop: "50px", marginBottom: "50px", color: "black" }} centerContent >
                <Box style={{ margin: "auto", color: "white" }}>
                  <Text fontSize={"3rem"} fontWeight="bold" color={"black"}>About</Text>
                </Box>
              </Container>

              <Container maxW='container.sm' style={{ marginBottom: "100px" }}>
                <Grid templateColumns='repeat(2, 1fr)' gap={2}>
                  <GridItem colSpan={2} w='100%' h='500' bg='tomato' />
                  <GridItem colStart={4} w='100%' colEnd={6} h='10'  >
                    <Text fontSize={"1rem"} style={{ marginBottom: "40px" }}>Food is one of the most basic human rights and needs: without adequate, nutritious food, people are unable to work and, in some cases, live. Almost a billion people in the world today are chronically undernourished, and many more are food insecure, meaning that they do not know where their next meal will come from. About three-quarters of those in Africa that live off of $1 a day are subsistence farmers. Helping subsistence farmers grow more food is key to lifting rural communities out of poverty. </Text>
                    <Text fontSize={"1rem"} style={{ marginBottom: "50px" }}>farmers engaged in aquaculture enhance their yield and quality. With the use of this mobile app, farmers can reach the manufacturers of feed, medicines and supplies directly, eliminating the middlemen in transactions and bringing more transparency to the pricing and business. The platform brings even more value to the farmer by tracking the weather, providing relevant advice as per changing weather conditions based on the latest advancements in aquaculture, helping track the aqua conditions and the health of the fish.</Text>

                  </GridItem>
                </Grid>
              </Container>
            </Box>
            </Center>
        
      </HomeLayout>
    </React.Fragment>
  );
}