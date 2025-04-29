import {
    Box,
    Flex,
    HStack,
    Link,
    IconButton,
    Button,
    Drawer,
    VStack,
    Text,
    Portal,
  } from '@chakra-ui/react';
  import { Menu, X } from 'lucide-react';
  import { useRef } from "react"

  
  // Reusable NavLink component (Consider moving to its own file if used elsewhere)
  const NavLink = ({ children, href }) => (
    <Link
      px={3}
      py={1}
      rounded={'md'}
      color={'#00DEE3'} // Cyan color
      _hover={{
        textDecoration: 'none',
      }}
      href={href}
      fontFamily="Poppins"
      fontWeight={500}
    >
      {children}
    </Link>
  );
  
  export default function MobileDrawer({ isOpen, onClose, navItems, getInTouchText = "Get in Touch" }) {
    const ref = useRef<HTMLInputElement>(null)

    return (

      <Drawer.Root size={'full'} placement="start" initialFocusEl={() => ref.current}>
      <Drawer.Trigger asChild>
         <Menu 
          color='#00C6CB'
           size={'2rem'}
            mr={-10}
          />
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content bg='#1A2130' color="#00DEE3" ref={ref}>
            <Drawer.Body>
            <VStack spacing={12} align="stretch" pt={'6rem'}>
                  {navItems.map((item) => (
                    <NavLink key={item.label} href={item.href}>
                      <Text
                        fontSize={"1.75rem"}
                        fontFamily="Poppins"
                        fontStyle='normal'
                        fontWeight={500}
                        color="#00E2E5"
                        lineHeight={'normal'}
                        letterSpacing="0.14rem"
                        textTransform={'uppercase'}
                        mb={4}
                      >
                        {item.label}
                      </Text>
                    </NavLink>
                  ))}
                  <NavLink href='/contact'>
                  <Button
                    mt={2}
                    px={'0.625rem'}
                    py={'1.25rem'}
                    variant={'outline'}
                    bgColor={'#000819'}
                    borderColor={'#00DEE3'}
                    borderWidth={'2px'}
                    borderRadius={'2px'}
                    _hover={{ bg: 'rgba(0, 222, 227, 0.1)', color: '#00DEE3' }}
                    fontFamily="Poppins"
                    fontWeight={500}
                    w="full"
                  >
                    <Text
                      fontSize={"1.75rem"}
                      fontFamily="Poppins"
                      fontStyle='normal'
                      fontWeight={500}
                      color="#00E2E5"
                      lineHeight={'normal'}
                      letterSpacing="0.14rem"
                      textTransform={'uppercase'}
                    >
                      {getInTouchText}
                    </Text>
                  </Button>
                  </NavLink>
                </VStack>
            </Drawer.Body>

            <Drawer.CloseTrigger asChild>
              <Box m={6}>
                <X color="#00E2E5" size={'2.75rem'} />
              </Box>
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  

    );
  }
  