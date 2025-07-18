import {
  Box,
  Container,
  Flex,
  Text,
  Image,
  Link,
  VStack,
  HStack,
  Stack,
  Icon,
  Button,
  Spacer,
} from '@chakra-ui/react';
import { FaLinkedin } from 'react-icons/fa'; // Example LinkedIn Icon
import { FiCode } from 'react-icons/fi'; // Example Code Icon
import { poppins } from '@/styles/theme'; // Assuming poppins is exported from theme

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box  color="black" pt={{ base: 8, md: 20 }}  px={0} fontFamily={poppins.style.fontFamily}>
       <Box px={'5.5rem'} py={'1rem'}>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align={{ base: 'center', md: 'flex-start' }}
          gap={{ base: 8, md: 4 }} // Add gap between columns/rows
        >
          {/* Left Section */}
          <HStack align={{ base: 'center', md: 'flex-start' }} spacing={4}>
            <Stack direction={{ base: 'column', md: 'row' }}>
            <Box>
              <Image
                src={'https://res.cloudinary.com/medoptics-image-cloud/image/upload/v1752840337/Humble_beeing_black_no_text.png'} // Replace with your actual logo URL if different
                alt="Humble Beeing Logo"
                height={{ base: '80px', md: '80px' }} // Adjust size as needed
                objectFit="contain"
              />
            </Box>
            <Box>
            <HStack spacing={3}>
              <Link href="https://linkedin.com" isExternal aria-label="LinkedIn">
                <Icon as={FaLinkedin} boxSize={6} color="black" bg="#202020" p={1} borderRadius="md" />
              </Link>
              {/* Replace with actual link and consider a more specific icon if needed */}
              <Link href="#" isExternal aria-label="Developer Portfolio/Website">
                <Icon as={FiCode} boxSize={6} color="black" bg="#202020" p={1} borderRadius="md" />
              </Link>
              <Button
                size="sm"
                variant="outline"
                colorScheme="whiteAlpha"
                borderColor="gray.600"
                color="black"
                _hover={{ bg: 'gray.700' }}
                ml={2} // Add margin to space it from icons
              >
              <Link href='https://www.dralegawebops.com/' isExternal aria-label="Developer Portfolio/Website" color='black'>
                Built by DWO
              </Link>
                
              </Button>
            </HStack>
            <Text 
            fontSize="0.875rem"
            fontFamily="Poppins"
            fontStyle='normal'
            fontWeight={500}
            color="black"
            lineHeight={'1.5rem'}
            pt={2}
            display={{base:'none', lg:'flex'}}
            >
              © {currentYear} Ashton & Carrington. All rights reserved
            </Text>
            </Box>
            </Stack>
          </HStack>

          {/* Spacer for Medium+ screens */}
          <Spacer display={{ base: 'none', md: 'block' }} />

          {/* Right Section */}
          <VStack align={{ base: 'center', md: 'flex-end' }} spacing={1} textAlign={{ base: 'center', md: 'right' }}>

            
            <Link color={'black'} 
              href="mailto:hello@humble-beeing.com" 
              fontSize="0.875rem"
              fontFamily="Poppins"
              fontStyle='normal'
              fontWeight={500}
              lineHeight={'1.5rem'}
          
              _hover={{ textDecoration: 'underline' }}>
              hello@humble-beeing.com
            </Link>
            <Text
              fontSize="0.875rem"
              fontFamily="Poppins"
              fontStyle='normal'
              fontWeight={500}
              color="black"
              lineHeight={'1.5rem'}
            >
              2nd Floor, Tools and Machinery Building, Kabalagala, Kampala
            </Text>

            <Text 
            fontSize="0.875rem"
            fontFamily="Poppins"
            fontStyle='normal'
            fontWeight={500}
            color="black"
            lineHeight={'1.5rem'}
            pt={2}
            display={{base:'flex', lg:'none'}}
            >
              © {currentYear} HB Fine Honey Suppliers Limited. All rights reserved
            </Text>
          </VStack>
        </Flex>
      </Box>
    </Box>
  );
};

export default Footer; 