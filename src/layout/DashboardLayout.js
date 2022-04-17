import React, { useState,ReactNode, useEffect } from 'react';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  Image,
  DrawerContent,
  Text,
  useDisclosure,
  Select,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  toast,
  useToast,
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiTag,
  FiStar,
  FiUsers,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import logo from  '../assets/images/logo.png'
import SellerProducts  from '../view/DashboardProducts';
import AddProducts from '../view/AddProduct';
import Centers  from '../view/Centers';
import DashboardOrder from '../view/DashboardOrders';
import {useNavigate} from 'react-router-dom';
import axios from 'axios'
const url="http://localhost:4000"

const LinkItems= [
  { name: 'Products', icon: FiTrendingUp, link:"/seller-products" ,children:<SellerProducts/> },
  { name: 'Add Product', icon: FiTag , link :"/add-product", children :<AddProducts/>},
  { name: 'Orders', icon: FiTag, link :"/seller-orders" , children : <DashboardOrder/>},
  { name: 'Centers', icon: FiTag, link :"/centers" , children : <Centers/>}
  
];

export default function SidebarWithHeader(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log("the props dashboard ", props)

  const user=localStorage.getItem('profile');
  const toast=useToast()  
  
  const navigate=useNavigate()

  useEffect(()=>{
    if(localStorage.getItem('profile')!==null){
    axios.get(`${url}/api/v1/me`,{headers:{
      cookies:JSON.parse(localStorage.getItem('profile')).token
    }})
    .then((res)=>{
      if(res.data.user.role==='user'){
        toast({
          title: 'forbidden',
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
        navigate('/signin')
        
      }
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  else{
    navigate('/signin')
    toast({
      title: 'forbidden',
      status: 'error',
      duration: 9000,
      isClosable: true,
    })
}
  },[])

  
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }}  p="4">
        <Box bg={"white"} padding="20px">
          {
            props.children
          }
        </Box>
        
      </Box>
    </Box>
  );
}


const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('brand.700', 'brand.700')}
      borderRight="1px"
      color={"text.100"}
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8"  justifyContent="space-between">
        <Image src={logo} width="150px" height={"50px"}>
        </Image>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} link={link.link} children={link.children}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, link, children, ...rest }) => {
  return (
    <Link href={link} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'brand.800',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {

  const navigate = useNavigate();
  const [cuser,setCuser]=useState({avatar:"",
  email: "",
  name: "",
  role: "",
  _id:""})

  useEffect(()=>{
    if(localStorage.getItem('profile')!==null){
    axios.get(`${url}/api/v1/me`,{headers:{
      cookies:JSON.parse(localStorage.getItem('profile')).token
    }})
    .then((res)=>{
      setCuser(res.data.user)
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  else{
    navigate('/signin')
}
  },[])

  const handleClick=(()=>{
    axios.get(`${url}/api/v1/logout`)
    .then(()=>{
      localStorage.removeItem('profile')
      localStorage.removeItem("cart")
      navigate('/signin')
    })
    .catch((err)=>{
      console.log(err)
    })
  })
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        Logo
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    cuser.avatar?.url
                  }
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">Admin </Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
              <Link href={"/seller-profile"}>
              <MenuItem>
               Profile </MenuItem>
               </Link>
              <MenuDivider />
              <MenuItem onClick={handleClick}> Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};