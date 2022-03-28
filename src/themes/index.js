import { extendTheme } from '@chakra-ui/react'
import  AlertTheme  from './Alert';
import  ButtonTheme from './Button';
import InputTheme  from './Input';
// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    800: '#ffa769',
    700: '#f26400',
  },
  text : {
    100:  "#FFFFFF"
    
    

  },
  a: {
    color: 'black',
    _hover: {
      textDecoration: 'underline',
      color :  "brand.700"
    },
  },
  textStyles: {
    h1: {
      // you can also use responsive styles
      fontSize: ['48px', '72px'],
      fontWeight: 'bold',
      lineHeight: '110%',
      letterSpacing: '-2%',
    },
    h2: {
      fontSize: ['36px', '48px'],
      fontWeight: 'semibold',
      lineHeight: '110%',
      letterSpacing: '-1%',
    },
  }
}

const theme = extendTheme({
     colors ,
     components: {
        Button: ButtonTheme,
        Input: InputTheme
    }
    
    })

export default   theme;

