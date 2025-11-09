import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  Heading,
  Text,
  useToast,
  FormControl,
  FormLabel,
  Flex,
} from "@chakra-ui/react";
import { Eye, EyeOff } from "lucide-react";

const REGISTERED_EMAILS = [
  "test@example.com",
  "user@test.com",
  "admin@example.com",
];

export default function SignUp() {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = () => {
    if (!email || !password || !confirmPassword) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email format",
        description: "Please enter a valid email like user@example.com.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (REGISTERED_EMAILS.includes(email.toLowerCase())) {
      toast({
        title: "Account exists",
        description: "An account with this email already exists.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Password and Confirm Password do not match.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    toast({
      title: "Account created!",
      description: `Welcome, ${email}`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <Flex bg="#f3f3f3" align="center" justify="center" minH="100vh" p={6}>
      <Box
        bg="white"
        boxShadow="xl"
        borderRadius="2xl"
        w={["90%", "500px"]}
        p={10}
        textAlign="center"
      >
        <Heading mb={2}>Sign Up</Heading>
        <Text mb={8} color="gray.600">
          Sign up to discover and join the perfect club for you!
        </Text>

        <VStack spacing={5}>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <FormControl id="confirmPassword" isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
              <Input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                placeholder="Re-enter your password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <InputRightElement>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Button
            colorScheme="green"
            w="100%"
            onClick={handleSignup}
            fontWeight="bold"
          >
            Sign Up
          </Button>

          <Box borderTop="1px" borderColor="gray.200" pt={4}>
            <Text color="gray.600">
              Already have an account?{" "}
              <Button
                variant="link"
                colorScheme="blue"
                onClick={() => alert("Navigate to Student Login")}
              >
                Go to Login
              </Button>
            </Text>
          </Box>
        </VStack>
      </Box>
    </Flex>
  );
}
