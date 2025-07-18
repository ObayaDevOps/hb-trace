import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { geistSans, geistMono, spaceMono, poppins } from "@/styles/theme";
import { motion } from "framer-motion";

import 'focus-visible/dist/focus-visible';


import {
  Box,
  Center,
  Text,
  Heading,
  VStack,
  Button,
  Container,
  Input,
} from '@chakra-ui/react';

// Removed unused cloudinary imports
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


// 4. Update Home component to receive props
export default function Home({ landingPageData }) {


  return (
    <Box
    // className={`${geistSans.variable} ${geistMono.variable} ${spaceMono.variable} ${poppins.variable}`}
      bg={'#f5cb81'}
      minH={'100vh'}
      display="flex"
      flexDirection="column"
      position="relative"
      overflow="hidden"
    >
      <Box
        position="absolute"
        top="0"
        left="0"
        width={{base:"110%", md: "100%", lg: "100%"}}
        height={{base:"10%", md: "20%", lg: "45%"}}
        backgroundImage="url('https://res.cloudinary.com/medoptics-image-cloud/image/upload/v1744124528/Graphic-2-Transparent_xw68uq.svg')"
        backgroundSize="cover"
        backgroundPosition="right"
        backgroundRepeat="no-repeat"
        opacity={0.1}
        zIndex={0}
      />

      <Head>
        {/* Use data from Sanity */}
        <title>Honey Trace | Humble Beeing Honey </title>
        <meta name="description" content= 'Ugandas Finest Raw Organic Honey' />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Humble_beeing_black_no_text.png" />
      </Head>

      <Navbar bg={{base: 'transparent', lg: 'none'}} />

      <Box flex="1">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
        >
        <Box py={{base: 10, lg: 16}}>
              <Center>
                    <Image
                      // Use Sanity image builder
                      src={'https://res.cloudinary.com/medoptics-image-cloud/image/upload/v1752839793/Humble_Beeing_Black_Logo_with_text.svg'}
                      alt={'Humble Beeing Logo'} // Use heading as alt text fallback
                      width={611}
                      height={250}
                      priority
                      placeholder="blur"
                      // Generate blurDataURL if metadata exists
                      blurDataURL={'https://res.cloudinary.com/medoptics-image-cloud/image/upload/v1752839793/BlackWhiteLogo_2_fl5lde.svg'} 
                    />
              </Center>

            <Center px={{base: 6, lg: 8}} pt={8}>
              <Heading
                as="h1"
                fontFamily="Poppins"
                fontSize={{ base: 'xl', md: '2rem' }}
                lineHeight={{ base: '2rem', md: '3rem' }}
                fontWeight={500}
                letterSpacing={'0.72px'}
                textAlign={'center'}
                maxW="container.md"
              >
                Trace - From Farmer to You
              </Heading>
            </Center>

            
            <Center pt={4}>
              <Input
                placeholder="Enter Unique Jar Code"
                variant="outline"
                rounded='3xl'
                borderColor="black"
                width={{ base: '90%', md: '50%' }}
              />
            </Center>
        </Box>
          </motion.div>

      </Box>

      <Footer />

    </Box>
  );
}


