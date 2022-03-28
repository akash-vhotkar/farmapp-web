// theme.js
import { extendTheme } from '@chakra-ui/react'

const theme = {
    // 1. We can update the base styles
    baseStyle: {
        fontWeight: 'bold', // Normally, it is "semibold"
    },
    // 2. We can add a new button size or extend existing
    sizes: {
        xl: {
            h: '56px',
            fontSize: 'lg',
            px: '32px',
        },
    },
    // 3. We can add a new visual variant
    variants: {
        link: {
            as:'u'
            
        },
        // 4. We can override existing variants
        solid: (props) => ({
            bg: "brand.700",
            color:'white',
            _hover:{
                bg: 'brand.800',
              }
        }),
    },
}

export default theme