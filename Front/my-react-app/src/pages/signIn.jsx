import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Button,
} from "@material-tailwind/react";


export default function SignIn() {
    const [email,setEmail] = React.useState("");
    const [password,setPassword] = React.useState("");
    const [rememberMe, setRememberMe] = React.useState(false);
    const handleSignIne = () => {
        if(!email||!password) {
            alert("Please fill in all fields");

        }
        else {
            // Handle sign-in logic here
            alert(`Email: ${email}, Password: ${password}, Remember Me: ${rememberMe}`);
        }
    };
    return (
        <div className={"flex items-center justify-center min-h-screen bg-gray-100"}>
        <Card className="w-96">
            <CardHeader
                variant="gradient"
                color="orange"
                className="mb-4 grid h-28 place-items-center"
            >
                <Typography variant="h3" color="white">
                    Sign In
                </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
                <Input label="Email" size="lg" onChange={()=>setEmail(e.target.value)}/>
                <Input label="Password" size="lg" onChange={()=>setPassword(e.target.value)} />
                <div className="-ml-2.5">
                    <Checkbox label="Remember Me" />
                </div>
            </CardBody>
            <CardFooter className="pt-0">
                <Button variant="gradient" fullWidth>
                    Sign In
                </Button>
                <Typography variant="small" className="mt-6 flex justify-center">
                    Don&apos;t have an account?
                    <Typography
                        as="a"
                        href="#signup"
                        variant="small"
                        color="blue-gray"
                        className="ml-1 font-bold"
                    >
                        Sign up
                    </Typography>
                </Typography>
            </CardFooter>
        </Card>
            </div>
    );
}
