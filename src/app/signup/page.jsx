"use client";
import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { Card } from '@heroui/react';
import Link from "next/link";
import { redirect } from "next/navigation";
import React from 'react';
import { FaGoogle } from "react-icons/fa";

const SignUpPage = () => {
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        const userData = Object.fromEntries(formData.entries())

        const { data, error } = await authClient.signUp.email({
            name: userData.name,
            email: userData.email,
            password: userData.password,
            image: userData.image,
            callbackURL: '/'
        })

        if (data) {
            alert('Account Created Successfully. Please Log In.')
            redirect('/')
        }
        if (error) {
            alert(`${error.message}`)
        }
    };
    const handleGoogleLogin = async () => {
        const data = await authClient.signIn.social({
            provider: 'google',
        })
    };
    return (
        <div className="w-1/4 mx-auto my-6">
            <div className="text-center my-4">
                <h1 className="text-5xl font-semibold">Create Account</h1>
                <p>Start your adventure with Wanderlust</p>
            </div>
            <Card className="border rounded-none">
                <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
                    <TextField
                        isRequired
                        name="name"
                        validate={(value) => {
                            if (value.length < 3) {
                                return "Name must be at least 3 characters";
                            }
                            return null;
                        }}
                    >
                        <Label>Full Name</Label>
                        <Input placeholder="Enter Your Full Name" />
                        <FieldError />
                    </TextField>
                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        validate={(value) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                return "Please enter a valid email address";
                            }
                            return null;
                        }}
                    >
                        <Label>Email Address</Label>
                        <Input placeholder="Enter Your Email Address" />
                        <FieldError />
                    </TextField>
                    <TextField
                        name="image"
                    >
                        <Label>Image URL</Label>
                        <Input placeholder="Enter Your Image URL" />
                        <FieldError />
                    </TextField>
                    <TextField
                        isRequired
                        minLength={8}
                        name="password"
                        type="password"
                        validate={(value) => {
                            if (value.length < 8) {
                                return "Password must be at least 8 characters";
                            }
                            if (!/[A-Z]/.test(value)) {
                                return "Password must contain at least one uppercase letter";
                            }
                            if (!/[0-9]/.test(value)) {
                                return "Password must contain at least one number";
                            }
                            return null;
                        }}
                    >
                        <Label>Password</Label>
                        <Input placeholder="Create A Password" />
                        <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                        <FieldError />
                    </TextField>
                    <div className="flex gap-2">
                        <Button type="submit" className={'w-full rounded-none'}>
                            Create Account
                        </Button>
                    </div>
                    <div className="flex items-center gap-3">
                        <hr className="flex-1 border-gray-300" />

                        <span className="text-sm text-gray-500">Or Sign Up With</span>

                        <hr className="flex-1 border-gray-300" />
                    </div>
                    <Button onClick={handleGoogleLogin} variant="outline" className={'flex items-center rounded-none w-full'}><FaGoogle /> Sign Up With Google</Button>
                    <p className="text-center">Already Have An Account? <Link href={'/login'} className="text-blue-500">Log In</Link></p>
                </Form>
            </Card>
        </div>
    );
};

export default SignUpPage;