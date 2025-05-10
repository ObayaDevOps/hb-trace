"use client"

import { Button, Field, Input, Stack, Text } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { useState } from "react";

export default function Form ({ buttonPosition='absolute' }){
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid }, // Destructure errors, isSubmitting, isValid
    reset, // Get reset from useForm
  } = useForm({
    mode: "onSubmit", // Validate on submit
    reValidateMode: "onChange" // Re-validate when input changes after first submit attempt
  });

  // This function will ONLY run if validation passes
  const onSubmit = async (data) => {
    console.log("Form data is valid:", data);
    setShowSuccessMessage(false);

    // Data is already collected by react-hook-form in the 'data' object
    // let userTypedData = {
    //   Name: data.name, // Use data from react-hook-form
    //   Email: data.email,
    //   PhoneNumber: data.phoneNumber,
    //   Message: data.userMessage
    // }

    try {
        const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // Send the validated data
        });

        if (res.ok) {
            console.log("Form submitted successfully!");
            setShowSuccessMessage(true);
            reset(); // Reset form fields
            // Optionally: Reset form, show success message
            // reset(); // You can get 'reset' from useForm() if needed
        } else {
            console.error("Form submission failed:", res.statusText);
            setShowSuccessMessage(false);
            // Optionally: Show a generic API error message
        }
    } catch (error) {
        console.error("An error occurred during submission:", error);
        setShowSuccessMessage(false);
        // Optionally: Show a network error message
    }
  }

  // This function can be used to see errors when validation fails on submit attempt
  const onInvalid = (errors) => {
    console.log("Validation Errors:", errors);
    setShowSuccessMessage(false);
  }

  // Determine if the main error message should be shown
  // Show after first submission attempt if there are errors
  const showMainError = Object.keys(errors).length > 0 && !isValid && isSubmitting === false;
  // Note: We check isSubmitting === false because during the async onSubmit, isValid might become true temporarily before an API error, etc.
  // A simpler check could be just checking if errors object has keys after the first submit attempt.
  // For simplicity after the first submit attempt (`isSubmitted` flag could also be used from `formState`):
  // const showMainError = formState.isSubmitted && Object.keys(errors).length > 0;

  return (
    // Use handleSubmit provided by react-hook-form
    // It handles event.preventDefault() and calls onSubmit on success, onInvalid on failure
    <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
      <Stack gap="4" align="flex-start" width="full" pt={6}>
        {/* --- Name Field --- */}
        <Field.Root invalid={!!errors.name} width="full"> {/* Added width="full" for consistency */}
          <Field.Label> {/* Removed colour='white', Text component handles color */}
            <Text
                fontFamily='Poppins'
                fontSize='0.75rem'
                lineHeight='normal'
                fontWeight='400'
                fontStyle='normal'
                color='#CCCED1'
            >
                Name
            </Text>
            </Field.Label>
          <Input
            {...register("name", { // Register with validation rules
                required: "Name is required"
             }
            
            )}
            placeholder='John Appleseed'
            fontFamily='Poppins'
            fontSize={'0.875rem'}
            color='white'
            borderColor={errors.name ? 'red.500' : undefined} // Highlight border on error
            _focus={{ borderColor: errors.name ? 'red.500' : '#00DEE3' }} // Keep focus style consistent
          />
          {/* Display specific field error */}
          <Field.ErrorText color="red.400" fontSize="0.75rem">{errors.name?.message}</Field.ErrorText>
        </Field.Root>

        {/* --- Email Field --- */}
        <Field.Root invalid={!!errors.email} width="full">
          <Field.Label>
            <Text
                fontFamily='Poppins'
                fontSize='0.75rem'
                lineHeight='normal'
                fontWeight='400'
                fontStyle='normal'
                color='#CCCED1'
            >
            Email
            </Text>
            </Field.Label>
          <Input
            {...register("email", { // Register with validation rules
                required: "Email is required",
                pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                }
             })}
            // name="email" // Not needed when using register
            color='white'
            type="email"
            placeholder='john.appleseed@ac.co.uk'
            fontFamily='Poppins'
            fontSize={'0.875rem'}
            borderColor={errors.email ? 'red.500' : undefined}
            _focus={{ borderColor: errors.email ? 'red.500' : '#00DEE3' }}
          />
           {/* Corrected error key */}
          <Field.ErrorText color="red.400" fontSize="0.75rem">{errors.email?.message}</Field.ErrorText>
        </Field.Root>

        {/* --- Phone Number Field --- */}
        <Field.Root invalid={!!errors.phoneNumber} width="full">
          <Field.Label>
            <Text
                fontFamily='Poppins'
                fontSize='0.75rem'
                lineHeight='normal'
                fontWeight='400'
                fontStyle='normal'
                color='#CCCED1'
            >
            Phone Number
            </Text>
            </Field.Label>
          <Input
            {...register("phoneNumber", { // Register with validation rules
                required: "Phone number is required"
             })}
            // name="phoneNumber" // Not needed when using register
            color='white'
            placeholder='+447123456789'
            fontFamily='Poppins'
            fontSize={'0.875rem'}
            borderColor={errors.phoneNumber ? 'red.500' : undefined}
            _focus={{ borderColor: errors.phoneNumber ? 'red.500' : '#00DEE3' }}
          />
          <Field.ErrorText color="red.400" fontSize="0.75rem">{errors.phoneNumber?.message}</Field.ErrorText>
        </Field.Root>

        {/* --- Message Field --- */}
        <Field.Root invalid={!!errors.userMessage} width="full">
          <Field.Label>
            <Text
                fontFamily='Poppins'
                fontSize='0.75rem'
                lineHeight='normal'
                fontWeight='400'
                fontStyle='normal'
                color='#CCCED1'
            >
            Message
            </Text>
            </Field.Label>
          <Input
            {...register("userMessage", { // Register with validation rules
                required: "Message is required"
             })}
            // name="userMessage" // Not needed when using register
            placeholder='Leave your message here...'
            fontFamily='Poppins'
            fontSize={'0.875rem'}
            color='white'
            borderColor={errors.userMessage ? 'red.500' : undefined}
            _focus={{ borderColor: errors.userMessage ? 'red.500' : '#00DEE3' }}
          />
           {/* Corrected error key */}
          <Field.ErrorText color="red.400" fontSize="0.75rem">{errors.userMessage?.message}</Field.ErrorText>
        </Field.Root>

        {/* --- General Error Message --- */}
        {/* Show this only if there are validation errors after an attempt */}
        { Object.keys(errors).length > 0 && !showSuccessMessage && (
            <Text color="#DB3E00" 
            fontFamily="Poppins"
            fontSize="0.75rem" fontWeight="400" width="full" textAlign="right" mt={2} mb={'-2rem'}>
                Please fill in all details and message.
            </Text>
        )}

        {/* --- Success Message --- */}
        {showSuccessMessage && (
          <Text
            color="green.400"
            fontFamily="Poppins"
            fontSize="0.75rem"
            fontWeight="400"
            width="full"
            textAlign="right"
            mt={2}
            mb={'-2rem'}
          >
            Message sent successfully!
          </Text>
        )}

        {/* --- Submit Button --- */}
        {/* Note: The button's position might need adjustment relative to the error message */}
        <Button
            type="submit"
            variant={'outline'}
            bgColor={'#00DEE3'}
            borderColor={'#00DEE3'}
            _hover={{ bg: 'rgba(0, 222, 227, 0.1)', color: '#00DEE3' }}
            fontFamily="Poppins"
            fontWeight={500}
            position={buttonPosition} // Keep the prop for flexibility
            right={0}
            bottom={0}
            mb={'1.5rem'} // Adjust margin if needed due to error message
            mr={'2rem'}
            isLoading={isSubmitting} // Disable button and show loading spinner during submission
            mt={4} // Add some top margin to separate from the last field/error message
        >
            Send Message
        </Button>
      </Stack>
    </form>
  )
}

