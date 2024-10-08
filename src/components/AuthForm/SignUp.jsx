import { useState } from "react";
import { Alert, AlertIcon, Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    email: "",
    userName: "",
    password: "",
  });
  const { loading, error, signUp } = useSignUpWithEmailAndPassword();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Input
        value={inputs.email}
        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
        placeholder="Email"
        type="email"
        size="sm"
        fontSize={14}
      />
      <Input
        value={inputs.userName}
        onChange={(e) => setInputs({ ...inputs, userName: e.target.value })}
        placeholder="Username"
        size="sm"
        type="text"
        fontSize={14}
      />
      <Input
        value={inputs.fullName}
        onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
        placeholder="Full Name"
        type="text"
        size="sm"
        fontSize={14}
      />
      <InputGroup>
        <Input
          value={inputs.password}
          onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          minLength={6}
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          size="sm"
          fontSize={14}
        />
        <InputRightElement h="full">
          <Button
            variant={"ghost"}
            size={"sm"}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>
      {error && (
        <Alert status="error" fontSize={12} p={2} borderRadius={4}>
          <AlertIcon fontSize={11} />
          User already exists with this email
        </Alert>
      )}
      <Button isLoading={loading} onClick={() => signUp(inputs)} width={"full"} colorScheme="blue" size={"sm"} fontSize={14}>
        Sign Up
      </Button>
    </>
  );
};

export default SignUp;
